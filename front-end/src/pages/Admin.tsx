import { useEffect, useState, type JSX } from "react"
import "./Admin.css"
import Reports from "../components/admin/Reports"
import ListingAnalytics from "../components/admin/ListingAnalytics"
import UserAnalytics from "../components/admin/UserAnalytics"
import type { PersonalDetails } from "../server"
import server from "../server"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

type Panel = 
	  "reports"
	| "user analytics"
	| "listing analytics"
	| "my account"

const panelDisplay = new Map<Panel | null, JSX.Element>()
panelDisplay.set(null, <></>)
panelDisplay.set("reports", <Reports />)
panelDisplay.set("listing analytics", <ListingAnalytics />)
panelDisplay.set("user analytics", <UserAnalytics />)

const panelTitle = new Map<Panel | null, string>()
panelTitle.set(null, "Dashboard")
panelTitle.set("reports", "User Reports")
panelTitle.set("listing analytics", "Listing Analytics")
panelTitle.set("user analytics", "User Analytics")

function Admin() {
	const navigate = useNavigate()

	// The current admin user. `undefined` means that we're waiting for
	// authentication from the server; `null` means that we're not
	// authenticated.
	const [ admin, setAdmin ] = 
		useState<undefined | null | PersonalDetails>(undefined)

	const [ activePanel, setActivePanel ] = useState<Panel | null>(null)


	useEffect(() => {
		server.admin.currentUser()
			.then(([ data, _ ]) => {
				setAdmin(data)
			})
	}, [])

	if (admin === null) {
		navigate("/admin/login")
	}

	if (admin === undefined) {
		return <div className="loadingScreen">
			<p><FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...</p>
		</div>
	}

	return <>
		<div className="adminLayout">

			<aside className="adminSidebar">
				<div className="adminTitle">Booklend | Admin</div>
				<nav className="adminNav">
					<button
						onClick={() => setActivePanel("reports")} 
						className={"navButton" + 
							(activePanel === "reports"
								? " activeNav" : "")}
					>
						Reports
					</button>
					<button 
						onClick={() => setActivePanel("user analytics")}
						className={"navButton" + 
							(activePanel === "user analytics"
								? " activeNav" : "")}					>
						User Analytics
					</button>
					<button 
						onClick={() => setActivePanel("listing analytics")}
						className={"navButton" + 
							(activePanel === "listing analytics"
								? " activeNav" : "")}
					>
						Listing Analytics
					</button>
				</nav>
			</aside>

			<div className="adminMain">
				<header className="adminHeader">
					<h1>{panelTitle.get(activePanel)}</h1>
				</header>

				<main className="adminContent">
					{panelDisplay.get(activePanel)}
				</main>
			</div>
		</div>	
	</>
};

export default Admin;