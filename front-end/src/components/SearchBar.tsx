import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./SearchBar.css"
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"

export type SearchBarProps<T extends any> = {
	search: (searchTerm: string) => T[] | Promise<T[]>
	onResults?: (results: T[]) => void
}

function SearchBar<T>({
	search, onResults
}: SearchBarProps<T>) {

	const [focused, setFocused] = useState(false)
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)

	async function keyDownHandler(e: KeyboardEvent) {
		if (e.key != "Enter") {
			return
		}

		const searchResponse = search(inputRef.current?.value!)
		let results: T[]
		if (searchResponse instanceof Promise) {
			setLoading(true)
			results = await searchResponse
			setLoading(false)			
		} else {
			results = searchResponse
		}

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

	return <div className={"search" + (focused ? " focused" : "")}>
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
			ref={inputRef}
			placeholder="Enter the title of a book"
			disabled={loading}
		/>
	</div>
}

export default SearchBar
