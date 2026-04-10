import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { BookDetailsSchema } from "../../util/bookSchema.js";
import { ErrServerSchema } from "../../util/errSchema.js";
import { ListingDetailsSchema } from "../listing/listing.js";
import {
	BOOKS_PER_CATEGORY,
	CategoryBooksSchema,
	ListedBookSchema,
	MAX_LISTINGS_PER_BOOK,
	NUMBER_OF_TOP_CATEGORIES,
	RESULTS_PER_PAGE,
	UserListingSchema,
	UserResultsSchema,
} from "./search.js";

const searchSpec = new OpenAPIRegistry();

searchSpec.registerPath({
	method: "get",
	path: "/search/listing/{title}",
	summary: "Search for a listing",
	description:
		"Search for a book listing by the title of the associated book. The response will include any listing where the book title includes the {title} as a substring. Results are limited to 10 at a time, but you can use the `page` parameter to see more. E.g., to get the top 10 results, use `page=1`, to get listings 11-20, use `page=2`, and so on.",
	tags: ["Listing", "Search"],
	request: {
		query: z.object({
			page: z.int().positive().optional(),
			showUnavailable: z.boolean().optional().meta({
				description:
					"Set this to any value if you want to include the currently-unavailable listings in the results. If you don't want such results included, then omit this query parameter.",
			}),
		}),
		params: z.object({
			title: z.string(),
		}),
	},
	responses: {
		200: {
			description: "The matching results were found.",
			content: {
				"application/json": {
					schema: z.array(ListingDetailsSchema),
				},
			},
		},
		404: {
			description: "No matching results were found.",
		},
		400: {
			description: "The `page` query wasn't an integer.",
		},
	},
});

searchSpec.registerPath({
	method: "get",
	path: "/search/user/{name}",
	summary: "Search for a user by their name",
	description:
		"Search for a user by their name. The response will include any user whose name includes the {name} parameter as a substring.",
	tags: ["User", "Search"],
	request: {
		query: z.object({
			page: z.int().positive().optional(),
		}),
		params: z.object({
			name: z.string(),
		}),
	},
	responses: {
		200: {
			description: "The matching users were found.",
			content: {
				"application/json": {
					schema: UserResultsSchema,
				},
			},
		},
		404: {
			description: "No matching users were found.",
		},
		400: {
			description: "The `page` query wasn't an integer.",
		},
	},
});

searchSpec.registerPath({
	method: "get",
	path: "/search/book/{title}",
	summary: "Search for a book by its title",
	description:
		"Searches for a book by its title, using the Google Books API to retrieve results. Results are limited to 10 matching books at a time. Use the `page` query to get more results (e.g., `page=1`, the default, will show the top 10 matches, `page=2` shows results 11-20, and so on).",
	tags: ["Book", "Search"],
	request: {
		query: z.object({
			page: z.int().positive().optional(),
		}),
		params: z.object({
			title: z.string(),
		}),
	},
	responses: {
		200: {
			description: "Matching books were found.",
			content: {
				"application/json": {
					schema: z.array(BookDetailsSchema),
				},
			},
		},
		400: {
			description: "The `page` query wasn't an integer.",
		},
		404: {
			description: "No matching books were found.",
		},
		500: {
			description:
				"The server had an issue connecting to the Google Books API or retrieving results from it.",
			content: {
				"application/json": {
					schema: ErrServerSchema,
				},
			},
		},
	},
});

searchSpec.registerPath({
	method: "get",
	path: "/search/{userId}/listings",
	summary: "Search for listings by user",
	description: "Retrieves all listings that were posted by a user.",
	tags: ["Listing", "Search"],
	request: {
		params: z.object({
			userId: z.string(),
		}),
	},
	responses: {
		200: {
			description: "The user's listings were found.",
			content: {
				"application/json": {
					schema: z.array(UserListingSchema),
				},
			},
		},
		404: {
			description: "No matching listings were found.",
		},
	},
});

searchSpec.registerPath({
	method: "get",
	path: "/search/listed/{bookTitle}",
	summary: "Search Listed Books",
	description:
		`Searches for the top ${RESULTS_PER_PAGE} books based on the number of listings they have. The search results will include the book details and their associated listings (up to a maximum of ${MAX_LISTINGS_PER_BOOK}). Listings marked as "unavailable" will be included as well, but they will only be shown last. To get beyond the top ${RESULTS_PER_PAGE} results, you can pass a \`page\` number as a query. E.g., to get results ${
			RESULTS_PER_PAGE + 1
		} through ${RESULTS_PER_PAGE * 2}, you could set \`?page=2\`.`,
	tags: ["Search", "Book"],
	request: {
		params: z.object({
			bookTitle: z.string().meta({
				description: "The title of the book to search for.",
			}),
		}),
		query: z.object({
			page: z.int().positive().optional().meta({
				description: "The results page. Defaults to `1`.",
			}),
		}),
	},
	responses: {
		200: {
			description: "Search results were found.",
			content: {
				"application/json": {
					schema: z.array(ListedBookSchema),
				},
			},
		},
		400: {
			description: "The `page` query was not an integer.",
		},
		404: {
			description: "No matching results were found.",
		},
	},
});

searchSpec.registerPath({
	method: "get",
	path: "/search/browse",
	summary: "Get Popular Categories",
	description:
		`Selects the top ${NUMBER_OF_TOP_CATEGORIES} most popular categories (based on number of listings), and for each one selects the top ${BOOKS_PER_CATEGORY} most popular books. This data can be used for displaying a section on a page where users can browse popular books across genres. This feature is currently limited, but since the website is meant to be local, it seems appropriate in lieu of a full-fledged recommendation algorithm.`,
	tags: ["Search"],
	responses: {
		200: {
			description: "Results were found.",
			content: {
				"application/json": {
					schema: z.array(CategoryBooksSchema),
				},
			},
		},
	},
});

export default searchSpec;
