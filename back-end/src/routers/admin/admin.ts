import db from "../../database/db.js"
import type { CookieOptions, Request, Response } from "express"
import { Router } from "express"
import auth from "../../middleware/auth.js"
import body from "../../middleware/body.js"
import Status from "../../types/Status.js"
import { compare, encrypt } from "../../util/encryption.js"
import err from "../../util/err.js"
import { type ErrServer } from "../../util/errSchema.js"
import { COOKIE_SETTINGS } from "../user/user.js"
import z from "zod"
import adminAuth from "../../middleware/adminAuth.js"

const admin = Router();

if (process.env.ADMIN_KEY! == "dummy key" && 
	process.env.MODE != "development"
) {
	throw new Error(`
    The \`ADMIN_KEY\` is not defined in the current environment. Try the
    following steps:
		
      1) Create or update a file named \`.env.local\` inside of the 
         \`back-end\` directory. In that file, make sure you have the following
         line: 

         ADMIN_KEY="<some_secret_admin_key_here>"
	
      2) Restart the server. You shouldn't receive this error again.
	`)
}

//
// The endpoint for creating a new admin user.
//

export const AdminRegistrationSchema = 
	z.object({
		name: z.string(),
		email: z.email(),
		password: z.string(),
		profilePicture: z.string().optional(),
		adminKey: z.string()
	}).meta({
		id: "AdminRegistration",
		description: "The details used to register a new admin user.",
	})
type AdminRegistration = z.infer<typeof AdminRegistrationSchema>

admin.post(
	"/user",
	body(AdminRegistrationSchema),
	async (
		req: Request<{}, {}, AdminRegistration>,
		res: Response,
	) => {

		if (req.body.adminKey != process.env.ADMIN_KEY!) {
			res.status(Status.Unauthorized).end()
			return
		}

		const existingUser = await db.Admin.findOne({
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
			const newUser = new db.Admin(req.body);
			await newUser.save();
			res.status(Status.Created).json({
				id: newUser._id.toString()
			});
		} catch (e) {
			return err.server(res);
		}
	},
);

//
// The endpoint for retrieving an admin user's details.
//

export const AdminDetailsSchema = 
	z.object({
		id: z.string(),
		name: z.string(),
		profilePicture: z.string(),
	})
	.meta({
		id: "AdminDetails",
		description: "The public information about an admin user.",
	})
export type AdminDetails = z.infer<typeof AdminDetailsSchema>;

admin.get(
	"/user",
	async (
		req: Request,
		res: Response<AdminDetails | ErrServer | undefined>,
	) => {
		const { name, id } = req.query;

		let user = null;

		if (typeof name == "string") {
			user = await db.Admin.findOne({
				name: name,
			}).exec();
		} else if (typeof id == "string") {
			try {
				user = await db.Admin.findById(id).exec();
			} catch {
				user = null;
			}
		}

		if (user == null) {
			return res.status(Status.NotFound).end();
		}

		user.id = user._id.toString();
		const parsed = AdminDetailsSchema.safeParse(user);
		if (!parsed.success) {
			return err.server(res);
		}

		return res.status(Status.OK).json(parsed.data);
	},
);

//
// The endpoint for deleting an admin account.
//

admin.delete(
	"/user",
	adminAuth,
	async (
		req: Request,
		res: Response<undefined>,
	) => {
		const userId = req.session!.user;

		await db.Admin.findByIdAndDelete(userId).exec();
		await db.AdminSession.deleteMany({
			user: userId,
		}).exec();

		res.clearCookie(process.env.ADMIN_AUTH_COOKIE!, COOKIE_SETTINGS)
			.status(Status.OK)
			.end();
	},
);

//
// The endpoint for creating a session i.e., logging in.
//

export const AdminCredentialsSchema = 
	z.object({
		email: z.email(),
		password: z.string(),
	})
	.meta({
		id: "UserCredentials",
		description: "The credentials used to log a user in.",
	});
export type AdminCredentials = z.infer<typeof AdminCredentialsSchema>;

admin.post(
	"/user/session",
	body(AdminCredentialsSchema),
	async (
		req: Request<{}, {}, AdminCredentials>,
		res: Response<undefined>,
	) => {
		const user = await db.Admin.findOne({
			email: req.body.email,
		}).exec();
		if (user == null) {
			return res.status(Status.NotFound).end();
		}

		if (!compare(req.body.password, user.password)) {
			return res.status(Status.Unauthorized).end();
		}

		const session = new db.AdminSession({
			user: user._id,
		});
		await session.save();

		res.cookie(process.env.ADMIN_AUTH_COOKIE!, session.id, COOKIE_SETTINGS)
			.status(Status.OK)
			.end();
	},
);

//
// The endpoint for deleting a session i.e., logging out.
//

admin.delete(
	"/user/session",
	adminAuth,
	async (
		req: Request,
		res: Response,
	) => {
		await req.session!.deleteOne();

		res.clearCookie(process.env.ADMIN_AUTH_COOKIE!, COOKIE_SETTINGS)
			.status(Status.OK)
			.end();
	},
);

//
// The endpoint for getting information about the currently logged-in admin 
// user.
//

export const AdminPersonalDetailsSchema =
	AdminDetailsSchema.extend({
		email: z.string()
	})
	.meta({
		id: "AdminPersonalDetails",
		description: "The personal (as opposed to public) details about an admin user"
	})
type AdminPersonalDetails = z.infer<typeof AdminPersonalDetailsSchema> 

admin.get(
	"/user/me",
	adminAuth,
	async (
		req: Request,
		res: Response<AdminPersonalDetails>
	) => {
		const userId = req.session!.user

		const user = await db.Admin.findById(userId).exec()
		if (user == null) {
			res.status(Status.NotFound).end()
			return
		}

		const parsed = AdminPersonalDetailsSchema.safeParse({
			id: userId.toString(),
			...user.toObject()
		})
		if (!parsed.success) {
			err.server(res, "Error parsing database object")
			return
		}

		res.status(Status.OK).json(parsed.data)
	}
)

//
// The endpoint for updating the current admin user's information.
//

export const AdminUserUpdateSchema = 
	z.object({
		name: z.string().nonempty(),
		email: z.email().nonempty(),
		password: z.string().nonempty(),
		profilePicture: z.string().nonempty()
	})
	.partial()
	.meta({
		id: "AdminUserUpdate",
		description: "The fields of an admin user that need to be updated. Only include the fields that you want changed."
	})
type AdminUserUpdate = z.infer<typeof AdminUserUpdateSchema>

admin.patch(
	"/user",
	adminAuth,
	body(AdminUserUpdateSchema),
	async (
		req: Request<{}, {}, AdminUserUpdate>,
		res: Response
	) => {
		const update = req.body

		// Check for conflicts

		const potentialConflicts: ({ name: string } | { email: string })[] = []
		if (update.name) {
			potentialConflicts.push({ name: update.name })
		}
		if (update.email) {
			potentialConflicts.push({ email: update.email })
		}

		if (potentialConflicts.length > 0) {
			const conflictingUsers = await db.Admin.find({
				$or: potentialConflicts
			}).exec()

			if (conflictingUsers.length > 0) {
				err.conflict(res, {
					name: conflictingUsers.some(
						user => user.name == update.name
					),
					email: conflictingUsers.some(
						user => user.email == update.email
					)
				})
				return
			}			
		}

		// If no conflicts were found, we can update the user.

		const user = await db.Admin.findById(req.session!.user).exec()
		if (!user) {
			res.status(Status.NotFound).end()
			return
		}

		if (update.name) {
			user.name = update.name
		}

		if (update.email) {
			user.email = update.email
		}

		if (update.password) {
			user.password = encrypt(update.password)
		}

		if (update.profilePicture) {
			user.profilePicture = update.profilePicture
		}

		// Save the changes

		await user.save()
		res.status(Status.OK).end()
	}
)

//
// The endpoint for suspending another user.
//

admin.delete(
	"/suspend/:userId",
	adminAuth,
	async (req, res) => {
		const { userId } = req.params
		const user = await db.User.findById(userId).exec()
		if (user === null) {
			res.status(Status.NotFound).end()
			return
		}

		await db.Session.deleteMany({
			user: user._id,
		}).exec()
		await db.Listing.deleteMany({
			user: user._id,
		}).exec()
		await db.Report.deleteMany({
			$or: [
				{ user: user._id },
				{ submittedBy: user._id }
			]
		}).exec()
		await user.deleteOne().exec()

		res.status(Status.OK).end()
	}
)

export default admin;
