import { type PagePath } from "../../App"
import "./Header.css"
import Nav from "./Nav"
import ProfileDropDown from "./ProfileDropDown"
import useUser from "../../hooks/useUser"

type HeaderProps = {
	currentPage: PagePath

	/**
	 * For some pages (like the login and registration pages), including the
	 * user profile in the header wouldn't make sense. Setting this property
	 * will hide it.
	 */
	hideProfileMenu?: boolean
}

function Header({ 
	currentPage, hideProfileMenu 
}: HeaderProps) {
	
	const [ user, _ ] = useUser()

	return (
		<>
			
			<header id="header">
				
				<div className="headerInner">
					<h1>{
					// hidePageTitle ?
						// <>&nbsp;</>
						// :
						<>Booklend</>
						// pageTitle[currentPage]
					}</h1>
					{!hideProfileMenu && <ProfileDropDown user={user} />}
				</div>
				<Nav currentPage={currentPage}/>
			</header>
		</>
	)
}

export default Header
