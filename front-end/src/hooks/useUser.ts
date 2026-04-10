import { useContext } from "react"
import { UserContext } from "../App"

function useUser() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error(
			"`useUser` must be used within a `UserContext` provider.")
	}

	return context
}

export default useUser
