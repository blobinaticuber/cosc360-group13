import db from "database/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import body from "middleware/body.js";
import Status from "util/Status.js";
import err from "util/err.js";
import type { RegistrationDetails } from "./schema.js";
import { RegistrationDetailsSchema, UserDetailsSchema } from "./schema.js";

const user = Router();

//
// The endpoint for creating a new user.
//

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
			newUser.save();
		} catch (e) {
			return err.server(res);
		}

		res.status(Status.Created).end();
	},
);

//
// The endpoint for retrieving a user's details.
//

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
// The endpoint for creating a session (i.e., logging in).
//

user.post("/session", async (req, res) => {
	
})

export default user;
