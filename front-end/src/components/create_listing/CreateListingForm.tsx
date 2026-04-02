import { useState } from "react"
import type { BookDetails } from "../../server"
import "./CreateListingForm.css"
import BookSelector from "../book_search/BookSelector"
import Button from "../Button"
import BookCard from "../book_search/BookCard"
import { toast } from "react-toastify"
import server from "../../server"

type CreateListingFormProps = {
	onClose?: () => void
}

/**
 * This is a sim
 * 
 * @param param0 
 * @returns 
 */
function CreateListingForm({
	onClose
}: CreateListingFormProps) {

	const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null)
	const [loading, setLoading] = useState(false)

	return <div className="createListingForm">
		<h1>List a Book</h1>
		<p>
			Create a listing to show that you have a book you're willing to lend out.
		</p>
		<BookCard 
			book={selectedBook ?? {
				id: "",
				authors: ["Author Name"],
				categories: ["Category 1", "Category 2"],
				image: "/placeholder.png",
				title: "Some Book title",
				publishDate: "YYYY",
				description: "Some description."
			}} 
		/>
		<BookSelector 
			onSelect={setSelectedBook} 
			text={selectedBook ? "Select a Different Book" : "Select a Book"}	
		/>
		<div className="buttonsContainer">
			<Button 
				text="Cancel" 
				style="subtle" 
				onClick={onClose}	
			/>
			<Button 
				text="Post Listing" 
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