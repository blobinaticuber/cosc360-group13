import URL, { type ResultWithoutValue } from "./index"

const admin = {
	/**
	 * Deletes a user-submitted report.
	 * 
	 * @param reportId The ID of the report to delete.
	 */
	async deleteReport(reportId: string): ResultWithoutValue<
		"unauthorized user" | "report not found" | "unknown error"
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
			return "unauthorized user"
		case 404:
			return "report not found"
		default: 
			return "unknown error"
		}
	},

	// TODO: Finish implementing the admin methods and figure out a way to
	// use context for admins.
}

export default admin
