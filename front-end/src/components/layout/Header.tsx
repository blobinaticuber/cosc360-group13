import { pageTitle, type PagePath } from "../../App"
import "./Header.css"
import Nav from "./Nav"
import ProfileDropDown from "./ProfileDropDown"
import { UserContext } from "../../App"
import { useContext } from "react"

type HeaderProps = {
	currentPage: PagePath

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
	currentPage, hideProfileMenu, hidePageTitle 
}: HeaderProps) {

	const [ user, _ ] = useContext(UserContext)

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
