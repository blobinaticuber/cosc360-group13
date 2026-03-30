import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { ErrInvalidBodySchema } from "util/errSchema.js"
import z from "zod"
import { ListingCreationSchema, ListingDetailsSchema, ListingUpdateSchema } from "./listing.js"

const listingSpec = new OpenAPIRegistry()

listingSpec.registerPath({
	method: "post",
	path: "/listing",
	summary: "Create a listing",
	description: "Create a new listing.",
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
		}
	}
})

listingSpec.registerPath({
	method: "get",
	path: "/listing/{id}",
	summary: "Get the details of a listing",
	description: "Get the details about a listing from its ID.",
	tags: [ "listing" ],
	request: {
		params: z.object({ id: z.string() })
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
	method: "patch",
	path: "/listing/{id}",
	summary: "Update a listing",
	description: "Update an existing listing.",
	tags: [ "Listing" ],
	request: {
		body: {
			content: {
				"application/json": {
					schema: ListingUpdateSchema
				}
			}
		}
	},
	responses: {
		201: {
			description: "Listing updated successfully."
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
			description: "Request was made by a user that doesn't own the listing."
		},
		404: {
			description: "The listing couldn't be found."
		}
	}
})

listingSpec.registerPath({
	method: "delete",
	path: "/listing/{id}",
	summary: "Delete a listing",
	description: "Delete the listing with the specified ID.",
	tags: [ "listing" ],
	request: {
		params: z.object({ id: z.string() })
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
