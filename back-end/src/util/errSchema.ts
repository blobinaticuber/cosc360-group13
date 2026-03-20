import z from "zod"

// 
// Below, we define the types and Zod schema of the possible response bodies
// that could be sent for an error.
//

export const ErrServerSchema = z.object({
	type: z.literal("server"),
	message: z.string()
})
export type ErrServer = z.infer<typeof ErrServerSchema>

export const ErrInvalidBodySchema = z.object({
	type: z.literal("invalid body"),
	expected: z.any(),
	received: z.any()
})
export type ErrInvalidBody = z.infer<typeof ErrInvalidBodySchema>

export const ErrConflictSchema = z.object({
	type: z.literal("conflict"),
	conflicts: z.record(z.string(), z.boolean())
})
export type ErrConflict = z.infer<typeof ErrConflictSchema>

//
// A union type of all errors. This can be used to parse a suspected error
// body, and then you can handle it based on the error's `type` field.
//

export const ErrSchema = z.union([
	ErrServerSchema,
	ErrInvalidBodySchema,
	ErrConflictSchema
])
export type Err = z.infer<typeof ErrSchema>
