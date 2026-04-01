import "./BookSelectDialog.css"
import BookCard from "./BookCard"
import type { BookDetailData } from "../../server/ServerTypes"
import { useState } from "react"
import type { BookDetails } from "../../server"
import SearchBar from "../SearchBar"
import server from "../../server"

type BookSelectProps = {
	onSelect: (book: BookDetails) => void
}

function BookSelect({
	onSelect
}: BookSelectProps) {
	
	const [ books, setBooks ] = useState<BookDetailData>([])
	const [ searched, setSearched ] = useState(false)

	return <div
		className="bookSelectContainer"
	>
		<SearchBar
			search={async (title) => {
				const [books, _] = await server.searchBooks(title)
				return books ?? []
			}}
			onResults={books => {
				setBooks(books)
				setSearched(true)
			}}
		/>
		{searched &&
			<div className="resultsContainer">
				{books.map(book => 
					<BookCard 
						key={book.id} 
						book={book} 
						onClick={() => onSelect(book)}
					/>)
				}
				{books.length == 0 && 
				<p className="message">
					<em>No matching books found.</em>
				</p>}
			</div>
		}

	</div>
}

export default BookSelect
