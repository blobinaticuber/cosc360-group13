import "./Reports.css"
import { useEffect, useState } from "react"
import server, { type ReportedUser } from "../../server"
import Button from "../Button"
import { toast } from "react-toastify"
import { faBan, faTrash } from "@fortawesome/free-solid-svg-icons"

function Reports() {
	const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([])
	const [expandedUser, setExpandedUser] = useState("")

	useEffect(() => {
		server.admin
			.reportsAnalytics()
			.then(([ data, err ]) => {
				if (err != null) {
					setReportedUsers([])
					return
				}
				setReportedUsers([...data])
			})
	}, [])

	async function deleteReport(id: string) {
		const err = await server.admin.deleteReport(id)

		switch (err) {
		case "report not found":
			return
		case "unauthorized":
			toast.error("Admin authorization failed", { theme: "dark" })
			return
		case "unknown error":
			toast.error("Unknown error occurred", { theme: "dark" })
			return
		}

		toast.success("Report Dismissed", { theme: "dark" })
		setReportedUsers(prev => {
			prev.forEach(details => {
				details.reports = details.reports
					.filter(report => report.id != id)
			})
			return prev.filter(details => details.reports.length > 0)
		})
	}

	async function suspendUser(id: string) {
		const err = await server.admin.suspendUser(id)

		switch (err) {
		case "unauthorized":
			toast.error("Admin authorization failed", { theme: "dark" })
			return
		case "user not found":
			return
		case "unknown error":
			toast.error("Unknown error occurred", { theme: "dark" })
			return
		}

		toast.success("User Suspended", { theme: "dark" })
		setReportedUsers(prev => 
			prev.filter(details => details.user != id))
	}

	if (reportedUsers.length == 0) {
		return <p className="noReportsMessage">No user reports.</p>
	}

	return <>
		<h1 className="reportHeading">Reported Users</h1>
		{reportedUsers.map(details => 
			<ReportedUser 
				key={details.user} 
				{...details} 
				deleteReport={deleteReport} 
				suspendUser={suspendUser}
				onClick={setExpandedUser}
				expanded={expandedUser == details.user}
			/>)}
	</>
}

type ReportedUserProps = ReportedUser & {
	deleteReport: (reportId: string) => Promise<void>
	suspendUser: (userId: string) => Promise<void>
	expanded?: boolean
	onClick?: (userId: string) => void
}

function ReportedUser({ 
	user, reports, deleteReport, expanded, onClick, suspendUser
}: ReportedUserProps) {

	// When we're waiting for a report to be deleted, this is set to the ID of
	// said report.
	const [pendingReportDeletion, setPendingReportDeletion] = 
		useState<string | null>(null)
	// When we're waiting for a user to be suspended, this is set to `true`.
	const [pendingUserSuspension, setPendingUserSuspension] = 
		useState(false)

	return <div 
		className="reportedUser" 
		onClick={() => {
			if (onClick) {
				onClick(user)
			}
		}}
	>
		<h1 className="reportedUserId">User #{user}</h1>
		<Button
			style="important"
			text="Suspend"
			spinning={pendingUserSuspension}
			className="suspendUserButton"
			onClick={async () => {
				if (!confirm(
					`Are you sure you want to suspend user #${user}`
				)) {
					return
				}
				setPendingUserSuspension(true)
				await suspendUser(user)
				setPendingUserSuspension(false)
			}}
			icon={faBan}
		/>
		{expanded && reports.map(report => 
			<div className="report" key={report.id}>
				<h1 className="reportId">Report #{report.id}</h1>
				<p className="submittedBy">Submitted by User #{report.submittedBy}</p>
				<p className="explanation">
					{report.explanation.length > 0
						? report.explanation
						: "No explanation given."}
				</p>
				<Button
					spinning={pendingReportDeletion == report.id
					       || pendingUserSuspension}
					className="dismissReportButton"
					text=""
					icon={faTrash}
					onClick={async () => {
						setPendingReportDeletion(report.id)
						await deleteReport(report.id)
						setPendingReportDeletion(null)
					}}
				/>
			</div>	
		)}
		{!expanded && 
			<p className="reportCount">
				{reports.length} Reports
			</p>}
	</div>
}

export default Reports
