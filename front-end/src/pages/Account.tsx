import { useContext, useEffect, useState } from "react"
import Header from "../components/layout/Header"
import "./Account.css"
import { UserContext } from "../App"
import Button from "../components/Button"
import { faAt, faPencil, faSave, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import type { UserUpdate } from "../server/ServerTypes"
import server, { type ListingDetails } from "../server"
import TextInput from "../components/forms/TextInput"
// import server from "../server"
import { toast } from "react-toastify"
import validEmail from "../util/validEmail"

import BookCardEditable from "../components/book_search/BookCardEditable"

function Account() {
	const navigate = useNavigate()

	const [user, setUser] = useContext(UserContext)
	if (!user) {
		navigate("/")
		return <></>
	}
	const currentUser = user

	const [listings, setListings] = useState<ListingDetails[]>([])

	const [editing, setEditing] = useState(false)
	const [loading, setLoading] = useState(false)

	const [nameErr, setNameErr] = useState<string | undefined>(undefined)
	const [emailErr, setEmailErr] = useState<string | undefined>(undefined)
	const [updateFields, setUpdateFields] = useState<UserUpdate>({})

	function updateListingView(): void {
		const userId = currentUser.id
		const fetchListings = async () => {
			const [listings, _] = await server.searchListingsByUser(userId)
			setListings(listings ?? [])
		}
		fetchListings()
	}

	useEffect(() => {
		const fetchListings = async () => {
			const [listings, _] = await server.searchListingsByUser(currentUser.id)
			setListings(listings ?? [])
		}
		fetchListings()
	}, [currentUser.id])

	useEffect(() => {
		setNameErr(undefined)
		setEmailErr(undefined)
	}, [editing])

	return (<>
		<Header currentPage="/account" hideProfileMenu />
		<main className="accountDashboard">
			<section className="profileSummary">
				<h1>Account Details</h1>
				<div className="accountDetails">
					<img src={user.profilePicture} alt="You!" />
				{editing ?
					<>
					<div className="accountDetailsFields">
						<TextInput
							type="text"
							icon={faUser}
							initialValue={user.name}
							name="name"
							error={nameErr}
							onChange={name => {
								setNameErr(undefined)

								if (name == user.name || name.length == 0) {
									delete updateFields.name
									return
								}

								setUpdateFields(prev => {
									return { ...prev, name }
								})
							}}
						/>
						<TextInput
							type="email"
							icon={faAt}
							initialValue={user.email}
							name="email"
							error={emailErr}
							onChange={email => {
								setEmailErr(undefined)


								if (email == user.email || email.length == 0) {
									delete updateFields.email
									return
								}

								if (!validEmail(email)) {
									setEmailErr("Invalid email")
								}

								setUpdateFields(prev => {
									return { ...prev, email }
								})
							}}
						/>
						</div>
					</>
					:
					<>
					<div className="accountDetailsFields">
						<p className="name">{user.name}</p>
						<p className="email">{user.email}</p>
					</div>
					</>
				}
				</div>

				</section>
			<section className="accountControls">
				{!editing &&
					<Button
						icon={faPencil}
						text={"Edit Profile"}
						onClick={() => setEditing(true)}
					/>
				}
				{editing && <>
					<Button
						icon={faSave}
						text={"Save Changes"}
						spinning={loading}
						onClick={async () => {

							if (!updateFields.email && !updateFields.name) {
								toast.info(
									"No changes to make", { autoClose: 1000 }
								)
								setEditing(false)
								return
							}

							setLoading(true)
							const err = await server.updateUser(updateFields)
							setLoading(false)

							switch (err) {
							case null:
								toast.success("Profile updated")
								setUser!(prev => {
									return { ...prev!, ...updateFields }
								})
								setEditing(false)
								return
							case "email already taken":
								setEmailErr("This email is already in use")
								return
							case "name already taken":
								setNameErr("This name is taken")
								return
							case "email and name already taken":
								setNameErr("This name is taken")
								setEmailErr("This email is already in use")
								return
							default:
								toast.error("Unknown error occurred")
								return
							}
						}}
					/>
					<Button
						text={"Cancel Changes"}
						style="subtle"
						disable={loading}
						onClick={() => {
							setEditing(false)
						}}
					/>
					<Button
						icon={faTrash}
						disable={loading}
						className="deleteAccount"
						text={"Delete Account"}
						style={"important"}
						onClick={() => {
							setLoading(true)
							server.deleteUser()
							setLoading(false)

							setUser!(null)
							navigate("/")
						}}
					/>
				</>}
			</section>
			<section className="listings">
				<h1>Your Listings</h1>
				<div className="searchResultsContainer">
					{listings.length > 0 ? listings.map(listing => <BookCardEditable book={listing.book} update={updateListingView} listingId={listing.id} available={listing.available}/>) : "No listings"}
				</div>
			</section>
		</main>
	</>)
}

export default Account
