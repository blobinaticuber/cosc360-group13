import { useState } from "react"
import type { BookDetails } from "../../server"
import "./CreateListingForm.css"
import BookSelector from "../book_search/BookSelector"
import Button from "../Button"
import BookCard from "../book_search/BookCard"
import { toast } from "react-toastify"
import server from "../../server"
import placeholderImage from "../../assets/placeholder.png"
import { faAdd, faCancel } from "@fortawesome/free-solid-svg-icons"

type CreateListingFormProps = {
	onClose?: () => void
	/**
	 * Invoked whenever the popup selector is opened.
	 */
	onSelectorOpen?: () => void
	/**
	 * Invoked whenever the popup selector is closed.
	 */
	onSelectorClose?: () => void
}

/**
 * This is a sim
 * 
 * @param param0 
 * @returns 
 */
function CreateListingForm({
	onClose, onSelectorOpen, onSelectorClose
}: CreateListingFormProps) {

	const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null)
	const [loading, setLoading] = useState(false)

	return <div className="createListingForm">
		<h1>New Listing</h1>
		<p>
			Create a listing to show that you have a book you're willing to lend out.
		</p>
		<BookCard 
			book={selectedBook ?? {
				id: "",
				authors: ["Author Name"],
				categories: ["Category 1", "Category 2"],
				image: placeholderImage,
				title: "Some Book title",
				publishDate: "YYYY",
				description: "Some description."
			}} 
		/>
		<BookSelector 
			buttonClass="bookSelectButton"
			onSelect={setSelectedBook} 
			text={selectedBook ? "Select a Different Book" : "Select a Book"}
			onOpen={onSelectorOpen}
			onClose={onSelectorClose}	
		/>
		<div className="buttonsContainer">
			<Button 
				icon={faCancel}
				text="Cancel" 
				style="subtle" 
				onClick={onClose}
			/>
			<Button 
				text="Post Listing" 
				icon={faAdd}
				spinning={loading}
				onClick={async () => {
					if (!selectedBook) {
						toast.error("Select a book first", { autoClose: 1000 })
						return
					}

					setLoading(true)
					const err = await server.createListing(selectedBook.id)
					setLoading(false)

					switch (err) {
					case null:
						toast.success("Listing posted")
						if (onClose) {
							onClose()
						}
						setSelectedBook(null)
						return
					case "unrecognized user":
						toast.error("You must be logged in to create a listing")
						return
					default:
						toast.error("An unknown error occurred")
						return
					}
				}}
			/>
		</div>
	</div>
}

export default CreateListingForm