import z from "zod"

export const RegistrationDetailsSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
	profilePicture: z.string().optional(),
})
export type RegistrationDetails = z.infer<typeof RegistrationDetailsSchema>

export const UserDetailsSchema = z.object({
	id: z.string(),
	name: z.string(),
	profilePicture: z.string(),
})
export type UserDetails = z.infer<typeof UserDetailsSchema>

