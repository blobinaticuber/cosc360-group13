import { useState } from "react"
import Button from "../Button"
import Popup from "../popup/Popup"
import BookSelect from "./BookSelectDialog"
import type { BookDetails } from "../../server"

type BookSelectorProps = {
	onSelect: (book: BookDetails) => void
	text?: string
}

/**
 * This component is a button that, when clicked, allows the user to select a
 * book by searching the Google Books database. When the user selects a book,
 * the callback `onSelect` is invoked.
 * 
 * Note that the underlying button calls `e.preventDefault()` when it's 
 * clicked, so you can safely include this component in a `<form>` without
 * accidentally submitting it.
 */
function BookSelector({ onSelect, text }: BookSelectorProps) {
	const [showBookSelect, setShowBookSelect] = useState(false)

	return <>
		<Button
			text={text ?? "Select a Book"}
			onClick={e => {
				e.preventDefault()
				setShowBookSelect(true)
			}}
		/>
		<Popup
			show={showBookSelect}	
			onClickAway={() => setShowBookSelect(false)}
		>
			<BookSelect 
				onSelect={book => {
					onSelect(book)
					setShowBookSelect(false)
				}}
			/>
		</Popup>
	</>
}

export default BookSelector
