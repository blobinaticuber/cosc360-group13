import type { UserDetails } from "../server"

/**
 * Creates a default instance of {@link UserDetails}.
 */
function guestUser(): UserDetails {
	return {
		profilePicture: "/default_user_profile_picture.png",
		name: "Guest User",
		id: "guest"
	}
}

export default guestUser
