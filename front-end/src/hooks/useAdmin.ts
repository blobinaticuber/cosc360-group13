import { useContext } from "react"
import { AdminContext } from "../App"

function useAdmin() {
	const context = useContext(AdminContext)

	if (!context) {
		throw new Error(
			"`useUser` must be used within a `UserContext` provider.")
	}

	return context
}

export default useAdmin
