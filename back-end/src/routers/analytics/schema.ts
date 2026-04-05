import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import z from "zod"
import { ReportedUserSchema } from "./analytics.js"

const analyticsSpec = new OpenAPIRegistry()

analyticsSpec.registerPath({
	method: "get",
	path: "/analytics/reports",
	summary: "Get Reports Analytics",
	description: "Finds the top 10 most-reported users and sends their ID's along with each report against them.",
	tags: [ "Analytics", "Report" ],
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login."
			})
		})
	},
	responses: {
		200: {
			description: "Reports analytics were successfully retrieved.",
			content: {
				"application/json": {
					schema: z.array(ReportedUserSchema)
				}
			}
		},
		401: {
			description: "The request was made by a non-admin user."
		}
	}
})

export default analyticsSpec
