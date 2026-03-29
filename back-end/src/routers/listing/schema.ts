import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { ErrInvalidBodySchema } from "util/errSchema.js"
import z from "zod"
import { ListingCreationSchema, ListingDetailsSchema } from "./listing.js"

const listingSpec = new OpenAPIRegistry()

listingSpec.registerPath({
	method: "post",
	path: "/listing",
	summary: "Create a listing",
	description: "Create a new listing under whichever user is currently logged in. The `book` field is the ID of the book as it appears in the Google Books API. To get such an ID, you should use the book search endpoint.",
	tags: [ "Listing" ],
	request: {
		body: {
			content: {
				"application/json": {
					schema: ListingCreationSchema
				}
			}
		}
	},
	responses: {
		201: {
			description: "Listing created successfully."
		},
		400: {
			description: "Invalid request body.",
			content: {
				"application/json": {
					schema: ErrInvalidBodySchema
				}
			}
		},
		401: {
			description: "Request made by an unrecognized user."
		},
		404: {
			description: "The book ID given was not recognized."
		}
	}
})

listingSpec.registerPath({
	method: "get",
	path: "/listing/{id}",
	summary: "Get a listing by its ID",
	description: "Get the details about a listing from its ID.",
	tags: [ "listing" ],
	request: {
		params: z.object({ 
			id: z.string().meta({
				description: "The ID of the listing."
			})
		})
	},
	responses: {
		200: {
			description: "The listing data.",
			content: {
				"application/json": {
					schema: ListingDetailsSchema
				}
			}
		},
		404: {
			description: "No listing with the ID could be found."
		}
	}
})

listingSpec.registerPath({
	method: "delete",
	path: "/listing/{id}",
	summary: "Delete a listing",
	description: "Deletes the specified listing if the currently logged-in user is the one who posted it.",
	tags: [ "listing" ],
	request: {
		params: z.object({ 
			id: z.string() 
		})
	},
	responses: {
		200: {
			description: "The listing has been deleted."
		},
		401: {
			description: "Request was made by a user that doesn't own the listing."
		},
		404: {
			description: "No listing with the ID could be found."
		},
	}
})

export default listingSpec
