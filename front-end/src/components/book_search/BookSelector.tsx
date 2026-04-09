import { useState } from "react"
import Button from "../Button"
import Popup from "../popup/Popup"
import BookSelect from "./BookSelectDialog"
import type { BookDetails } from "../../server"

type BookSelectorProps = {
	/**
	 * This callback will be invoked when the user selects a book.
	 * 
	 * @param book The book that was selected.
	 */
	onSelect: (book: BookDetails) => void

	/**
	 * You can set this property to define the text in the button. By default,
	 * it's "Select a Book"
	 */
	text?: string

	/**
	 * If you need to change the default styles of the button, you can pass
	 * a CSS class name. This will be passed down to the underlying `<button>`
	 * component.
	 */
	buttonClass?: string

	/**
	 * Invoked whenever the popup is opened.
	 */
	onOpen?: () => void

	/**
	 * Invoked whenever the popup is closed.
	 */
	onClose?: () => void
}

/**
 * This component is a button that, when clicked, allows the user to select a
 * book by searching the Google Books database. When the user selects a book,
 * the callback `onSelect` is invoked.
 * 
 * The `buttonClass` can be set to a CSS class name and it will be passed to
 * the underlying `<button>` element, allowing you to customize the styles.
 * 
 * Note that the underlying button calls `e.preventDefault()` when it's 
 * clicked, so you can safely include this component in a `<form>` without
 * accidentally submitting it.
 */
function BookSelector({ 
	onSelect, text, buttonClass, onOpen, onClose
}: BookSelectorProps) {
	const [showBookSelect, setShowBookSelect] = useState(false)

	return <>
		<Button
			className={buttonClass}
			text={text ?? "Select a Book"}
			onClick={e => {
				e.preventDefault()
				setShowBookSelect(true)
				if (onOpen) {
					onOpen()
				}
			}}
		/>
		<Popup
			show={showBookSelect}	
			onClickAway={() => {
				setShowBookSelect(false)
				if (onClose) {
					onClose()
				}
			}}
		>
			<BookSelect 
				onSelect={book => {
					onSelect(book)
					setShowBookSelect(false)
					if (onClose) {
						onClose()
					}
				}}
			/>
		</Popup>
	</>
}

export default BookSelector
