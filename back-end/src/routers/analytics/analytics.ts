import db from "database/db.js"
import { Router } from "express"
import type { Request, Response } from "express"
import adminAuth from "middleware/adminAuth.js"
import { UserDetailsSchema } from "routers/user/user.js"
import Status from "types/Status.js"
import err from "util/err.js"
import z from "zod"

const analytics = Router()

const NUMBER_OF_REPORTED_USERS = 10
const NUMBER_OF_TOP_USERS = 10

//
// Admin endpoint for getting the most reported users and the associated
// reports.
//

export const ReportedUserSchema = z.object({
	user: z.string().meta({ 
		description: "The ID of the user that is reported."
	}),
	reports: z.array(z.object({
		id: z.string().meta({
			description: "The ID of the report."
		}),
		submittedBy: z.string().meta({ 
			description: "The user who submitted the report" 
		}),
		explanation: z.string().meta({
			description: "The explanation given when submitting the report. This may be empty."
		})
	})).meta({
		description: "The reports submitted against this user."
	})
})
type ReportedUser = z.infer<typeof ReportedUserSchema>

analytics.get(
	"/reports",
	adminAuth,
	async (
		req: Request,
		res: Response<ReportedUser[]>
	) => {
		
		const results = await db.Report.aggregate([
			{
				$group: {
					_id: "$user",
					reportCount: { $sum: 1 },
					reports: { $push: "$$ROOT" }
				}
			},
			{
				$sort: { reportCount: -1 }
			},
			{
				$limit: NUMBER_OF_REPORTED_USERS
			}
		]).exec()

		// Format the results to match the schema.
		results.map(result => {
			result.user = result._id.toString()
			result.reports.map((report: any) => {
				report.id = report._id.toString()
				report.submittedBy = report.submittedBy.toString()
			})
		})

		const reportDetails = z.array(ReportedUserSchema).safeParse(results)
		if (!reportDetails.success) {
			err.server(res, "Error parsing database results.")
			return
		}

		res.status(Status.OK).json(reportDetails.data)
	}
)

//
// Gets some statistics about listings.
//

export const ListingsAnalyticsSchema =
	z.object({
		totalListings: z.int().nonnegative().meta({
			description: "The total number of listings, including ones marked as unavaible."
		}),
		listingsMarkedUnavailable: z.int().nonnegative().meta({
			description: "The total number of listings marked unavaible."
		}),
		averageListingsPerUser: z.number().nonnegative().meta({
			description: "The average number of listings per user."
		}),
		usersWithTheMostListings: z.array(z.object({
			user: UserDetailsSchema,
			listingCount: z.int().nonnegative().meta({
				description: "The total number of listings posted by the user."
			}),
			availableListingCount: z.int().nonnegative().meta({
				description: "The number of currently-available listings posted by the user."
			})
		})).meta({
			description: `Lists the top ${NUMBER_OF_TOP_USERS} users with the most listings.`
		}),
	}).meta({
		id: "ListingsAnalytics",
		description: "Contains some statistics about the current listings."
	})
export type ListingAnalytics = z.infer<typeof ListingsAnalyticsSchema>

analytics.get(
	"/listings",
	adminAuth,
	async (
		req: Request, 
		res: Response<ListingAnalytics>
	) => {



		res.json({})
	}
)

export default analytics
