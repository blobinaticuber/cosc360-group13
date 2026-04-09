import { useEffect, useState } from "react"
import Header from "../components/layout/Header"
import "./Account.css"
import Button from "../components/Button"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import server, { type ListingDetails } from "../server"

import BookCardEditable from "../components/book_search/BookCardEditable"
import useUser from "../hooks/useUser"
import ProfileOverview from "../components/account_page/ProfileOverview"
import CreateListingForm from "../components/create_listing/CreateListingForm"

function Account() {

	const [ user, _ ] = useUser()

	const [listings, setListings] = useState<ListingDetails[]>([])
	const [creatingListing, setCreatingListing] = useState(false)

	const [pageLoadingMessage, setPageLoadingMessage] = useState(
		<>Loading...</>
	)

	// If after 2 seconds we haven't retrieved the user information, then
	// we assume they're not logged in and prompt them to navigate to the
	// login page.
	useEffect(() => {
		setTimeout(() => {
			setPageLoadingMessage(<>
				Log in <Link to="/login">here</Link>.
			</>)			
		}, 2000)
	}, [])

	// Fetch the user's listings.
	useEffect(() => {
		if (user == null) {
			return
		}
		server
			.searchListingsByUser(user.id)
			.then(([ listings, _ ]) => {
				setListings(listings ?? [])
			})
	}, [user])

	// If the user information is pending, we render this.
	if (user == null) {
		return <>
			<Header currentPage="/account" hideProfileMenu />
			<p className="loadingMessage">{pageLoadingMessage}</p>
		</>
	}

	return <>
		<Header currentPage="/account" hideProfileMenu />
		<main className="accountDashboard">
			<section className="profileSummary">
				<ProfileOverview />
			</section>
			<section className="listings">
				{!creatingListing && <Button
					text="Create a New Listing"
					icon={faPlusCircle}
					className="createListingButton"
					onClick={() => setCreatingListing(true)}
				/>}
				{creatingListing
					? <CreateListingForm
					onClose={() => setCreatingListing(false)}
					onNewListing={() => {
						server
							.searchListingsByUser(user.id)
							.then(([ listings, _ ]) => {
								setListings(listings ?? [])
							})
					}}
					/>
					: listings.length == 0
						? <em className="noListingsMessage">No listings.</em>
						: <div className="userListingsContainer">
							{listings.map(listing => 
								<BookCardEditable 
									key={listing.id}
									book={listing.book} 
									onDelete={() => {
										setListings(prev => {
											return [...prev].filter(({ id }) => 
												id  != listing.id
											)
										})
									}}
									listingId={listing.id} 
									available={listing.available}
								/>)}
						</div>
				}				
			</section>
		</main>
	</>
}

export default Account
