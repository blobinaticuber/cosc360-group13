import { useState } from "react"
import Header from "../components/layout/Header"
import SearchBar from "../components/SearchBar"
import server, { type ListingDetails } from "../server"
import "./Home.css"
import BookCard from "../components/book_search/BookCard"

function Home() {

	const [listings, setListings] = useState<ListingDetails[]>([])

	return <>
		<Header currentPage="/" />
		<main className="homeMain">
			<SearchBar 
				search={async (term) => {
					const [listings, _] = await server.searchListing(term)
					return listings
				}} 
				onResults={listings => {
					setListings([...listings])
				}}
			/>
			<div className="searchResultsContainer">
				{listings.map(listing => <BookCard book={listing.book} />)}
			</div>
		</main>
	</>
}

export default Home
