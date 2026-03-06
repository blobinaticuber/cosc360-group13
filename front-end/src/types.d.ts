/**
 * The user type represents data about the currently logged-in user. This type
 * is incomplete at the time of writing, feel free to add fields to it if 
 * needed.
 */
export type User = {
	/**
	 * A string referencing a path to the user's profile picture. This should
	 * be appropriate for an `img` element's `src` property; i.e., it should be
	 * a path to some file in `public/` or a URL.
	 */
	profilePicture: string
	username: string
	id: string
}

/**
 * Represents an HTTP verb.
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"