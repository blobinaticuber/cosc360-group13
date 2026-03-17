import type { Request, Response } from "express"
import { Router } from "express"
import body from "middleware/body.js"
import db from "models/index.js"
import { err, Status } from "util/index.js"
import z from "zod"

const user = Router();

//
// The endpoint for creating a new user; i.e., registration.
//

const RegistrationDetailsSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
	profilePicture: z.string().optional(),
})
export type RegistrationDetails = z.infer<typeof RegistrationDetailsSchema>

user.post(
	"/",
	body(RegistrationDetailsSchema),
	async (req: Request<{}, {}, RegistrationDetails>, res: Response) => {
		const existingUser = await db.User.findOne({
			$or: [
				{ email: req.body.email },
				{ name: req.body.name },
			],
		}).exec();

		if (existingUser != null) {
			return err.conflict(res, {
				email: req.body.email == existingUser.email,
				name: req.body.name == existingUser.name,
			});
		}

		try {
			const newUser = new db.User(req.body);
			newUser.save()
		} catch (e) {
			return err.server(res);
		}

		res.status(Status.Created).end();
	},
);

//
// The endpoint for retrieving a user's details.
//

export const UserDetailsSchema = z.object({
	id: z.string(),
	name: z.string(),
	profilePicture: z.string(),
})
export type UserDetails = z.infer<typeof UserDetailsSchema>

user.get("/", async (req, res) => {
	const { name, id } = req.query;

	let user = null;

	if (typeof name == "string") {
		user = await db.User.findOne({
			name: name,
		});
	} else if (typeof id == "string") {
		try {
			user = await db.User.findById(id);
		} catch {
			user = null;
		}
	}

	if (user == null) {
		return res.status(Status.NotFound).end();
	}

	user.id = user._id.toString();
	const parsed = UserDetailsSchema.safeParse(user);
	if (!parsed.success) {
		return err.server(res);
	}

	return res.status(Status.OK).json(parsed.data);
});

//
// The endpoint for deleting a user.
//



export default user;
