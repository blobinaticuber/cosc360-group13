import db from "database/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import type { BookDetails } from "routers/book/book.js";
import { ListingDetailsSchema, type ListingDetails } from "routers/listing/listing.js";
import { UserDetailsSchema } from "routers/user/user.js";
import Status from "types/Status.js";
import err from "util/err.js";
import googleBooks from "util/google.js";
import z from "zod";

const search = Router();

const RESULTS_PER_PAGE = 10;

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
		let pageIdx = 0;
		const { page, showUnavailable } = req.query;
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1;
				pageIdx = Math.max(0, pageIdx);
			} catch (e) {
				return res.status(Status.BadRequest).end();
			}
		}

		let results;
		if (req.params.title === "*") {
			results = await db.Listing.find({
				// I know its weird
				...(!showUnavailable && { available: true })
			}, {}, {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE,
			}).exec();
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
			).exec();
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
					user: users[idx]
				}
			})

		const data = z.array(ListingDetailsSchema).safeParse(populated)
		if (!data.success) {
			err.server(res, "Error parsing results from the database")
			return
		}

		res.status(Status.OK).json(data.data)
	},
);

//
// Endpoint for searching for a user by name.
//

export const UserResultsSchema = z.array(UserDetailsSchema);
type UserResults = z.infer<typeof UserResultsSchema>;

search.get(
	"/user/:name",
	async (
		req: Request<{ name: string }, {}, {}>,
		res: Response<UserResults>,
	) => {
		let pageIdx = 0;
		const { page } = req.query;
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1;
				pageIdx = Math.max(0, pageIdx);
			} catch (e) {
				return res.status(Status.BadRequest).end();
			}
		}

		let results;
		if (req.params.name === "*") {
			results = await db.User.find({}, {}, {
				limit: RESULTS_PER_PAGE,
				skip: pageIdx * RESULTS_PER_PAGE,
			}).exec();
		} else {
			results = await db.User.find(
				{ name: new RegExp(req.params.name, "i") },
				{},
				{
					limit: RESULTS_PER_PAGE,
					skip: pageIdx * RESULTS_PER_PAGE,
				},
			).exec();
		}

		const parsed = UserResultsSchema.safeParse(
			results.map((user) => {
				user.id = user._id.toString();
				return user;
			}),
		);
		if (!parsed.success) {
			return err.server(res);
		}

		if (parsed.data.length == 0) {
			return res.status(Status.NotFound).end();
		}

		res.status(Status.OK).json(parsed.data);
	},
);

//
// Search for a book from the Google Books API.
//

search.get(
	"/book/:title",
	async (
		req: Request<{ title: string }, {}, {}>,
		res: Response<BookDetails[]>,
	) => {
		let pageIdx = 0;
		const { page } = req.query;
		if (page) {
			try {
				pageIdx = Number.parseInt(page as string) - 1;
				pageIdx = Math.max(0, pageIdx);
			} catch (e) {
				return res.status(Status.BadRequest).end();
			}
		}

		const { title } = req.params;

		const books = await googleBooks.searchByTitle(title, pageIdx);

		if (books.length == 0) {
			res.status(Status.NotFound).end();
			return;
		}

		res.status(Status.OK).json(books);
	},
);

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

export default search;
