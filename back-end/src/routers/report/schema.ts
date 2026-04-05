import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { ReportSubmissionSchema } from "./report.js"
import z from "zod"
import { ErrInvalidBodySchema } from "util/errSchema.js"

const reportSpec = new OpenAPIRegistry()

reportSpec.registerPath({
	method: "put",
	path: "/report/{userId}",
	summary: "Submit a Report",
	description: "Submits a report on behalf of the currently logged-in user against the user identified by `{userId}`. A user can only have up to one report against each other user, so redundant calls will not create duplicates; however, they can be used to update the explanation provided.",
	tags: [ "Report" ],
	request: {
		body: {
			content: {
				"application/json": {
					schema: ReportSubmissionSchema
				}
			}
		},
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		})
	},
	responses: {
		200: {
			description: "An existing report was found and updated."
		},
		201: {
			description: "A new report was submitted successfully."
		},
		400: {
			description: "Invalid request body.",
			content: {
				"application/json": {
					schema: ErrInvalidBodySchema
				}
			}
		},
		401: {
			description: "Request made by an unrecognized user."
		},
		404: {
			description: "The provided `{userId}` was not recognized."
		}
	}
})

export default reportSpec
