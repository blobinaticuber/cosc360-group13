import type { Response } from "express"
import Status from "./Status.js"
import type { ZodObject } from "zod"
import type { ZodStandardJSONSchemaPayload } from "zod/v4/core"

type ErrorResponse = {
	message: string
	expected?: ZodStandardJSONSchemaPayload<ZodObject>
	received?: any
}

type ErrorOptions = {
	message?: string
	expected?: ZodObject
	received?: any
}

/**
 * Sends an error response back, including a JSON body of the form 
 * {@link ErrorResponse} 
 */
export default function err(
	res: Response, status: Status, options?: ErrorOptions
): void {
	if (options === undefined) {
		res.writeHead(status).end()
		return
	}

	let resBody: ErrorResponse = {
		message: "No message."
	}
	
	if (options.expected) {
		resBody.message = "Request body is malformed or missing."
		resBody.expected = options.expected.toJSONSchema()
	}

	if (options.received) {
		resBody.received = options.received
	}

	if (options.message) {
		resBody.message = options.message
	}

	res.writeHead(status)
		.json(resBody)
}
