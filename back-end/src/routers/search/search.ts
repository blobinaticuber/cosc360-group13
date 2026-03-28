import db from "database/db.js"
import { Router } from "express"
import type { Request, Response } from "express"
import { ListingDetailsSchema } from "routers/listing/listing.js"
import { UserDetailsSchema } from "routers/user/user.js"
import err from "util/err.js"
import { GoogleBooks, type Volume } from "util/GoogleBooks.js"
import Status from "util/Status.js"
import z from "zod"

const search = Router()

const RESULTS_PER_PAGE = 20

//
// The endpoint for searching for a listing by title.
//

export const ListingResultsSchema = z.array(ListingDetailsSchema)
export type ListingResults = z.infer<typeof ListingResultsSchema>

search.get(
	"/listing/:title",
	async (
		req: Request<{ title: string }, {}, {}>,
		res: Response<ListingResults>
	) => {
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.min(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		let results
		if (req.params.title === "*") {
			results = await db.Listing.find({}, {} , {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE
			}).exec()
		} else {
			results = await db.Listing.find({
				title: new RegExp(req.params.title, "i")
			}, {} , {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE
			}).exec()
		}

		const parsed = ListingResultsSchema.safeParse(
			results.map(listing => {
				let obj = listing.toObject()
				return { 
					...obj, 
					id: obj._id.toString(), 
					user: obj.user.toString()
				}
			}))
		if (!parsed.success) {
			return err.server(res)
		}

		if (parsed.data.length == 0) {
			return res.status(Status.NotFound).end()
		} 

		res.status(Status.OK).json(parsed.data)
	}
)

//
// Endpoint for searching for a user by name.
//

export const UserResultsSchema = z.array(UserDetailsSchema)
type UserResults = z.infer<typeof UserResultsSchema>

search.get(
	"/user/:name",
	async (
		req: Request<{ name: string }, {}, {}>,
		res: Response<UserResults>
	) => {
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.min(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		let results
		if (req.params.name === "*") {
			results = await db.User.find({}, {} , {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE
			}).exec()
		} else {
			results = await db.User.find({
				name: new RegExp(req.params.name, "i")
			}, {} , {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE
			}).exec()
		}

		const parsed = UserResultsSchema.safeParse(
			results.map(user => {
				user.id = user._id.toString()
				return user
			}))
		if (!parsed.success) {
			return err.server(res)
		}

		if (parsed.data.length == 0) {
			return res.status(Status.NotFound).end()
		} 

		res.status(Status.OK).json(parsed.data)
	}
)

//
// Search for a book from the Google Books API.
//

export const BookDetailsSchema = z.object({
	id: z.string().meta({ 
		description: "The ID of this book/volume in the Google Books database." 
	}),
	authors: z.array(z.string()).meta({
		description: "The authors of this book."
	}),
	rating: z.number().min(1).max(5).optional().meta({
		description: "The average rating (1 to 5) of this book on Google."
	}),
	categories: z.array(z.string()).meta({
		description: "The categories of this booke, e.g. \"Fiction\", \"Suspense\"."
	}),
	description: z.string().meta({
		description: "An HTML string containing a description of the book."
	}),
	image: z.string().meta({
		description: "A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value."
	}),
	title: z.string().meta({
		description: "The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like \"Title: Subtitle\"."
	})
})
export type BookDetails = z.infer<typeof BookDetailsSchema>

search.get(
	"/book/:title",
	async (
		req: Request<{ title: string }, {}, {}>,
		res: Response<BookDetails[]>
	) => {
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.min(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		const { title } = req.params

		if (!process.env.GOOGLE_BOOKS_KEY) {
			console.warn(
				"A request was made that requires access to the Google Books "
				+ "API, but the `GOOGLE_BOOKS_KEY` is not defined in the "
				+ "environment variables.\n\n"
				+ "Try "
			)
			err.server(
				res, 
				"Server could not connect to an external API (Google Books)"
			)
			return
		}

		const google = new GoogleBooks()
		const results = await google.books.booksVolumesList({
			q: `intitle:${title}&langRestrict=en&orderBy=relevance&printType=books`,
			key: process.env.GOOGLE_BOOKS_KEY,
			startIndex: pageIdx * RESULTS_PER_PAGE,
			maxResults: RESULTS_PER_PAGE
		})

		const body = await results.json()
		if (!results.ok) {
			console.error(
				"A request made to the Google Books API failed:\n" +
				results.status + "\n" +
				body
			)
			err.server(
				res,
				"Error retrieving results from an external API (Google Books)"
			)
		}

		const { items } = body as { items: Volume[] }

		if (items.length == 0) {
			res.status(Status.NotFound).end()
			return
		}

		const books: BookDetails[] = []

		for (let item of items) {
			if (item.volumeInfo?.categories?.includes("Audiobooks")) {
				continue
			}

			books.push({
				id: item.id!,
				authors: item.volumeInfo!.authors!,
				rating: item.volumeInfo!.averageRating,
				categories: item.volumeInfo!.categories!,
				description: item.volumeInfo!.description!,
				image: item.volumeInfo?.imageLinks?.extraLarge
					?? item.volumeInfo?.imageLinks?.large
					?? item.volumeInfo?.imageLinks?.medium
					?? item.volumeInfo?.imageLinks?.small
					?? item.volumeInfo?.imageLinks?.thumbnail
					?? item.volumeInfo?.imageLinks?.smallThumbnail
					?? process.env.SERVER_URL + 
						"public/default_listing_picture.png",
				title: item.volumeInfo?.title! + 
					(item.volumeInfo?.subtitle != undefined
						? ": " + item.volumeInfo?.subtitle 
						: "")
			})
		}

		res.status(Status.OK).json(books)
	}
)

export default search
