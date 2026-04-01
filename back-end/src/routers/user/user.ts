import db from "database/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import auth from "middleware/auth.js";
import body from "middleware/body.js";
import Status from "types/Status.js";
import { compare, encrypt } from "util/encryption.js";
import err from "util/err.js";
import { type ErrServer } from "util/errSchema.js";
import z from "zod";

const user = Router();

//
// The endpoint for creating a new user.
//

export const RegistrationDetailsSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
	profilePicture: z.string().optional(),
}).meta({
	id: "RegistrationDetails",
	description: "The details used to register a new user.",
});
export type RegistrationDetails = z.infer<typeof RegistrationDetailsSchema>;

user.post(
	"/",
	body(RegistrationDetailsSchema),
	async (
		req: Request<{}, {}, RegistrationDetails>,
		res: Response,
	) => {
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
			req.body.password = encrypt(req.body.password);
			const newUser = new db.User(req.body);
			await newUser.save();
		} catch (e) {
			return err.server(res);
		}

		res.status(Status.Created).end();
	},
);

//
// The endpoint for retrieving a user's details.
//

export const UserDetailsSchema = 
	z.object({
		id: z.string(),
		name: z.string(),
		profilePicture: z.string(),
	})
	.meta({
		id: "UserDetails",
		description: "The public information about a user.",
	})
export type UserDetails = z.infer<typeof UserDetailsSchema>;

user.get(
	"/",
	async (
		req: Request,
		res: Response<UserDetails | ErrServer | undefined>,
	) => {
		const { name, id } = req.query;

		let user = null;

		if (typeof name == "string") {
			user = await db.User.findOne({
				name: name,
			}).exec();
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
	},
);

//
// The endpoint for deleting a user account.
//

user.delete(
	"/",
	auth,
	async (
		req: Request,
		res: Response<undefined>,
	) => {
		const userId = req.session!.user;

		await db.User.findByIdAndDelete(userId);
		await db.Session.deleteMany({
			user: userId,
		});
		await db.Listing.deleteMany({
			user: userId,
		});

		res.clearCookie(
			process.env.AUTH_COOKIE!, {
				httpOnly: true,
				sameSite: "strict",
			})
			.status(Status.OK)
			.end();
	},
);

//
// The endpoint for creating a session i.e., logging in.
//

export const UserCredentialsSchema = z.object({
	email: z.email(),
	password: z.string(),
})
	.meta({
		id: "UserCredentials",
		description: "The credentials used to log a user in.",
	});
export type UserCredentials = z.infer<typeof UserCredentialsSchema>;

user.post(
	"/session",
	body(UserCredentialsSchema),
	async (
		req: Request<{}, {}, UserCredentials>,
		res: Response<undefined>,
	) => {
		const user = await db.User.findOne({
			email: req.body.email,
		}).exec();
		if (user == null) {
			return res.status(Status.NotFound).end();
		}

		if (!compare(req.body.password, user.password)) {
			return res.status(Status.Unauthorized).end();
		}

		const session = new db.Session({
			user: user._id,
		});
		await session.save();

		res.cookie(
			process.env.AUTH_COOKIE!, session._id.toString(), {
				httpOnly: true,
				sameSite: "strict",
			})
			.status(Status.OK)
			.end();
	},
);

//
// The endpoint for deleting a session i.e., logging out.
//

user.delete(
	"/session",
	auth,
	async (
		req: Request,
		res: Response,
	) => {
		await req.session!.deleteOne();

		res.clearCookie(
			process.env.AUTH_COOKIE!, {
				httpOnly: true,
				sameSite: "strict",
			})
			.status(Status.OK)
			.end();
	},
);

export default user;
