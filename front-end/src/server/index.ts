import type { BookDetailData, ListingCreation, UserDetails } from "./ServerTypes"

const URL = import.meta.env.VITE_SERVER_BASE_URL as string

export type BookDetails = BookDetailData[number]
export { type UserDetails } from "./ServerTypes"

/**
 * This object wraps some methods and properties used for interacting with the
 * back-end of the app. 
 * 
 * The return values of the functions enclosed here follow the convention of
 * returning an error as a value. Many of the functions has a set of possible
 * error strings, each of which denote a specific error. This lets you use
 * them like so:
 * 
 * ```
 * const err = await server.createListing("some book ID")
 * 
 * // Handle the possible errors.
 * switch (err) {
 * case "unrecognized user": 
 * 	// ...
 * 	return
 * case "unknown book id":
 * 	// ...
 * 	return
 * case "unknown error":
 * 	// ...
 * 	return
 * }
 * ```
 * 
 * If none of the error strings are matched, or if the `err` result is `null`,
 * then we know that the request worked without any problems. 
 * 
 * If a function should return a value, then we simply pair the normal return
 * value with the error value in an array. The expected result always comes
 * before the error string. E.g.,
 * 
 * ```
 * const [books, err] = server.searchBooks("book title")
 * 
 * switch (err) {
 * case "no matches found":
 * 	// ...
 * 	return
 * case "unknown error":
 * 	// ...
 * 	return
 * }
 * 
 * // We can safely use `books` since none of the possible errors were matched.
 * ```
 */
const server = {
	/**
	 * Searches the Google Books database for a book based on its title.
	 * 
	 * @param title The book title to search for, which will be sent to the
	 * server.
	 * @param page A positive integer representing which "page" of results you
	 * want. Each page will include up to ten books. E.g., if you want the top
	 * ten results, use `page == 1` (the default); for results 11 through 20,
	 * use `page == 2`, and so on.
	 * @returns A list of matching books.
	 */
	async searchBooks(
		title: string, page?: number
	): Promise<[
		BookDetailData, 
		  null 
		| "no matches found" 
		| "unknown error"
	]> {
		const query = new URLSearchParams({
			page: (page ?? 1).toString()
		})

		const res = await fetch(
			URL + "/search/book/" + title + "?" + query.toString()
		)

		switch (res.status) {
		case 200:
			const results = await res.json()
			return [results as BookDetailData, null]
		case 404:
			return [[], "no matches found"]
		default:
			return [[], "unknown error"]
		}
	},

	/**
	 * Lists a book under whichever user is currently logged in. If the listing
	 * was created successfully, this function will return `null`. Otherwise,
	 * it will return a string describing the reason for the failure.
	 * 
	 * @param bookId The Google Books `id` of the book that you are listing.
	 */
	async createListing(
		bookId: string
	): Promise<null 
		| "unrecognized user" 
		| "unknown book id" 
		| "unknown error"
	> {
		const res = await fetch(
			URL + "/listing",
			{
				method: "POST",
				headers: [
					[ "Content-Type", "application/json" ]
				],
				body: JSON.stringify({
					book: bookId
				} satisfies ListingCreation),
				credentials: "include"
			}
		)

		switch (res.status) {
		case 201:
			return null
		case 401:
			return "unrecognized user"
		case 404:
			return "unknown book id"
		default:
			return "unknown error"
		}
	},

	/**
	 * Logs the current user out. 
	 */
	async logOut() {
		await fetch(
			URL + "/user/session",
			{
				method: "DELETE",
				credentials: "include"
			}
		)
	},

	/**
	 * Searches for a user by their name.
	 * 
	 * @param name
	 * @param page A positive integer representing which "page" of results you
	 * want. Each page will include up to ten books. E.g., if you want the top
	 * ten results, use `page == 1` (the default); for results 11 through 20,
	 * use `page == 2`, and so on.
	 * @returns A list of matching users.
	 */
	async searchUser(
		name: string, page?: number
	): Promise<[
		UserDetails[], 
		  null 
		| "no users found"
		| "unknown error"
	]> {
		const query = new URLSearchParams({
			page: (page ?? 1).toString()
		})

		const res = await fetch(
			URL + "/search/user/" + name + "?" + query.toString()
		)

		if (res.ok) {
			const users = await res.json()
			return [users as UserDetails[], null]
		}

		switch (res.status) {
		case 404:
			return [[], "no users found"]
		default:
			return [[], "unknown error"]
		}
	},

	paths: {
		login: URL + "/user/session",
		register: URL + "/user"
	}
}

export default server
