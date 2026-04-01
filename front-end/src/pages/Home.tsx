import BookListing from "../components/BookListing"
import Header from "../components/Header"
import guestUser from "../util/guestUser"
import "./Home.css"

import { useState, useEffect } from "react"

function Home() {

	type Listing = {
		id: string,
		title: string,
		description: string,
		user: string,
		image: string
	}

	function onQueryChange(a: string) {
		setQuery(a)
	}

	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
	const [books, setBooks] = useState<Listing[]>([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const searchTerm = query.trim() || "*";
		fetch(`${baseUrl}/search/listing/${searchTerm}`)
		.then(res => res.json())
		.then(data => setBooks(data as Listing[]))
		.catch(error => {
			console.error("Error fetching books:", error);
			setBooks([]);
		});

		console.log(books);
	}, [query, baseUrl])

	// const filteredBooks = books.filter(book =>
	// 	book.title.toLowerCase().includes(query.trim().toLowerCase()) ||
	// 	book.description.toLowerCase().includes(query.trim().toLowerCase())
	// );

	return (<>
		<Header currentPage="/" user={guestUser()} />
		<p>Book listings</p>

		<form onSubmit={e => e.preventDefault()}>
            <input
            placeholder="Search for title or description"
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            />
        </form>

		<div className="book-listings-container">
			{books.map(book => (
				<BookListing title={book.title} description={book.description}/>))
				// <p>There weren't any results matching your search.</p>
			}
		</div>

	</>)
}

export default Home
