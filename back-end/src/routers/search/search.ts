import db from "../../database/db.js"
import type { Request, Response } from "express"
import { Router } from "express"
import { BookDetailsSchema, type BookDetails } from "../book/book.js"
import listing, { ListingDetailsSchema, ListingUpdateSchema, type ListingDetails } from "../listing/listing.js"
import { UserDetailsSchema } from "../user/user.js"
import Status from "../../types/Status.js"
import err from "../../util/err.js"
import googleBooks from "../../util/google.js"
import z from "zod"

const search = Router()

export const RESULTS_PER_PAGE = 10

//
// The endpoint for searching for a listing by the title of the associated 
// book.
//

search.get(
	"/listing/:title",
	async (
		req: Request<{ title: string }, {}, {}>,
		res: Response<ListingDetails[]>,
	) => {
		let pageIdx = 0
		const { page, showUnavailable } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.max(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		let results
		if (req.params.title === "*") {
			results = await db.Listing.find({
				// I know its weird
				...(!showUnavailable && { available: true })
			}, {}, {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE,
			}).exec()
		} else {
			results = await db.Listing.find(
				{ 
					"book.title": new RegExp(req.params.title, "i"),
					...(!showUnavailable && { available: true })
				},
				{},
				{
					limit: RESULTS_PER_PAGE,
					skip: pageIdx * RESULTS_PER_PAGE,
				},
			).exec()
		}

		if (results.length == 0) {
			res.status(Status.NotFound).end()
			return
		}

		// We need to get each of the user ID's from among the listings and
		// then retrieve the users to populate them in the response object.

		const promisedUsers = []
		for (const result of results) {
			promisedUsers.push(db.User.findById(result.user).exec())
		}
		const users = (await Promise.all(promisedUsers))
			.map(userResult => {
				return {
					...userResult?.toObject(),
					id: userResult?._id.toString()
				}
			})

		const populated = results
			.map(result => result.toObject())
			.map((listing, idx) => {
				return {
					id: listing._id.toString(),
					book: listing.book,
					user: users[idx],
					available: listing.available
				}
			})

		const data = z.array(ListingDetailsSchema).safeParse(populated)
		if (!data.success) {
			err.server(res, "Error parsing results from the database")
			return
		}

		res.status(Status.OK).json(data.data)
	},
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
		res: Response<UserResults>,
	) => {
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.max(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		let results
		if (req.params.name === "*") {
			results = await db.User.find({}, {}, {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE,
			}).exec()
		} else {
			results = await db.User.find(
				{ name: new RegExp(req.params.name, "i") },
				{},
				{
					limit: RESULTS_PER_PAGE,
					skip: pageIdx * RESULTS_PER_PAGE,
				},
			).exec()
		}

		const parsed = UserResultsSchema.safeParse(
			results.map((user) => {
				user.id = user._id.toString()
				return user
			}),
		)
		if (!parsed.success) {
			return err.server(res)
		}

		if (parsed.data.length == 0) {
			return res.status(Status.NotFound).end()
		}

		res.status(Status.OK).json(parsed.data)
	},
)

//
// Search for a book from the Google Books API.
//

search.get(
	"/book/:title",
	async (
		req: Request<{ title: string }, {}, {}>,
		res: Response<BookDetails[]>,
	) => {
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.max(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		const { title } = req.params

		const books = await googleBooks.searchByTitle(title, pageIdx)

		if (books.length == 0) {
			res.status(Status.NotFound).end()
			return
		}

		res.status(Status.OK).json(books)
	},
)

//
// Get all listings posted by a user.
//

export const UserListingSchema = ListingDetailsSchema.omit({ user: true })
type UserListing = z.infer<typeof UserListingSchema>

search.get(
	"/:userId/listings",
	async (
		req: Request< { userId: string }, {}, {}>,
		res: Response<UserListing[]>
	) => {
		const userId = req.params.userId

		const listingResults = await db.Listing.find({
			user: userId
		}).exec()

		if (listingResults.length == 0) {
			res.status(Status.NotFound).end()
			return
		}

		const listings = listingResults
			.map(result => {
				return {
					...result.toObject(),
					id: result._id.toString()
				}
			})
		const data = z.array(UserListingSchema).safeParse(listings)
		if (!data.success) {
			err.server(res, "Error parsing results from the database")
			return
		}

		res.status(Status.OK).json(data.data)
	}
)

//
// Conducts a search for books, but only includes those with associated
// listings (which are attached).
//

export const MAX_LISTINGS_PER_BOOK = 8

export const ListedBookSchema = z.object({
	book: BookDetailsSchema,
	listings: z.array(ListingDetailsSchema.omit({ book: true }))
})

search.get(
	"/listed/:title",
	async (
		req: Request<{ title: string }>, 
		res: Response
	) => {
		const { title } = req.params
		let pageIdx = 0
		const { page } = req.query
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1
				pageIdx = Math.max(0, pageIdx)
			} catch (e) {
				return res.status(Status.BadRequest).end()
			}
		}

		const listingResults = await db.Listing.aggregate([
			{
				$match: {
					"book.title": new RegExp(title, "i")
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user"
				}
			},
			{
				$unwind: "$user"
			},
			{
				$sort: { available: -1 }
			},
			{
				$group: {
					_id: "$book.id",
					book: { $first: "$book" },
					listings: {
						$push: {
							id: { $toString: "$_id" },
							available: "$available",
							user: {
								id: { $toString: "$user._id" },
								name: "$user.name",
								email: "$user.email",
								profilePicture: "$user.profilePicture"
							},
						}
					}
				}
			},
			{
				$addFields: {
					listingCount: { $size: "$listings" }
				}
			},
			{
				$sort: { listingCount: -1 }
			},
			{
				$skip: pageIdx * RESULTS_PER_PAGE
			},
			{
				$limit: RESULTS_PER_PAGE
			},
			{
				$project: {
					_id: 0,
					book: 1,
					listings: { $slice: [ "$listings", 5 ] }
				}
			}
		]).exec()

		if (listingResults.length == 0) {
			res.status(Status.NotFound).end()
		}

		const parsed = z.array(ListedBookSchema).safeParse(listingResults)
		if (!parsed.success) {
			err.server(res, "Error parsing database response.")
			return
		}
		
		res.status(Status.OK).json(parsed.data)
	}
)

//
// Get "browsing" information; i.e., the top 20 most popular books from the 
// top 10 most popular categories.
//

export const NUMBER_OF_TOP_CATEGORIES = 10
export const BOOKS_PER_CATEGORY = 20

export const CategoryBooksSchema = z.object({
	category: z.string(),
	listingCount: z.int().nonnegative(),
	topBooks: z.array(BookDetailsSchema.extend({
		listings: z.array(ListingDetailsSchema.omit({ book: true }))
	}).omit({ categories: true }))
})

search.get(
	"/browse",
	async (req, res) => {
		const result = await db.Listing.aggregate([
			{ $unwind: "$book.categories" },
			{
				$group: {
				_id: "$book.categories",
				listingCount: { $sum: 1 },
				},
			},
			{ $sort: { listingCount: -1 } },
			{ $limit: NUMBER_OF_TOP_CATEGORIES },
			{
				$lookup: {
				from: "listings",
				let: { category: "$_id" },
				pipeline: [
					{
					$match: {
						$expr: { $in: ["$$category", "$book.categories"] },
					},
					},
					{
					$group: {
						_id: "$book.id",
						title: { $first: "$book.title" },
						authors: { $first: "$book.authors" },
						rating: { $first: "$book.rating" },
						categories: { $first: "$book.categories" },
						description: { $first: "$book.description" },
						image: { $first: "$book.image" },
						publishDate: { $first: "$book.publishDate" },
						listings: {
						$push: {
							id: "$_id",
							available: "$available",
							user: {
								id: "$user",
								name: "$user.name",
								profilePicture: "$user.profilePicture",
								email: "$user.email",
							},
						},
						},
					},
					},
					{ $sort: { "listings.length": -1 } },
					{ $limit: BOOKS_PER_CATEGORY },
				],
				as: "topBooks",
				},
			},
			{
				$project: {
				category: "$_id",
				listingCount: 1,
				topBooks: 1,
				_id: 0,
				},
			},
		]).exec();


		// 
		// Populate the `user` field of each listing and format the IDs.
		//

		const userIds = new Set<string>()
		result.map(category => {
			category.topBooks.map((book: any) => {
				book.listings.map((listing: any) => {
					userIds.add(listing.user.id)
				})
			})
		})

		const userResults = await db.User.find({ 
			_id: { $in: Array.from(userIds) } 
		}).exec()
		const users = userResults.map(user => user.toObject())
		users.forEach((user: any) => user.id = user._id.toString())

		result.forEach(category => {
			category.topBooks.forEach((book: any) => {
				book.id = book._id.toString()
				book.listings.forEach((listing: any) => 
					listing.id = listing.id.toString()
				)
				book.listings.forEach((listing: any) => {
					listing.user = users.find((user: any) => 
						user.id == listing.user.id
					)
				})
			})
		})

		// 
		// Parse the result to ensure it conforms to the schema.
		//

		const parsed = z.array(CategoryBooksSchema).safeParse(JSON.parse(JSON.stringify(result)))
		if (!parsed.success) {
			err.server(res, "Error parsing result from database.")
		}

		res.status(Status.OK).json(parsed.data)
	}
)

export default search
