import { pageTitle, type PagePath } from "../App"
import type { User } from "../types"
import "./Header.css"
import Nav from "./Nav"
import ProfileDropDown from "./ProfileDropDown"

type HeaderProps = {
	currentPage: PagePath

	/**
	 * The currently logged-in user. If one is not provided, then it is assumed
	 * that the user is a guest.
	 */
	user?: User

	/**
	 * For some pages (like the login and registration pages), including the
	 * user profile in the header wouldn't make sense. Setting this property
	 * will hide it.
	 */
	hideProfileMenu?: boolean

	/**
	 * Set this to omit the page title from the header.
	 */
	hidePageTitle?: boolean
}

function Header({ 
	currentPage, user, hideProfileMenu, hidePageTitle 
}: HeaderProps) {
	return (
		<>
			<Nav
				currentPage={currentPage}
			/>
			<header id="header">
				<div className="headerInner">
					<h1>{hidePageTitle ?
						<>&nbsp;</>
						:
						pageTitle[currentPage]
					}</h1>
					{!hideProfileMenu && <ProfileDropDown user={user} />}
				</div>
			</header>
		</>
	)
}

export default Header
