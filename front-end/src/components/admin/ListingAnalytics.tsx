import "./ListingAnalytics.css"
import { useState, useEffect } from "react"
import server from "../../server"
import type { ListingsAnalytics, UserDetails } from "../../server/ServerTypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

function ListingAnalytics() {
	const [analytics, setAnalytics] = useState<ListingsAnalytics | null>(null)
	const [totalUsers, setTotalUsers] = useState(1)
	
	useEffect(() => {
		server.admin
			.listingsAnalytics()
			.then(([ data, err ]) => {
				if (err != null) {
					return
				}
				setAnalytics({ ...data })
			})
		server.admin
			.userAnalytics()
			.then(([ data, err ]) => {
				if (err != null) {
					return
				}
				setTotalUsers(data.totalUsers)
			})
	}, [])

	if (analytics == null) {
		return <em>Loading...</em>
	}

	if (analytics.totalListings == 0) {
		return <p className="noListingsMessage">No listings yet.</p>
	}

	const totalListings = analytics.totalListings
	const unavailableListings = analytics.listingsMarkedUnavailable
	const availableListings = totalListings - unavailableListings
	const unavailableListingsPercent =
		Math.round(100 * unavailableListings / totalListings)
	const availableListingsPercent =
		Math.round(100 * availableListings / totalListings)

	return <>
		<h1 className="listingHeading">Overview</h1>
		<table className="listingAnalyticsTable">
			<tbody>
				<tr>
					<td>Total Listings</td>
					<td>{totalListings}</td>
				</tr>
				<tr>
					<td>Available Listings</td>
					<td>
						{availableListings} ({availableListingsPercent}%)
					</td>
				</tr>
				<tr>
					<td>Unavailable Listings</td>
					<td>
						{unavailableListings} ({unavailableListingsPercent}%)
					</td>
				</tr>
				<tr>
					<td>Average Number of Listings per User</td>
					<td>
						{(analytics.totalListings / totalUsers).toFixed(2)}
					</td>
				</tr>
			</tbody>
		</table>
		<h2 className="listingSubheading">Users with the Most Listings</h2>
		{analytics.usersWithTheMostListings.map(details =>
			<UserCard 
				key={details.user.id}
				{...details}
			/>
		)}
	</>
}

type UserCardProps = {
	user: UserDetails
	listingCount: number
	availableListingCount: number
}

function UserCard({
	user, listingCount, availableListingCount 
}: UserCardProps) {
	return <div className="userCardContainer">
		<img 
			className="userThumbnail"
			src={user.profilePicture} 
			alt="profile picture" 
		/>
		<div
			className="userDetails"
		>
			<h1 className="userName">{user.name}</h1>
			<p className="userId">User #{user.id}</p>
			<p className="userEmail">
				<FontAwesomeIcon icon={faEnvelope} /> {user.email}
			</p>
		</div>
		<div className="listingDetails">
			<p>Total listings: {listingCount}</p>
			<p>Available listings: {availableListingCount}</p>
		</div>
	</div>
}

export default ListingAnalytics
