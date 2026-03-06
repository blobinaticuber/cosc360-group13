import { Link } from "react-router-dom"
import "./Nav.css"
import { pageTitle, type PagePath } from "../App"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons"

type NavProps = {
	currentPage: PagePath
}

function Nav({ currentPage }: NavProps) {
	return (
		<nav className="navComponent">
			<div className="navInner">
				<NavLink 
					to="/" 
					currentPage={currentPage}
					icon={faHouse}
				/>
				<NavLink 
					to="/account" 
					currentPage={currentPage}
					icon={faUser}
				/>
				<NavLink 
					to="/register" 
					currentPage={currentPage}
					icon={faUser}
				/>
			</div>
		</nav>
	)
}

type NavLinkProps = {
	to: PagePath
	currentPage: PagePath
	icon?: IconDefinition
	label?: string
}

function NavLink({ to, currentPage, label, icon }: NavLinkProps) {
	label ??= pageTitle[to]

	return <Link
		to={to}
		className={"navLink" + (currentPage == to ? " activeNavLink" : "")}
	>
		{icon && <><FontAwesomeIcon icon={icon} />&nbsp;</>}
		{label}
	</Link>
}

export default Nav
