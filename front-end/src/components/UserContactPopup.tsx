import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { BookDetails, UserDetails } from "../server"
import Popup from "./popup/Popup"
import "./UserContactPopup.css"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"

type UserContactPopupProps = {
	show: boolean
	onClickAway?: () => void
	user: UserDetails
	book: BookDetails
}

function UserContactPopup({ 
	user, book, show, onClickAway 
}: UserContactPopupProps) {
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
			</div>
			<p className="prompt">
				{user.name} has a copy of <em>{book.title}</em> available. Contact them and arrange a time pick it up.
			</p>
		</div>
	</Popup>
}

export default UserContactPopup
