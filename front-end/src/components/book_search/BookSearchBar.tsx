import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import server from "../../server"
import type { BookDetailData } from "../../server/ServerTypes"
import "./BookSearchBar.css"

export type BookSearchBarProps = {
	onResults?: (books: BookDetailData | null) => void
}

function BookSearchBar({
	onResults
}: BookSearchBarProps) {

	const [focused, setFocused] = useState(false)
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)

	async function keyDownHandler(e: KeyboardEvent) {
		if (e.key != "Enter") {
			return
		}

		setLoading(true)
		const results = await server.searchBooks(inputRef.current?.value!)
		setLoading(false)

		if (onResults) {
			onResults(results)
		}
	}

	useEffect(() => {
		if (!inputRef.current) {
			return
		}

		inputRef.current.addEventListener("focusin", () => {
			setFocused(true)
			document.addEventListener("keydown", keyDownHandler)
		})

		inputRef.current.addEventListener("focusout", () => {
			setFocused(false)
			document.removeEventListener("keydown", keyDownHandler)
		})

	}, [])

	return <div className={"bookSearch" + (focused ? " focused" : "")}>
		{loading
			? <FontAwesomeIcon
				key="spinner"
				icon={faSpinner}
				className="searchIcon spinning" />
			: <FontAwesomeIcon
				key="search"
				icon={faSearch}
				className="searchIcon" />
		}
		<input
			type="text"
			className="bookSearchInput"
			ref={inputRef}
			placeholder="Enter the title of a book"
			disabled={loading}
		/>
	</div>
}

export default BookSearchBar
