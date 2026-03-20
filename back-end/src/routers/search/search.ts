import db from "database/db.js"
import { Router } from "express"
import type { Request, Response } from "express"
import { ListingDetailsSchema } from "routers/listing/listing.js"
import err from "util/err.js"
import Status from "util/Status.js"
import z from "zod"

const search = Router()

const LISTINGS_PER_PAGE = 20

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
				limit: LISTINGS_PER_PAGE,
				skip: pageIdx * LISTINGS_PER_PAGE
			}).exec()
		} else {
			results = await db.Listing.find({
				title: new RegExp(req.params.title, "i")
			}, {} , {
				limit: LISTINGS_PER_PAGE,
				skip: pageIdx * LISTINGS_PER_PAGE
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

export default search
