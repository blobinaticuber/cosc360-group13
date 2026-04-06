import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { ErrConflictSchema, ErrInvalidBodySchema } from "util/errSchema.js";
import z from "zod";
import {
	AdminCredentialsSchema,
	AdminDetailsSchema,
	AdminPersonalDetailsSchema,
	AdminRegistrationSchema,
	AdminUserUpdateSchema,
} from "./admin.js";

const adminSpec = new OpenAPIRegistry();

adminSpec.registerPath({
	method: "post",
	path: "/admin/user",
	summary: "Register New Admin",
	description: "Registers a new administrative user.",
	tags: ["Admin"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: AdminRegistrationSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Admin registered successfully.",
		},
		400: {
			description: "Invalid request body.",
			content: {
				"application/json": {
					schema: ErrInvalidBodySchema,
				},
			},
		},
		401: {
			description: "Incorrect `adminKey`.",
		},
		409: {
			description: "Conflicting field (email or password).",
			content: {
				"application/json": {
					schema: ErrConflictSchema,
				},
			},
		},
	},
});

adminSpec.registerPath({
	method: "get",
	path: "/admin/user",
	tags: ["Admin"],
	summary: "Get Admin User Info",
	description: "Get the public information about an admin user.",
	request: {
		query: z.object({
			id: z.string().optional(),
			name: z.string().optional(),
		}),
	},
	responses: {
		200: {
			description: "Admin user details successfully retrieved.",
			content: {
				"application/json": {
					schema: AdminDetailsSchema,
				},
			},
		},
		404: {
			description: "No matching admin user found.",
		},
	},
});

adminSpec.registerPath({
	method: "delete",
	path: "/admin/user",
	tags: ["Admin"],
	summary: "Delete Current Admin User",
	description: "Delete the admin user that is currently logged in.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description:
					"The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login.",
			}),
		}),
	},
	responses: {
		200: {
			description: "The admin user was deleted.",
		},
		401: {
			description: "There isn't an authenticated admin user to delete.",
		},
	},
});

adminSpec.registerPath({
	method: "post",
	path: "/admin/user/session",
	tags: ["Admin"],
	summary: "Log In",
	description: "Log in (create an admin session).",
	request: {
		body: {
			content: {
				"application/json": {
					schema: AdminCredentialsSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description:
				"The admin user is now logged in (and a cookie is set).",
		},
		404: {
			description: "The email isn't recognized.",
		},
		401: {
			description: "The email is recognized, but the password is wrong.",
		},
		400: {
			description: "The request body is invalid.",
		},
	},
});

adminSpec.registerPath({
	method: "delete",
	path: "/admin/user/session",
	tags: ["Admin"],
	summary: "Log Out",
	description: "Log out (delete the admin session).",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description:
					"The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login.",
			}),
		}),
	},
	responses: {
		200: {
			description: "The admin user is now logged out.",
		},
		401: {
			description: "There isn't an admin user to log out.",
		},
	},
});

adminSpec.registerPath({
	method: "get",
	path: "/admin/user/me",
	tags: ["Admin"],
	summary: "Get Personal Information",
	description:
		"Retrieves the personal data about the currently logged-in admin user.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description:
					"The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login.",
			}),
		}),
	},
	responses: {
		200: {
			description: "User data was successfully retrieved.",
			content: {
				"application/json": {
					schema: AdminPersonalDetailsSchema,
				},
			},
		},
		401: {
			description: "The user wasn't recognized.",
		},
		404: {
			description:
				"The admin user's session was identified, but their details couldn't be retrieved. This is extremely unlikely to ever happen.",
		},
	},
});

adminSpec.registerPath({
	method: "patch",
	path: "/admin/user",
	tags: ["Admin"],
	summary: "Update Personal Information",
	description:
		"Updates the details about the currently logged-in admin user.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description:
					"The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login.",
			}),
		}),
		body: {
			content: {
				"application/json": {
					schema: AdminUserUpdateSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "User data was successfully updated.",
		},
		400: {
			description: "The request body was invalid.",
		},
		401: {
			description: "The user wasn't recognized.",
		},
		404: {
			description: "The user's session was identified, but their details couldn't be retrieved. This is extremely unlikely to ever happen.",
		},
		409: {
			description: "There was a conflict in the user's new data.",
			content: {
				"application/json": {
					schema: ErrConflictSchema,
				},
			},
		},
	},
});

adminSpec.registerPath({
	method: "delete",
	path: "/suspend/{userId}",
	tags: [ "Admin" ],
	summary: "Suspend User",
	description:
		"Suspends a specific non-admin user account. At the time of writing, this is done by simply deleting the user records from the database though it's possible that the procedure might be different in the future.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description:
					"The authentication cookie for an admin user session. One of these will be set on a client after a successful admin login.",
			}),
		})
	},
	responses: {
		200: {
			description: "User was successfully suspended.",
		},
		401: {
			description: "The request was made by a non-admin user.",
		},
		404: {
			description: "The user could not be found.",
		},
	},
});

export default adminSpec;
