import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { PersonalDetailsSchema, RegistrationDetailsSchema, UserCredentialsSchema, UserDetailsSchema, UserUpdateSchema } from "./user.js"
import { ErrConflictSchema, ErrInvalidBodySchema } from "../../util/errSchema.js"
import z from "zod"
import { MAX_IMAGE_SIZE_MB } from "../../middleware/imageUpload.js"

const userSpec = new OpenAPIRegistry()

userSpec.registerPath({
	method: "post",
	path: "/user",
	summary: "Register a new user",
	description: "Register a new user.",
	tags: [ "User" ],
	request: {
		body: {
			content: {
				"application/json": {
					schema: RegistrationDetailsSchema
				}
			}
		}
	},
	responses: {
		201: {
			description: "User registered successfully."
		},
		400: {
			description: "Invalid request body.",
			content: {
				"application/json": {
					schema: ErrInvalidBodySchema
				}
			}
		},
		409: {
			description: "Conflicting field (email or password).",
			content: {
				"application/json": {
					schema: ErrConflictSchema
				}
			}
		}
	}
})

userSpec.registerPath({
	method: "get",
	path: "/user",
	tags: [ "User" ],
	summary: "Get information about a user",
	description: "Get public information about a user.",
	request: {
		query: z.object({
			id: z.string().optional(),
			name: z.string().optional()
		})
	},
	responses: {
		200: {
			description: "User details successfully retrieved.",
			content: {
				"application/json": {
					schema: UserDetailsSchema
				}
			}
		},
		404: {
			description: "No matching user found.",
		}
	}
})

userSpec.registerPath({
	method: "delete",
	path: "/user",
	tags: [ "User" ],
	summary: "Delete the current user",
	description: "Delete the user that is currently logged in.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		})
	},
	responses: {
		200: {
			description: "The user was deleted."
		},
		401: {
			description: "There isn't an authenticated user to delete."
		}
	}
})

userSpec.registerPath({
	method: "post",
	path: "/user/session",
	tags: [ "User" ],
	summary: "Log In",
	description: "Log in (create a session).",
	request: {
		body: {
			content: {
				"application/json": {
					schema: UserCredentialsSchema
				}
			}
		}
	},
	responses: {
		200: {
			description: "The user is now logged in (and a cookie is set)."
		},
		404: {
			description: "The email isn't recognized."
		},
		401: {
			description: "The email is recognized, but the password is wrong."
		},
		400: {
			description: "The request body is invalid."
		}
	}
})

userSpec.registerPath({
	method: "delete",
	path: "/user/session",
	tags: [ "User" ],
	summary: "Log Out",
	description: "Log out (delete a session).",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		})
	},
	responses: {
		200: {
			description: "The user is now logged out."
		},
		401: {
			description: "There isn't a user to log out."
		}
	}
})

userSpec.registerPath({
	method: "get",
	path: "/user/me",
	tags: [ "User" ],
	summary: "Get Personal Information",
	description: "Retrieves the personal data about the currently logged-in user.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		})
	},
	responses: {
		200: {
			description: "User data was successfully retrieved.",
			content: {
				"application/json": {
					schema: PersonalDetailsSchema
				}
			}
		},
		401: {
			description: "The user wasn't recognized."
		},
		404: {
			description: "The user's session was identified, but their details couldn't be retrieved. This is extremely unlikely to ever happen."
		}
	}
})

userSpec.registerPath({
	method: "patch",
	path: "/user",
	tags: [ "User" ],
	summary: "Update Personal Information",
	description: "Updates the details about the currently logged-in user.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		}),
		body: {
			content: {
				"application/json": {
					schema: UserUpdateSchema
				}
			}
		}
	},
	responses: {
		200: {
			description: "User data was successfully updated.",
		},
		400: {
			description: "The request body was invalid."
		},
		401: {
			description: "The user wasn't recognized."
		},
		404: {
			description: "The user's session was identified, but their details couldn't be retrieved. This is extremely unlikely to ever happen."
		},
		409: {
			description: "There was a conflict in the user's new data.",
			content: {
				"application/json": {
					schema: ErrConflictSchema
				}
			}
		}
	}
})

userSpec.registerPath({
	method: "post",
	path: "/user/profile_picture",
	tags: [ "User" ],
	summary: "Upload Profile Picture",
	description: "Accepts a file upload from a user, which will then be set as their new profile picture.",
	request: {
		cookies: z.object({
			[process.env.AUTH_COOKIE!]: z.string().meta({
				description: "The authentication cookie for a user session. One of these will be set on a client after a successful login."
			})
		}),
		body: {
			content: {
				"multipart/form-data": {
					schema: z.object({
						profilePicture: z.literal("Image File")
					})
				}
			}
		}
	},
	responses: {
		200: {
			description: "Profile picture successfully uploaded and set.",
			content: {
				"application/json": {
					schema: z.object({
						profilePicture: z.string().meta({
							description: "The URL of the new image."
						})
					})
				}
			}
		},
		400: {
			description: "No file was included in the request."
		},
		500: {
			description: `There was an error handling the incoming file. This could be because the file was larger than ${MAX_IMAGE_SIZE_MB}MB or because it was not an image.`
		}
	}
})

export default userSpec
