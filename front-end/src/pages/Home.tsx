import BookListing from "../components/BookListing"
import Header from "../components/Header"
import guestUser from "../util/guestUser"
import "./Home.css"
import { ListingSearch } from "../components/ListingSearch"

function Home() {
	return (<>
		<Header currentPage="/" user={guestUser()} />
		<ListingSearch/>
		<div className="book-listings-container">
			<BookListing/>
			<BookListing/>
		</div>

	</>)
}

export default Home
