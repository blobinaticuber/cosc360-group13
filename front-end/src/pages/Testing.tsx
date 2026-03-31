import Header from "../components/layout/Header"
import guestUser from "../util/guestUser"
import "./Testing.css"
import BookSelector from "../components/book_search/BookSelector"

function Testing() {
	return <>
		<Header currentPage="/test" user={guestUser()} />
		<BookSelector onSelect={console.log} />
	</>
}

export default Testing
