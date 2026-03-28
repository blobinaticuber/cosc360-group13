import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import z from "zod"
import { BookDetailsSchema, ListingResultsSchema, UserResultsSchema } from "./search.js"
import { ErrServerSchema } from "util/errSchema.js"

const searchSpec = new OpenAPIRegistry()

searchSpec.registerPath({
	method: "get",
	path: "/search/listing/{title}",
	summary: "Search for a listing by its title",
	description: "Search for a book listing by its title. The response will include any listing where the title includes the {title} as a substring.",
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
					schema: ListingResultsSchema
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
	description: "Searches for a book by its title, using the Google Books API to retrieve results. Results are limited to twenty matching books at a time. Use the `page` query to get more results (e.g., `page=1`, the default, will show the top 20 matches, `page=2` shows results 21-40, and so on).",
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

export default searchSpec
