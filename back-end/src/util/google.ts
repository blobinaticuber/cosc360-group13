import { BookDetailsSchema, type BookDetails } from "routers/book/book.js"
import type { Volume } from "../types/GoogleBooks.js"
import type Method from "types/Method.js"

const API_URL = "https://www.googleapis.com/books/v1"
const RESULTS_PER_SEARCH = 10
const API_KEY = process.env.GOOGLE_BOOKS_KEY

if (!API_KEY) {
	throw new Error(`
    The \`GOOGLE_BOOKS_KEY\` is not defined in the current environment. Try the
    following steps:
	
      1) Make sure you have a Google Books API key. If you don't have one, 
         you can make one for free at:
		 
              \u001b[4;94mhttps://console.cloud.google.com\u001b[0m
		
      2) Create or update a file named \`.env.local\` inside of the 
         \`back-end\` directory. In that file, make sure you have the following
         line: 

         GOOGLE_BOOKS_KEY="<your_api_key_here>"
	
      3) Restart the server. You shouldn't receive this error again.
	`)
}

function volumeToBookDetails(volume: Volume): BookDetails {
	return {
		id: volume.id!,
		authors: volume.volumeInfo!.authors!,
		rating: volume.volumeInfo!.averageRating,
		categories: volume.volumeInfo!.categories!,
		description: volume.volumeInfo!.description!,
		image: volume.volumeInfo?.imageLinks?.extraLarge
			?? volume.volumeInfo?.imageLinks?.large
			?? volume.volumeInfo?.imageLinks?.medium
			?? volume.volumeInfo?.imageLinks?.small
			?? volume.volumeInfo?.imageLinks?.thumbnail
			?? volume.volumeInfo?.imageLinks?.smallThumbnail
			?? process.env.SERVER_URL + 
				"public/default_listing_picture.png",
		title: volume.volumeInfo?.title! + 
			(volume.volumeInfo?.subtitle != undefined
				? ": " + volume.volumeInfo?.subtitle 
				: "")
	}
}

function throwGoogleBooksErr(method: string, path: string): never {
	throw new Error(
		"Error fetching data from the Google Books API.\n\n\t" +
		method + " " + API_URL + path +
		"\n\n"
	)
}

/**
 * A simple client for making relevant requests to/from the Google Books API.
 */
const googleBooks = {
	/**
	 * Searches the Google Books API for books.
	 * 
	 * @param title The title of the book to search for.
	 * @param page The search results page. I.e., page 0 has the top 10 
	 * results, page 1 has results 11-20, and so on.
	 * @returns An array of up to 10 books.
	 */
	async searchByTitle(
		title: string,
		page?: number
	): Promise<BookDetails[]> {

		if (!page) page = 0

		const query = new URLSearchParams({
			q: "intitle:" + title,
			key: API_KEY,
			langRestrict: "en",
			orderBy: "relevance",
			printType: "books",
			startIndex: (page * RESULTS_PER_SEARCH).toString(),
			maxResults: RESULTS_PER_SEARCH.toString() 
		})
		const path = "/volumes?" + query.toString()

		const res = await fetch(
			API_URL + "/volumes?" + query.toString(),
		)

		if (!res.ok) {
			throwGoogleBooksErr("GET", path)
		}

		const body = await res.json() as { items: Volume[] }
		
		return body.items
			.map(volumeToBookDetails)
			.filter(book => {
				if (!book.categories) 
					return true
				return !book.categories.includes("Audiobooks")
			})
	},

	/**
	 * Gets the book details based on a Google Books ID.
	 * 
	 * @param id The Google Books ID of the book to retrieve.
	 * @returns The details for the specified book.
	 */
	async findById(id: string): Promise<BookDetails> {
		const query = new URLSearchParams({
			key: API_KEY
		})
		const path = "/volumes/" + id + "?" + query.toString()

		const res = await fetch(
			API_URL + path
		)

		if (!res.ok) {
			throw throwGoogleBooksErr("GET", path)
		}

		const body = await res.json() as Volume

		return volumeToBookDetails(body)
	}
}

export default googleBooks
