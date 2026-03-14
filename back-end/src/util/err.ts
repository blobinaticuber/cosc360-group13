import type { Response } from "express"
import type { ZodObject } from "zod"
import Status from "./Status.js"
import z from "zod"

// 
// Below, we define the types and Zod schema of the possible response bodies
// that could be sent for an error.
//

export const ErrServerSchema = z.object({
	message: z.string()
})
export type ErrServer = z.infer<typeof ErrServerSchema>

export const ErrInvalidBodySchema = z.object({
	expected: z.any(),
	received: z.any()
})
export type ErrInvalidBody = z.infer<typeof ErrInvalidBodySchema>

export const ErrConflictSchema = z.object({
	conflicts: z.record(z.string(), z.boolean())
})
export type ErrConflict = z.infer<typeof ErrConflictSchema>

//
// Below, we define a set of functions to send well-formed error responses.
//

const err = {
	server(res: Response, message?: string): void {
		res.status(Status.InternalServerError)
			.json({
				message: message ?? "Unknown internal server error."
			} satisfies ErrServer)
	},

	invalidBody(res: Response, expected: ZodObject, received: any) {
		res.status(Status.BadRequest).json({
			expected: expected.toJSONSchema(),
			received
		} satisfies ErrInvalidBody)
	},

	conflict(res: Response, conflicts: Record<string, boolean>) {
		res.status(Status.Conflict).json({
			conflicts
		} satisfies ErrConflict)
	},

	notFound(res: Response) {
		res.status(Status.NotFound).end()
	}
}

export default err
