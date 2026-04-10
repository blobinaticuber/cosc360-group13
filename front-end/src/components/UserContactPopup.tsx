import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { BookDetails, UserDetails } from "../server"
import Popup from "./popup/Popup"
import "./UserContactPopup.css"
import { faEnvelope, faWarning } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useUser from "../hooks/useUser"
import Button from "./Button"
import { useState } from "react"
import ReportForm from "./ReportForm"

type UserContactPopupProps = {
	show: boolean
	onClickAway?: () => void
	user: UserDetails
	book: BookDetails
}

function UserContactPopup({ 
	user, book, show, onClickAway 
}: UserContactPopupProps) {
	const [activeUser, _] = useUser()
	const [showReportForm, setShowReportForm] = useState(false)

	return <Popup 
		show={show}
		onClickAway={onClickAway}
	>
		<div
			className="userPopup"
		>
			<img src={user.profilePicture} alt="" className="profilePicture" />
			<div className="overview">
				<h1>{user.name}</h1>
				<p
					className="contactInfo"
				>
					<FontAwesomeIcon icon={faEnvelope} /> <span 
						className="emailLink"
						onClick={() => {
							navigator.clipboard.writeText(user.email)
							toast.success("Email copied to clipboard")
						}}					
					>
						{user.email}
					</span>
				</p>
				{activeUser?.id != user.id && <Button
					className="reportButton"
					icon={faWarning}
					style="important"
					onClick={() => {
						if (activeUser == null) {
							toast.info("You must be logged in to submit a report")
							return
						}
						setShowReportForm(true)
					}}
				/>}
			</div>
			{!showReportForm && <p className="prompt">
				{user.name} has a copy of <em>{book.title}</em> available. Contact them and arrange a time pick it up.
			</p>}
			{showReportForm && <ReportForm
				userToReport={user}
				onClose={() => setShowReportForm(false)}
			/>}
		</div>
	</Popup>
}

export default UserContactPopup
