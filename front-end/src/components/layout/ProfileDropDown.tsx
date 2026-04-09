import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { UserDetails } from "../../server"
import guestUser from "../../util/guestUser"
import Button from "../Button"
import Modal from "../popup/Modal"
import "./ProfileDropDown.css"
import server from "../../server"
import useUser from "../../hooks/useUser"

type ProfileDropDownProps = {
	/**
	 * The currently logged-in user. If one is not provided, then it is assumed
	 * that the user is a guest.
	 */
	user?: UserDetails | null
}


/**
 * This profile drop-down menu displays a user's icon, and when the icon is
 * clicked, provides a drop-down menu offering actions related to the user
 * profile. It is meant to be used for the currently logged-in user, not to
 * display information about a public user profile. 
 * 
 * At the time of writing, this component is styled specifically for use in
 * the `Header` element. You might run into issues if you try to use it
 * elsewhere.
 */
function ProfileDropDown({ user }: ProfileDropDownProps) {

	const { profilePicture, name } = user ?? guestUser()

	const navigate = useNavigate()
	const [showProfileMenu, setShowProfileMenu] = useState(false)
	const profileIcon = useRef<HTMLImageElement | null>(null)
	const [_, setUser] = useUser()

	return (
		<div className="profileDropDownContainer">
			<img
				className={
					"profileDropDownIcon" + (showProfileMenu
						? " profileDropDownIconActive" : "")
				}
				src={profilePicture}
				alt="Profile picture."
				onClick={() => setShowProfileMenu(prev => !prev)}
				ref={profileIcon}
			/>
			<Modal
				className="profileDropDownMenu"
				show={showProfileMenu}
				onClickAway={e => {
					if (e.target == profileIcon.current) return

					setShowProfileMenu(false)
				}}
			>
				{user ?
					<>
						<h2>{name}</h2>
						<Button
							onClick={() => {
								navigate("/account")
							}}
							className="profileDropDownButton"
							style="normal"
							icon={faCircleUser}
							text={"My Account"}
						/>
						<Button
							onClick={async () => {
								await server.logOut()
								
								setUser!(null)
								setShowProfileMenu(false)
								navigate("/")
							}}
							className="profileDropDownButton"
							style="subtle"
							icon={faRightFromBracket}
							text="Log Out"
						/>
					</>
					:
					<>
						<p>
							You aren't currently logged in.
						</p>
						<p>
							<Link to="/login">Log in</Link>
							&nbsp;or&nbsp;
							<Link to="/register">create an account.</Link>
						</p>
					</>
				}
			</Modal>
		</div>)
}

export default ProfileDropDown
