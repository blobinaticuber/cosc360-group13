import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import z from "zod"
import { UserListingSchema, UserResultsSchema } from "./search.js"
import { BookDetailsSchema } from "routers/book/book.js"
import { ErrServerSchema } from "util/errSchema.js"
import { ListingDetailsSchema } from "routers/listing/listing.js"

const searchSpec = new OpenAPIRegistry()

searchSpec.registerPath({
	method: "get",
	path: "/search/listing/{title}",
	summary: "Search for a listing",
	description: "Search for a book listing by the title of the associated book. The response will include any listing where the book title includes the {title} as a substring. Results are limited to 10 at a time, but you can use the `page` parameter to see more. E.g., to get the top 10 results, use `page=1`, to get listings 11-20, use `page=2`, and so on.",
	tags: [ "Listing", "Search" ],
	request: {
		query: z.object({
			page: z.int().positive().optional()
		}),
		params: z.object({ 
			title: z.string(),
		})
	},
	responses: {
		200: {
			description: "The matching results were found.",
			content: {
				"application/json": {
					schema: z.array(ListingDetailsSchema)
				}
			}
		},
		404: {
			description: "No matching results were found."
		},
		400: {
			description: "The `page` query wasn't an integer."
		}
	}
})

searchSpec.registerPath({
	method: "get",
	path: "/search/user/{name}",
	summary: "Search for a user by their name",
	description: "Search for a user by their name. The response will include any user whose name includes the {name} parameter as a substring.",
	tags: [ "User", "Search" ],
	request: {
		query: z.object({
			page: z.int().positive().optional()
		}),
		params: z.object({ 
			name: z.string(),
		})
	},
	responses: {
		200: {
			description: "The matching users were found.",
			content: {
				"application/json": {
					schema: UserResultsSchema
				}
			}
		},
		404: {
			description: "No matching users were found."
		},
		400: {
			description: "The `page` query wasn't an integer."
		}
	}
})

searchSpec.registerPath({
	method: "get",
	path: "/search/book/{title}",
	summary: "Search for a book by its title",
	description: "Searches for a book by its title, using the Google Books API to retrieve results. Results are limited to 10 matching books at a time. Use the `page` query to get more results (e.g., `page=1`, the default, will show the top 10 matches, `page=2` shows results 11-20, and so on).",
	tags: [ "Book", "Search" ],
	request: {
		query: z.object({
			page: z.int().positive().optional()
		}),
		params: z.object({
			title: z.string()
		})
	},
	responses: {
		200: {
			description: "Matching books were found.",
			content: {
				"application/json": {
					schema: z.array(BookDetailsSchema)
				}
			}
		},
		400: {
			description: "The `page` query wasn't an integer."
		},
		404: {
			description: "No matching books were found."
		},
		500: {
			description: "The server had an issue connecting to the Google Books API or retrieving results from it.",
			content: {
				"application/json": {
					schema: ErrServerSchema
				}
			}
		}
	}
})

searchSpec.registerPath({
	method: "get",
	path: "/search/{userId}/listings",
	summary: "Search for listings by user",
	description: "Retrieves all listings that were posted by a user.",
	tags: [ "Listing", "Search" ],
	request: {
		params: z.object({
			userId: z.string()
		})
	},
	responses: {
		200: {
			description: "The user's listings were found.",
			content: {
				"application/json": {
					schema: z.array(UserListingSchema)
				}
			}
		},
		404: {
			description: "No matching listings were found."
		},
	}
})

export default searchSpec
