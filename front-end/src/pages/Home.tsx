import BookListing from "../components/BookListing"
import Header from "../components/Header"
import guestUser from "../util/guestUser"
import "./Home.css"
import { ListingSearch } from "../components/ListingSearch"
import { useEffect, useState } from "react"

function Home() {

	type Listing = {
		title: string,
		description: string,
		userId: string,
		image: string
	}

	const [books, setBooks] = useState<Listing[]>([]);


	useEffect(() => {
		fetch("http://localhost:3000/public/listings.json")
		.then(res => res.json())
		.then(data => setBooks(data.listings as Listing[]));
	}, [])



	console.log(books);

	return (<>
		<Header currentPage="/" user={guestUser()} />
		<ListingSearch/>
		<div className="book-listings-container">
			{/* <BookListing/> */}
			{/* <BookListing/> */}
			{books.map(book => (
				<BookListing title={book.title} description={book.description}/>
			))}
		</div>

	</>)
}

export default Home
