import db from "database/db.js"
import { Router } from "express"
import type { Request, Response } from "express"
import adminAuth from "middleware/adminAuth.js"
import Status from "types/Status.js"
import err from "util/err.js"
import z from "zod"

const analytics = Router()

const NUMBER_OF_REPORTED_USERS = 10

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

export const ListingsAnalytics =
	z.object({

	}).meta({
		id: "ListingsAnalytics",
		description: "Contains some statistics about the current listings."
	})

analytics.get(
	"/listings",
	adminAuth,
	async (req, res) => {
		res.json({})
	}
)

export default analytics
