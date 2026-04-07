import { faCalendar, faPenNib, faTags } from "@fortawesome/free-solid-svg-icons"
import "./BookCardEditable.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { BookDetails } from "../../server"
import Button from "../Button"
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import server from "../../server"

type BookCardProps = {
	book: BookDetails
    listingId: string
    update: () => void
	onClick?: () => void
}

function BookCard({
	book,
    listingId,
	onClick,
    update
}: BookCardProps) {
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
                    icon={faEye}
                    className="normal"
                    text={"Toggle Visibility"}
                    onClick={() => {
                        server.setAvailability(listingId, true)

                    }}
                />
                <Button
                    icon={faTrash}
                    className="deleteAccount"
                    text={"Delete Listing"}
                    style={"important"}
                    onClick={
                        async () => {
                            if (confirm("Are you sure you want to delete this listing?")) {
                                await server.deleteListing(listingId)
                                // updates the parent component (should be account page)
                                update()
                            }

                    }}
                />
            </div>



		</div>



    </div>
}

export default BookCard
