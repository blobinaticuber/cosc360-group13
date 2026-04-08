import { faCalendar, faEyeSlash, faPenNib, faTags } from "@fortawesome/free-solid-svg-icons"
import "./BookCardEditable.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { BookDetails } from "../../server"
import Button from "../Button"
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import server from "../../server"
import { useState } from "react"

type BookCardProps = {
	book: BookDetails
    listingId: string
    available: boolean
	onClick?: () => void
	/**
	 * This will be called whenever the user deletes the listing.
	 */
	onDelete?: () => void
}

function BookCard({
	book,
    listingId,
    available,
	onClick,
	onDelete
}: BookCardProps) {

	/**
	 * This holds a value to indicate when a part of the listing is being
	 * updated. E.g., if we are updating the availability of the listing or
	 * deleting it, we should set this to mark that the request is pending.
	 * Whenever any request is pending, we shouldn't allow other update
	 * operations (race conditions are bad).
	 */
	const [updating, setUpdating] = useState<
		"availability" | "deletion" | null
	>(null)
    const [isAvailable, setAvailability] = useState(available)

	return <div
		className={"bookCard" + (onClick ? " clickable" : "")}
		onClick={onClick}
	>
		<div className="imgContainer">
			<img src={book.image} alt="book cover" />
		</div>
		<div className="textSection">
			<h1>{book.title}</h1>
			<div className="detailsContainer">
				{book.authors && book.authors.length > 0 &&
					<p className="authors">
						<FontAwesomeIcon icon={faPenNib} className="icon" />
						&nbsp;
						{book.authors.join(", ")}
					</p>
				}
				{book.publishDate &&
					<p className="publishDate">
						<FontAwesomeIcon icon={faCalendar} className="icon" />&nbsp;
						{book.publishDate}
					</p>
				}
				{book.categories && book.categories.length > 0 &&
					<p className="categories">
						<FontAwesomeIcon icon={faTags} className="icon" />
						&nbsp;
						{book.categories.join(", ")}
					</p>
				}
			</div>

            <div className="bookCardButtonContainer">
                <Button
                    icon={isAvailable? faEyeSlash : faEye}
					style={isAvailable ? "normal" : "subtle" }
                    text={isAvailable? "Hide listing" : "Make public"}
					spinning={updating == "availability"}
					disable={updating != null}
                    onClick={async () => {
						setUpdating("availability")
						await server.setAvailability(listingId, !isAvailable)
						setUpdating(null)
						setAvailability(!isAvailable)
                    }}
                />
                <Button
                    icon={faTrash}
                    className="deleteListing"
                    text={"Delete Listing"}
                    style={"important"}
					disable={updating != null}
					spinning={updating == "deletion"}
                    onClick={async () => {
						if (!confirm(
							"Are you sure you want to delete this listing?"
						)) {
							return
						}
						setUpdating("deletion")
						await server.deleteListing(listingId)
						setUpdating(null)
						if (onDelete) {
							onDelete()
						}
                    }}
                />
            </div>
		</div>
    </div>
}

export default BookCard
