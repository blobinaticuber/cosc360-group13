import Header from "../components/Header"
import guestUser from "../util/guestUser"
import "./Home.css"

function Home() {
	return (<>
		<Header currentPage="/" user={guestUser()} />
		<p>This will be the user's home page. This page should be functional even if the user isn't logged in.</p>
	</>)
}

export default Home
