import { useState } from "react"
import BookSelect from "../components/book_search/BookSelect"
import Button from "../components/Button"
import Header from "../components/layout/Header"
import Modal from "../components/popup/Modal"
import type { BookDetails } from "../server"
import guestUser from "../util/guestUser"
import "./Testing.css"
import Popup from "../components/popup/Popup"

function Testing() {

	const [showBookSelect, setShowBookSelect] = useState(false)
	const [selectedBook, setSelectedBook] = useState<null | BookDetails>(null)

	return <>
		<Header currentPage="/test" user={guestUser()} />
		<Button
			text="Select a Book"
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
				setShowBookSelect(true)
			}}
		/>
		<Popup
			show={showBookSelect}	
			onClickAway={() => setShowBookSelect(false)}
		>
			<BookSelect 
				onSelect={book => {
					setSelectedBook(book)
					setShowBookSelect(false)
				}}
			/>
		</Popup>
	</>
}

export default Testing
