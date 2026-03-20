import db from "database/db.js"
import { Router } from "express"
import type { Request, Response } from "express"
import auth from "middleware/auth.js"
import body from "middleware/body.js"
import { resolveTlsa } from "node:dns"
import err from "util/err.js"
import Status from "util/Status.js"
import z from "zod"

const listing = Router()

//
// The endpoint for creating a new listing.
//

export const ListingCreationSchema = 
	z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().optional()
	})
	.meta({
		id: "ListingCreation",
		description: "Used to define a new listing."
	})
export type ListingCreation = z.infer<typeof ListingCreationSchema>

listing.post(
	"/",
	auth,
	body(ListingCreationSchema),
	async (
		req: Request<{}, {}, ListingCreation>,
		res: Response
	) => {
		try {
			const newListing = new db.Listing({
				title: req.body.title,
				description: req.body.description,
				user: req.session!.user,
				image: req.body.image
			})
			await newListing.save()			
		} catch (e) {
			return err.server(res)
		}

		res.status(Status.Created).end()
	}
)

//
// The endpoint for retrieving a listing from its ID.
//

export const ListingDetailsSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	user: z.string(),
	image: z.string()
})
export type ListingDetails = z.infer<typeof ListingDetailsSchema>

listing.get(
	"/:id",
	async (
		req: Request<{ id: string }>,
		res: Response<ListingDetails>
	) => {

		const listing = await db.Listing.findById(req.params.id).exec() as any

		if (listing == null) {
			return res.status(Status.NotFound).end()
		}

		listing.id = listing._id.toString();
		listing.user = listing.user.toString()
		const parsed = ListingDetailsSchema.safeParse(listing)
		if (!parsed.success) {
			return err.server(res)
		}

		res.status(Status.OK).json(parsed.data)
	}
)

//
// The endpoint for updating a listing.
//

export const ListingUpdateSchema = 
	z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		image: z.string().optional()
	})
	.meta({
		id: "ListingCreation",
		description: "Used to define a new listing."
	})
export type ListingUpdate = z.infer<typeof ListingUpdateSchema>

listing.patch(
	"/:id",
	auth,
	body(ListingCreationSchema),
	async (
		req: Request<{ id: string }, {}, ListingUpdate>,
		res: Response
	) => {
		
		let listing = await db.Listing.findById(req.params.id).exec()

		if (listing == null) {
			return res.status(Status.NotFound).end()
		}

		if (!req.session!.user.equals(listing.user)) {
			return res.status(Status.Unauthorized).end()
		}

		if (req.body.title) {
			listing.title = req.body.title
		}
		if (req.body.description) {
			listing.description = req.body.description
		}
		if (req.body.image) {
			listing.image = req.body.image
		}

		try {
			listing.save()
		} catch (e) {
			return err.server(res)
		}

		res.status(Status.OK).end()
	}
)

//
// The endpoint for deleting a listing.
//

listing.delete(
	"/:id",
	auth,
	async (
		req: Request<{ id: string }>,
		res: Response<ListingDetails>
	) => {

		const listing = await db.Listing.findById(req.params.id).exec()

		if (listing == null) {
			return res.status(Status.NotFound).end()
		}

		if (!listing.user.equals(req.session!.user)) {
			return res.status(Status.Unauthorized).end()
		}

		try {
			await listing.deleteOne().exec()
		} catch (e) {
			err.server(res)
		}

		res.status(Status.OK).end()
	}
)

export default listing
