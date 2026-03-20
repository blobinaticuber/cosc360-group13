import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import z from "zod"
import { ListingResultsSchema } from "./search.js"

const searchSpec = new OpenAPIRegistry()

searchSpec.registerPath({
	method: "get",
	path: "/search/listing/{title}",
	description: "Search for a book listing by its title.",
	tags: [ "Listing", "Search" ],
	request: {
		query: z.object({
			page: z.int().positive()
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

export default searchSpec
