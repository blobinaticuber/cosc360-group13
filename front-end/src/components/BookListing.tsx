import "./BookListing.css"

// TODO: have properties so we can update the title, description, image from database?
// TODO: when you click on it, it should take you to a full page with more information

type props = {
    title: string;
    description: string
};

function BookListing({title, description}: props) {
    return (
        <div className="card">
            <img className="book-thumbnail" src="../../public/book_background.jpg"/>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default BookListing
