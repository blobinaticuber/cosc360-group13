import { useContext, useState } from "react"
import Header from "../components/layout/Header"
import "./Account.css"
import { UserContext } from "../App"
import Button from "../components/Button"

function Account() {
	const [user, _] = useContext(UserContext)
	if (!user) return <></>

	const [editing, setEditing] = useState(false)

	return (<>
		<Header currentPage="/account" />
		<main className="accountDashboard">
			<section className="profileSummary">
				<img src={user.profilePicture} alt="You!" />
				<p className="name">{user.name}</p>
				<p className="email">{user.email}</p>
			</section>
			<section className="accountControls">
				{!editing && 
					<Button
						text={"Edit Account Details"}
						onClick={() => setEditing(true)}
					/>				
				}
				{editing && <>
					<Button 
						text={"Save Changes"}
						onClick={() => {
							//TODO: Save changes to DB; update user context.
						}}
					/>
					<Button
						text={"Cancel Changes"}
						style="subtle"
						onClick={() => {
							setEditing(false)
						}}
					/>
					<Button 
						className="deleteAccount"
						text={"Delete Account"}
						style={"important"}
						onClick={() => {
							//TODO: Delete the user account
						}}
					/>
				</>}
			</section>
			<section className="listings">
				asdfasd
			</section>
		</main>
	</>)
}

export default Account
