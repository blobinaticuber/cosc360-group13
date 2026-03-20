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
	const [query, setQuery] = useState("");

	// gets the JSON book listings from back-end
	useEffect(() => {
		fetch("http://localhost:3000/public/listings.json")
		.then(res => res.json())
		.then(data => setBooks(data.listings as Listing[]));
	}, [])

	const filteredBooks = books.filter(book =>
		book.title.toLowerCase().includes(query.trim().toLowerCase()) ||
		book.description.toLowerCase().includes(query.trim().toLowerCase())
	);

	return (<>
		<Header currentPage="/" user={guestUser()} />
		<ListingSearch query={query} onQueryChange={setQuery}/>
		<div className="book-listings-container">
			{filteredBooks.map(book => (
				<BookListing title={book.title} description={book.description}/>
			))}
		</div>

	</>)
}

export default Home
