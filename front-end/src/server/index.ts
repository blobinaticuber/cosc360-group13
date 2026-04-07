import type { BookDetailData, GetUserData, ListingCreation, ListingDetailData, UserDetails, UserPartialUpdateError, UserUpdate, ListingUpdate } from "./ServerTypes"
import admin from "./admin"

export const URL = import.meta.env.VITE_SERVER_BASE_URL as string

export type BookDetails = BookDetailData[number]
export type ListingDetails = ListingDetailData
export { type UserDetails } from "./ServerTypes"
export type PersonalDetails = GetUserData

export type GeneralErrorValue = string
export type ResultWithoutValue<ErrorValue extends GeneralErrorValue> =
	Promise<ErrorValue | null>
export type Result<ExpectedValue, ErrorValue extends GeneralErrorValue> =
	Promise<[ ExpectedValue, null ] | [ null, ErrorValue ]>

/**
 * This object wraps some methods and properties used for interacting with the
 * back-end of the app.
 *
 * The return values of the functions enclosed here follow the convention of
 * returning an error as a value. Many of the functions have a set of possible
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
 * then we know that the request worked without any problems. Additionally, if
 * you don't actually care about what kind of error occurred, you can just
 * check `err == null` instead of handling each error type individually.
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
 * ```
 *
 * In this case, the expected value (`books`) will be `null` if there was an
 * error. That is, if `books == null`, then `err != null`, and vice versa.
 */
const server = {
	/**
	 * Contains a set of methods that can only be used by administrative users.
	 */
	admin: admin,

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
	): Result<BookDetails[], "no matches found"	| "unknown error"> {
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
			return [null, "no matches found"]
		default:
			return [null, "unknown error"]
		}
	},


	/**
	 * Deletes a listing given its id
	 */
	async deleteListing(listingId: string) {
		const res = await fetch(
			URL + "/listing/" + listingId,
			{
				method: "DELETE",
				credentials: "include",
			}
		)

		switch (res.status) {
			case 200:
				return [null, "The listing has been deleted"]
			case 401:
				return [null, "Request was made by a user that doesn't own the listing"]
			case 404:
				return [null, "No listing with the ID could be found"]

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
	): ResultWithoutValue<
		"unrecognized user" | "unknown book id" | "unknown error"
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
	 * Searches for a user by their name. You can also use `name == "*"` to get
	 * all users.
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
	): Result<UserDetails[], "no users found" | "unknown error"> {
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
			return [null, "no users found"]
		default:
			return [null, "unknown error"]
		}
	},



	/**
	 * Searched for listings by a specific user using their user ID
	 * @param userId the user ID who you want to get listings from
	 */
	async searchListingsByUser(
		userId: string
	): Result<ListingDetails[], "unknown error" | "no listings found"> {

		const res = await fetch(
			URL + "/search/" + userId + "/listings"
		)

		if (res.ok) {
			const listings = await res.json()
			return [listings as ListingDetails[], null]
		}

		switch (res.status) {
		case 404:
			return [null, "no listings found"]
		default:
			return [null, "unknown error"]
		}
	},


	/**
	 * Searches for listings by the title of the books they contain. you can
	 * also use `name == "*"` to get all listings.
	 *
	 * @param name The name of the book to search for related listings.
	 * @param showUnavailable If set to `true`, then the search results will
	 * include listings that are currently marked as unavailable.
	 * @param page A positive integer representing which "page" of results you
	 * want. Each page will include up to ten books. E.g., if you want the top
	 * ten results, use `page == 1` (the default); for results 11 through 20,
	 * use `page == 2`, and so on.
	 * @returns A list of matching listings.
	 */
	async searchListing(
		name: string, showUnavailable?: boolean, page?: number
	): Result<ListingDetails[], "unknown error" | "no listings found"> {
		const query = new URLSearchParams({
			page: (page ?? 1).toString(),
			...(showUnavailable && { showUnavailable: "true" })
		})

		const res = await fetch(
			URL + "/search/listing/" + name + "?" + query.toString()
		)

		if (res.ok) {
			const listings = await res.json()
			return [listings as ListingDetails[], null]
		}

		switch (res.status) {
		case 404:
			return [null, "no listings found"]
		default:
			return [null, "unknown error"]
		}
	},

	/**
	 * Marks a listing as (un)available. Note that you have to be logged in
	 * as the owner of the listing in order to use this.
	 *
	 * @param listingId The ID of the listing to be marked as (un)available.
	 * @param available `true` if the listing should be made available, and
	 * `false` if it should be made unavailable.
	 */
	async setAvailability(
		listingId: string, available: boolean
	): ResultWithoutValue<
		  "unauthorized user"
		| "listing not found"
		| "unknown error"
	> {
		const res = await fetch(
			URL + "/listing/" + listingId,
			{
				method: "PATCH",
				credentials: "include",
				headers: [
					[ "Content-Type", "application/json" ]
				],
				body: JSON.stringify({
					available
				} satisfies ListingUpdate)
			}
		)

		switch (res.status) {
		case 200:
			return null
		case 401:
			return "unauthorized user"
		case 404:
			return "listing not found"
		default:
			return "unknown error"
		}
	},

	/**
	 * Get the details about the currently logged-in user.
	 */
	async currentUser(): Result<
		PersonalDetails, "not logged in" | "unknown error"
	> {
		const res = await fetch(
			URL + "/user/me",
			{
				method: "GET",
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200:
			const body = await res.json()
			return [body as PersonalDetails, null]
		case 401:
			return [null, "not logged in"]
		default:
			return [null, "unknown error"]
		}
	},

	/**
	 * Updates the details of the currently logged-in user. The object you pass
	 * to this function should only contain the fields you want updated. For
	 * example, if you wanted to update the `name` of the user, you can just
	 * use:
	 *
	 * ```
	 * server.updateUser({ name: "new name" })
	 * ```
	 *
	 * Any fields you don't include in the update object will be left
	 * unchanged.
	 *
	 * @param updates An object with a set of optional fields defining the user
	 * data that should be updated.
	 */
	async updateUser(updates: UserUpdate): ResultWithoutValue<
		  "invalid request body"
		| "not logged in"
		| "unknown error"
		| "email already taken"
		| "name already taken"
		| "email and name already taken"
	> {
		const res = await fetch(
			URL + "/user",
			{
				method: "PATCH",
				credentials: "include",
				body: JSON.stringify(updates),
				headers: [
					[ "Content-Type", "application/json" ]
				],

			}
		)

		switch (res.status) {
		case 200:
			return null
		case 400:
			return "invalid request body"
		case 401:
		case 404:
			return "not logged in"
		case 409:
			const { conflicts } = await res.json() as UserPartialUpdateError
			if (conflicts["name"] && conflicts["email"]) {
				return "email and name already taken"
			}
			if (conflicts["name"]) {
				return "name already taken"
			}
			if (conflicts["email"]) {
				return "email already taken"
			}
			return "unknown error"
		default:
			return "unknown error"
		}
	},

	/**
	 * Deletes the currently logged-in user.
	 */
	async deleteUser() {
		await fetch(
			URL + "/user",
			{
				method: "DELETE",
				credentials: "include",
			}
		)
	},

	/**
	 * Contains full URL for certain endpoints. This can be useful if you want
	 * to set the `url` property of a `<Form>`, for example, or if you just
	 * want to send a custom `fetch` request rather than using the methods of
	 * this object.
	 */
	paths: {
		login: URL + "/user/session",
		register: URL + "/user"
	}
}

export default server
