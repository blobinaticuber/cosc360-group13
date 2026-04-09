import "./ListedBookCard.css"
import type { ListedBook, UserDetails } from "../server"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenNib, faCalendar, faTags, faCheck, faX } from "@fortawesome/free-solid-svg-icons"
import UserContactPopup from "./UserContactPopup"

export type ListedBookProps = ListedBook & {
	expanded?: boolean
	onClick?: () => void
	onCollapse?: () => void
}

function ListedBookCard({ book, listings, expanded, onClick, onCollapse }: ListedBookProps) {
	const [userPopup, setUserPopup] = useState<UserDetails | null>(null)

	const userSet = new Set()
	const availableListings = listings.filter(listing => {
		if (!listing.available) return false
		if (userSet.has(listing.user.id)) return false
		userSet.add(listing.user.id)
		return true
	})

	return <div 
		className={"listed" + (expanded ? " expanded" : "")}
		onClick={onClick}
	>
		{expanded && <p 
			className="closeButton"
			onClick={e => {
				onCollapse && onCollapse()
				e.stopPropagation()
			}}
		>
			<FontAwesomeIcon icon={faX} />
		</p>}
		<div className="thumbnail">
			<img src={book.image} alt="book cover" />
		</div>
		<div className="text">
			<h1>{book.title}</h1>
			<div className="summary">
				{book.authors && book.authors.length > 0 &&
					<p className="authors">
						<FontAwesomeIcon icon={faPenNib} className="icon" />
						&nbsp;
						{book.authors.join(", ")}
					</p>				
				}
				{book.publishDate &&
					<p className="publishDate">
						<FontAwesomeIcon icon={faCalendar} className="icon" />
						&nbsp;
						{book.publishDate}
					</p>				
				}
				{book.categories && book.categories.length > 0 &&
					<p className="categories">
						<FontAwesomeIcon icon={faTags} className="icon" />
						&nbsp;
						{book.categories.slice(0, 3).join(", ")}
					</p>
				}
				<p className="listingsSummary">
					{availableListings.length >= 8 
						? "8+" 
						: availableListings.length}
					&nbsp; 
					Available
					&nbsp;
					{availableListings.length > 0 
						&& <FontAwesomeIcon icon={faCheck} />}
				</p>
			</div>
			{expanded && <>
				{/* We can trust the HTML here because it comes from the Google
					Books API and they've already sanitized it. There is no way
					for any user to modify the description of a listing. */}
				<p className="description"
					dangerouslySetInnerHTML={{ __html: book.description}}
				></p>
			</>}
		</div>
		{expanded && availableListings.length > 0 && <div className="listings">
			<h1>Users with this Book Listed</h1>
			{availableListings.map(listing => 
				<div 
					className="userCard" 
					key={listing.id}
					onClick={e => {
						e.stopPropagation()
						setUserPopup(listing.user)
					}}
				>
					<img src={listing.user.profilePicture} alt="profile picture" />
					<h1>{listing.user.name}</h1>			
				</div>
			)}
		</div>}
		{userPopup && <UserContactPopup 
			show={true} 
			user={userPopup} 
			book={book} 
			onClickAway={() => setUserPopup(null)}
		/>}
	</div>
}

export default ListedBookCard
