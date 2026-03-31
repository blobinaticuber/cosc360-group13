import Header from "../components/Header"
import guestUser from "../util/guestUser"
import BookSelect from "../components/book_search/BookSelect"
import Button from "../components/Button"
import { useState } from "react"
import Modal from "../components/Modal"
import "./Testing.css"

function Testing() {

	const [ showBookSelect, setShowBookSelect ] = useState(false)

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
		{showBookSelect && <>
			<div className="popupContainer">
				<Modal
					onClickAway={() => setShowBookSelect(prev => !prev)}
					show={showBookSelect}
				>
					<BookSelect 
						onSelect={book => {
							console.log(book)
							setShowBookSelect(false)
						}} 
					/>
				</Modal>
			</div>
		</>}
	</>
}

export default Testing
