import db from "database/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import auth from "middleware/auth.js";
import body from "middleware/body.js";
import { BookDetailsSchema, type BookDetails } from "routers/book/book.js";
import { UserDetailsSchema } from "routers/user/user.js";
import Status from "types/Status.js";
import err from "util/err.js";
import googleBooks from "util/google.js"
import z from "zod";

const listing = Router();

//
// The endpoint for creating a new listing.
//

export const ListingCreationSchema = 
	z.object({
		book: z.string().meta({
			description: "The Google Books ID of the book being listed",
		}),
		user: z.string().meta({
			description: "The ID of the user listing the book",
		}),
	})
	.meta({
		id: "ListingCreation",
		description: "Used to define a new listing.",
	});
export type ListingCreation = z.infer<typeof ListingCreationSchema>;

listing.post(
	"/",
	auth,
	body(ListingCreationSchema),
	async (
		req: Request<{}, {}, ListingCreation>,
		res: Response,
	) => {

		let book
		try {
			book = await googleBooks.findById(req.body.book)
		} catch {
			res.status(Status.NotFound).end()
			return
		}

		try {
			const newListing = new db.Listing({
				book: book,
				user: req.session!.user,
			});
			await newListing.save();
		} catch (e) {
			err.server(res);
			return
		}

		res.status(Status.Created).end();
	},
);

//
// The endpoint for retrieving a listing from its ID.
//

export const ListingDetailsSchema = z.object({
	id: z.string().meta({
		description: "The unique identifier for the listing.",
	}),
	book: BookDetailsSchema.meta({
		description: "The book that is listed.",
	}),
	user: UserDetailsSchema.meta({
		description: "The user who posted the listing.",
	}),
});
export type ListingDetails = z.infer<typeof ListingDetailsSchema>;

listing.get(
	"/:id",
	async (
		req: Request<{ id: string }>,
		res: Response<ListingDetails>,
	) => {
		const listing = await db.Listing.findById(req.params.id).exec();
		if (listing == null) {
			return res.status(Status.NotFound).end();
		}

		const user = await db.User.findById(listing.user).exec();

		const data = ListingDetailsSchema.safeParse({
			id: listing._id.toString(),
			book: listing.book,
			user: user?.toObject()
		})
		if (!data.success) {
			err.server(
				res,
				"Error retrieving user data associated with the listing"
			)
		}

		res.json(data.data)
	},
);

//
// The endpoint for deleting a listing.
//

listing.delete(
	"/:id",
	auth,
	async (
		req: Request<{ id: string }>,
		res: Response<ListingDetails>,
	) => {
		const listing = await db.Listing.findById(req.params.id).exec();

		if (listing == null) {
			return res.status(Status.NotFound).end();
		}

		if (!listing.user.equals(req.session!.user)) {
			return res.status(Status.Unauthorized).end();
		}

		try {
			await listing.deleteOne().exec();
		} catch (e) {
			err.server(res);
		}

		res.status(Status.OK).end();
	},
);

export default listing;
