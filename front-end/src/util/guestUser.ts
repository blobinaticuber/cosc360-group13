import type { UserDetails } from "../server"
import defaultProfilePicture from "../assets/default_user_profile_picture.png"

/**
 * Creates a default instance of {@link UserDetails}.
 */
function guestUser(): UserDetails {
	return {
		profilePicture: defaultProfilePicture,
		name: "Guest User",
		id: "guest",
		email: "guest@email.com"
	}
}

export default guestUser
