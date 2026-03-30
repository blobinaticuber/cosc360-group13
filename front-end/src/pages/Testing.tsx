import BookSearch from "../components/book_search/BookSearchBar"
import Header from "../components/Header"
import guestUser from "../util/guestUser"

function Testing() {
	return <>
		<Header currentPage="/test" user={guestUser()} />
		<p>This page is for testing out components.</p>
		<BookSearch />
	</>
}

export default Testing
