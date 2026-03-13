import { Router } from "express"
import type { Request, Response } from "express"
import z from "zod"
import body from "middleware/body.js"
import db from "models/index.js"
import { Error } from "mongoose"
import { err, Status } from "util/index.js"

const user = Router()

user.use()

//
// The endpoint for creating a new user; i.e., registration.
//

const RegistrationDetails = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
	profilePicture: z.string().optional()
})
type RegistrationDetails = z.infer<typeof RegistrationDetails>

user.post(
	"/", 
	body(RegistrationDetails),
	async (req: Request<{}, {}, RegistrationDetails>, res: Response) => {
	
		const existingUser = await db.User.findOne({
			$or: [
				{ email: req.body.email },
				{ name: req.body.name },
			]
		}).exec()

		if (existingUser != null) {
			return err(
				res,
				Status.Conflict,
				{
					conflict: {
						email: req.body.email == existingUser.email,
						name: req.body.name == existingUser.name
					}
				}
			)
		}

		try {
			const newUser = new db.User(req.body)
			await newUser.save()
		} catch (e) {
			return err(res, Status.InternalServerError)
		}

		res.writeHead(Status.Created).end()
	}
)
