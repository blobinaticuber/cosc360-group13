import "./UserAnalytics.css"
import { useEffect, useState } from "react"
import server from "../../server"
import type { UserAnalytics, UserDetails } from "../../server/ServerTypes"
import SearchBar from "../SearchBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function UserAnalytics() {
	const [ analytics, setAnalytics ] = useState<null | UserAnalytics>(null)

	useEffect(() => {
		server.admin
			.userAnalytics()
			.then(([ data, _ ]) => {
				setAnalytics(data)
			})
	}, [])

	const [ userResults, setUserResults ] = useState<UserDetails[]>([])

	if (analytics === null) {
		return <p className="noUserAnalytics">No user analytics available.</p>
	}

	return <>
		<h1 className="userAnalyticsHeading">Overview</h1>
		<table className="userAnalyticsTable">
			<tbody>
				<tr>
					<td>Total Users</td>
					<td>{analytics.totalUsers}</td>
				</tr>
				<tr>
					<td>Monthly Active Users</td>
					<td>{analytics.activeSessions}</td>
				</tr>
			</tbody>
		</table>
		<h1 className="userAnalyticsSubheading">User Search</h1>
		<SearchBar
			lightText
			placeholder="Enter a user's ID or name"
			search={async (term) => {
				// Try ID first.
				const [idResult, _] = await server.getUserById(term)
				if (idResult != null) {
					return [ idResult ]
				}
				// Then try searching by name.
				const [nameResult, __] = await server.searchUser(term) 
				return nameResult ?? []
			}}
			onResults={setUserResults}
		/>
		<div className="userResultsContainer">
			{userResults.map(user => <UserCard {...user} />)}
		</div>
	</>
}

function UserCard({
	id, name, email, profilePicture 
}: UserDetails) {
	return <div className="userCardContainer">
		<img 
			className="userThumbnail"
			src={profilePicture} 
			alt="profile picture" 
		/>
		<div
			className="userDetails"
		>
			<h1 className="userName">{name}</h1>
			<p className="userId">User #{id}</p>
			<p className="userEmail">
				<FontAwesomeIcon icon={faEnvelope} /> {email}
			</p>
		</div>
	</div>
}

