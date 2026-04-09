import { useEffect, useState } from "react"
import Header from "../components/layout/Header"
import SearchBar from "../components/SearchBar"
import server, { type ListedBook } from "../server"
import "./Home.css"
import ListedBookCard from "../components/ListedBookCard"
import type { BrowseListData } from "../server/ServerTypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faTags } from "@fortawesome/free-solid-svg-icons"

function Home() {

	const [categories, setCategories] = useState<BrowseListData | null>(null)
	const [activeCategory, setActiveCategory] = useState<string | null>(null)

	useEffect(() => {
		server.topCategories()
			.then(([data, _]) => {
				if (data) {
					setCategories(data)
				} else {
					setCategories(null)
				}
			})
	}, [])

	const [listedBooks, setListedBooks] = useState<ListedBook[]>([])
	const [activeBook, setActiveBook] = useState<string | null>(null)

	return <>
		<Header currentPage="/" />
		<main className="home">
			<aside className="categories">
				<h1>
					<FontAwesomeIcon icon={faTags} />
					&nbsp;
					Popular Categories
				</h1>
				{/* I know how this looks. I'll refactor it later, surely. */}
				{categories === null 
					? <FontAwesomeIcon spin={true} icon={faSpinner} className="noListingsMessage" />
					: categories.length == 0 
						? <p className="noListingsMessage"><em>No listings yet.</em></p>
						: categories.sort().map(category => 
							<p
								key={category.category}
								className={"categoryLabel" + 
									(activeCategory == category.category 
										? " active" : "")
									}
								onClick={() => {
									setActiveBook(null)
									setActiveCategory(prev => {
										if (prev == category.category) {
											setListedBooks([])
											return null
										} else {
											return category.category
										}
									})
									setListedBooks(category.topBooks.map(book => {
										return {
											book: {
												...book, 
												categories: [category.category]
											},
											listings: [...book.listings]
										}
									}))
								}}
							>
								{category.category}
							</p>
						)
				}
			</aside>
			<div className="searchBarSection">
				<SearchBar
					search={async (term) => {
						setActiveCategory(null)
						setActiveBook(null)
						const [books, _] = await server.searchListedBooks(term)
						return books ?? []
					}}
					onResults={setListedBooks}
				/>
			</div>
			<section className="results">
				{listedBooks.length == 0
					? <p className="noResultsMessage"><em>No results</em></p>
					: listedBooks.map(listedBook => 
						<ListedBookCard 
							key={listedBook.book.id}
							{...listedBook}
							expanded={activeBook == listedBook.book.id}
							onClick={() => {
								setActiveBook(listedBook.book.id)
							}}	
							onCollapse={() => setActiveBook(null)}
						/>)
				}
			</section>
		</main>
	</>
}

export default Home
