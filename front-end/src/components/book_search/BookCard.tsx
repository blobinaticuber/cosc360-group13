import { faCalendar, faPenNib, faTags } from "@fortawesome/free-solid-svg-icons"
import "./BookCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { BookDetails } from "../../server"

type BookCardProps = {
	book: BookDetails
	onClick?: () => void
}

function BookCard({
	book,
	onClick
}: BookCardProps) {
	return <div 
		className={"bookCard"} 
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
		</div>
	</div>
}

export default BookCard
