import type {
	AdminPersonalDetails,
	AdminRegistration,
	AdminUserUpdate,
	ListingsAnalytics,
	ReportsListData,
	UserCredentials
} from "./ServerTypes"
import { URL, type Result, type ResultWithoutValue } from "./index"

const admin = {
	/**
	 * Registers a new admin user.
	 */
	async register(
		registrationDetails: AdminRegistration
	): ResultWithoutValue<
		  "email and name already taken"
		| "name already taken"
		| "email already taken"
		| "unknown error"
		| "incorrect admin key"
	> {
		const res = await fetch(
			URL + "/admin/user", 
			{
				method: "POST",
				headers: [
					["Content-Type", "application/json"]
				],
				body: JSON.stringify(registrationDetails)
			}
		)

		switch (res.status) {
		case 201: 
			return null
		case 401:
			return "incorrect admin key"
		case 409: 
			const { conflicts } = await res.json()
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
	 * Logs in an admin user.
	 */
	async logIn(email: string, password: string): ResultWithoutValue<
		  "wrong password" 
		| "email not recognized" 
		| "unknown error"
	> {
		const res = await fetch(
			URL + "/admin/user/session", 
			{
				method: "POST",
				headers: [
					["Content-Type", "application/json"]
				],
				body: JSON.stringify({ 
					email, password 
				} satisfies UserCredentials),
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200: 
			return null
		case 401: 
			return "wrong password"
		case 404: 
			return "email not recognized"
		default: 
			return "unknown error"
		}
	},

	/**
	 * Logs the current admin user out.
	 */
	async logOut() {
		await fetch(
			URL + "/admin/user/session", 
			{
				method: "DELETE",
				credentials: "include"
			}
		)
	},

	/**
	 * Retrieve the personal details of the currently logged-in admin user.
	 */
	async currentUser(): Result<
		AdminPersonalDetails,
		"not logged in" | "unknown error"
	> {
		const res = await fetch(
			URL + "/admin/user/me", 
			{
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200:
			const body = await res.json() as AdminPersonalDetails
			return [body, null]
		case 401:
			return [null, "not logged in"]
		default:
			return [null, "unknown error"]
		}
	},

	/**
	 * Updates the currently logged-in admin user.
	 * 
	 * @param updates An update object; each field is optional. You should only
	 * include the fields that you want to change. E.g., if you want to change
	 * the name, the object should look like `{ name: "new name" }`.
	 */
	async update(
		updates: AdminUserUpdate
	): ResultWithoutValue<
		  "unknown error" 
		| "not logged in" 
		| "email and name already taken"
		| "name already taken"
		| "email already taken"
	> {
		const res = await fetch(
			URL + "/admin/user", 
			{
				method: "PATCH",
				credentials: "include",
				headers: [
					["Content-Type", "application/json"]
				],
				body: JSON.stringify(updates)
			}
		)

		switch (res.status) {
		case 200: 
			return null
		case 401:
		case 404: 
			return "not logged in"
		case 409:
			const { conflicts } = await res.json()
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

	async delete() {
		await fetch(URL + "/admin/user", {
			method: "DELETE",
			credentials: "include"
		})
	},

	/**
	 * Suspends a non-admin user. At the time of writing, "suspending" a user
	 * is irreversible, so be careful.
	 * 
	 * @param userId The ID of the user to suspend.
	 */
	async suspendUser(
		userId: string
	): ResultWithoutValue<
		"unauthorized" | "user not found" | "unknown error"
	> {
		const res = await fetch(
			URL + "/suspend/" + userId, 
			{
				method: "DELETE",
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200: 
			return null
		case 401: 
			return "unauthorized"
		case 404: 
			return "user not found"
		default: 
			return "unknown error"
		}
	},

	/**
	 * Deletes a user-submitted report.
	 * 
	 * @param reportId The ID ofthe report to delete.
	 */
	async deleteReport(
		reportId: string
	): ResultWithoutValue<
		"unauthorized" | "report not found" | "unknown error"
	> {
		const res = await fetch(
			URL + "/report/" + reportId, 
			{
				method: "DELETE",
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200: 
			return null
		case 401: 
			return "unauthorized"
		case 404: 
			return "report not found"
		default: 
			return "unknown error"
		}
	},

	/**
	 * Retrieves data about the top 10 most-reported users.
	 */
	async reportsAnalytics(): Result<
		ReportsListData,
		"unauthorized" | "unknown error"
	> {
		const res = await fetch(URL + "/analytics/reports", {
			credentials: "include"
		})

		switch (res.status) {
		case 200:
			const body = await res.json() as ReportsListData
			return [body, null]
		case 401:
			return [null, "unauthorized"]
		default:
			return [null, "unknown error"]
		}
	},

	/**
	 * Retrieves analytics regarding listings.
	 */
	async listingsAnalytics(): Result<
		ListingsAnalytics,
		"unauthorized" | "unknown error"
	> {
		const res = await fetch(
			URL + "/analytics/listings", 
			{
				credentials: "include"
			}
		)

		switch (res.status) {
		case 200:
			const body = await res.json() as ListingsAnalytics
			return [body, null]
		case 401:
			return [null, "unauthorized"]
		default:
			return [null, "unknown error"]
		}
	}
}

export default admin
