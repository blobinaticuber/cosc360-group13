import { Link } from "react-router-dom"
import "./Nav.css"
import { pageTitle, type PagePath } from "../../App"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faHouse, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import useAdmin from "../../hooks/useAdmin"
import useUser from "../../hooks/useUser"

type NavProps = {
	currentPage: PagePath
}

function Nav({ currentPage }: NavProps) {
	const [user, _] = useUser()
	const [admin, __] = useAdmin()

	return (
		<nav className="navComponent">
			<div className="navInner">
				<NavLink 
					to="/" 
					currentPage={currentPage}
					icon={faHouse}
				/>
				{user 
					? <NavLink 
						to="/account"
						currentPage={currentPage}
						icon={faUser}
					/>
					: <NavLink
						to="/register"
						currentPage={currentPage}
						icon={faUserPlus}
					/>
				}
				{admin && <NavLink
					to="/admin"
					currentPage={currentPage}
					newPage={true}
					icon={faGear}
				/>}
			</div>
		</nav>
	)
}

type NavLinkProps = {
	to: PagePath
	currentPage: PagePath
	icon?: IconDefinition
	label?: string
	newPage?: boolean
}

function NavLink({ to, currentPage, label, icon, newPage }: NavLinkProps) {
	label ??= pageTitle[to]

	return <Link
		to={to}
		className={"navLink" + (currentPage == to ? " activeNavLink" : "")}
		target={newPage ? "_blank" : undefined}
	>
		{icon && <><FontAwesomeIcon icon={icon} /></>}
		<p className="navLinkText">{label}</p>
	</Link>
}

export default Nav
