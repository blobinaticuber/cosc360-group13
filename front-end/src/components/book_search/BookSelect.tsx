import "./BookSelect.css"
import BookSearchBar from "./BookSearchBar"
import BookCard from "./BookCard"
import type { BookDetailData } from "../../server/ServerTypes"
import { useState } from "react"
import type { BookDetails } from "../../server"

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
		<BookSearchBar
			onResults={books => {
				setBooks(books ? [...books] : [])
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
