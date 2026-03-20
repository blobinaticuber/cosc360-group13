import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import z from "zod"
import { ListingResultsSchema, UserResultsSchema } from "./search.js"

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

export default searchSpec
