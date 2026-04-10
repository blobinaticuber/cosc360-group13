import { useState } from "react"
import type { UserDetails } from "../server"
import "./ReportForm.css"
import Button from "./Button"
import server from "../server"
import { toast } from "react-toastify"

type ReportFormProps = {
	userToReport: UserDetails
	onClose: () => void
}

function ReportForm({ userToReport, onClose }: ReportFormProps) {

	const [loading, setLoading] = useState(false)
	const [explanation, setExplanation] = useState("")

	return <div
		className="reportForm"
	>
		<h1 className="reportFormHeader">Report {userToReport.name}</h1>
		<textarea 
			placeholder="Explain why you're reporting this user..." 
			onChange={e => setExplanation(e.target.value)}
		/>
		<div className="reportFormButtons">
			<Button 
				disable={loading}
				style="subtle"
				text="Cancel"
				onClick={onClose}
			/>
			<Button
				spinning={loading}
				style="normal"
				text="Submit Report"
				onClick={async () => {
					setLoading(true)
					const err = await server.submitReport(
						userToReport.id, explanation)
					setLoading(false)

					switch (err) {
					case "unauthorized user":
						toast.error("You must be logged in to submit a report")
						return
					case "unknown error":
					case "user not found":
						toast.error("An unknown error occurred")
						return
					}

					toast.success("Report submitted.")
					onClose()
				}}
			/>
		</div>
	</div>
}

export default ReportForm
