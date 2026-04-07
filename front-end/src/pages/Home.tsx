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
		<main className="home">
			<section className="search">
				<SearchBar
					search={()}
				/>
			</section>
		</main>
	</>
}

export default Home
