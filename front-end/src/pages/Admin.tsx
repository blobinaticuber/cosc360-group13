import { useState, type JSX } from "react"
import "./Admin.css"
import Reports from "../components/admin/Reports"
import ListingAnalytics from "../components/admin/ListingAnalytics"

type Panel = 
	  "reports"
	| "user analytics"
	| "listing analytics"
	| "my account"

const panelDisplay = new Map<Panel | null, JSX.Element>()
panelDisplay.set(null, <></>)
panelDisplay.set("reports", <Reports />)
panelDisplay.set("listing analytics", <ListingAnalytics />)

const panelTitle = new Map<Panel | null, string>()
panelTitle.set(null, "")
panelTitle.set("reports", "User Reports")
panelTitle.set("listing analytics", "Listing Analytics")

function Admin() {
	const [ activePanel, setActivePanel ] = useState<Panel | null>(null)

	return <>
		<div className="adminLayout">

			<aside className="adminSidebar">
				<div className="adminTitle">Booklend | Admin</div>
				<nav className="adminNav">
					<button
						onClick={() => setActivePanel("reports")} 
						className={"navButton" + 
							(activePanel === "reports"
								? " activeNav" : "")}					>
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