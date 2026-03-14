import { Status } from "../util/index.js"
import { ErrConflictSchema, ErrInvalidBodySchema, ErrServerSchema } from "../util/err.js"
import type { ErrConflict, ErrInvalidBody, ErrServer } from "util/err.js"
import z from "zod"
import type { RegistrationDetails } from "routers/user/user.js"

//
// Below, we define the Zod schemas and types for the data that could be sent
// in a response.
//

export const UserDetails = z.object({
	id: z.string(),
	name: z.string(),
	profilePicture: z.string(),
})
export type UserDetails = z.infer<typeof UserDetails>

//
//	Below, we define the functions used for making requests to the server.
//

type Response<ExpectedType, ErrBody> = Promise<{
	ok: true
	data: ExpectedType
} | {
	ok: false
	data: ErrBody | ErrServer
}>

const client = {
	url: "",

	__ensureUrl() {
		if (this.url == "") {
			throw new Error(`
	The \`client\` object needs to have its \`url\` property set
	before it can be used. 
			`)
		}		
	},

	async register(details: RegistrationDetails): Response<
		null, ErrConflict | ErrInvalidBody
	> {
		this.__ensureUrl()

		const res = await fetch(this.url + "user/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(details)
		})

		if (res.ok) {
			return {
				ok: true,
				data: null
			}
		}

		const body = await res.json()

		const conflictErr = ErrConflictSchema.safeParse(body)
		if (conflictErr.success) {
			return { ok: false, data: conflictErr.data }
		}

		const serverErr = ErrServerSchema.safeParse(body)
		if (serverErr.success) {
			return { ok: false, data: serverErr.data }
		}

		const invalidBodyErr = ErrInvalidBodySchema.safeParse(body)
		if (invalidBodyErr.success) {
			return { ok: false, data: invalidBodyErr.data }
		}

		throw new Error(`
	The server sent an unexpected response:
	${body}	
		`)
	},

	async getUserByName(name: string): Response<
		UserDetails,
		null
	> {
		this.__ensureUrl()

		const res = await fetch(this.url + `user?name=${name}`)
		const body = await res.json()

		if (res.ok) {
			const user = UserDetails.parse(body)
			return {
				ok: true, data: user
			}
		}

		if (res.status == Status.NotFound) {
			return {
				ok: false, data: null
			}
		}

		throw new Error(`
	The server sent an unexpected response:
	${body}	
		`)
	}
}

export default client
