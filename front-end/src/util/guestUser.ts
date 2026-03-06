import type { User } from "../types"

/**
 * Creates a default instance of {@link User}.
 */
function guestUser(): User {
	return {
		profilePicture: "/default_user_profile_picture.png",
		username: "Guest User",
		id: "guest"
	}
}

export default guestUser
