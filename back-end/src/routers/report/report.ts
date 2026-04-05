import { Router } from "express"
import type { Request, Response } from "express"
import auth from "middleware/auth.js"
import db from "../../database/db.js"
import Status from "types/Status.js"
import z from "zod"
import body from "middleware/body.js"

const report = Router()

//
// Endpoint for creating a report.
//

export const ReportSubmissionSchema = 
	z.object({
		explanation: z.string().optional().meta({
			description: "A written explanation explaining why the report was submitted."
		})
	}).meta({
		description: "The details of a user-submitted report."
	})
type ReportSubmission = z.infer<typeof ReportSubmissionSchema>

report.put(
	"/:userId",
	auth,
	body(ReportSubmissionSchema),
	async (
		req: Request<{ userId: string }, {}, ReportSubmission>,
		res: Response
	) => {
		const submittedBy = req.session!.user
		const { userId } = req.params

		const user = await db.User.findById(userId).exec()
		if (user === null) {
			res.status(Status.NotFound).end()
			return
		}

		const existingReport = await db.Report.findOne({
			submittedBy: submittedBy,
			user: user._id
		}).exec()

		if (existingReport !== null) {
			// Update the existing report if necessary
			if (req.body.explanation) {
				existingReport.explanation = req.body.explanation
				await existingReport.save()
			}
			res.status(Status.OK).end()
			return
		}

		const newReport = new db.Report({
			submittedBy: submittedBy,
			user: user._id,
			explanation: req.body.explanation
		})
		await newReport.save()
		res.status(Status.Created).end()
	}
)

export default report
