import "./BookListing.css"

// TODO: have properties so we can update the title, description, image from database?
// TODO: when you click on it, it should take you to a full page with more information

function BookListing() {
    return (
        <div className="card">
            <img className="book-thumbnail" src="../../book_background.jpg"/>
            <h2>Book Title</h2>
            <p>(Description) Lorem ipsum dolar sit amet</p>
        </div>
    )
}

export default BookListing