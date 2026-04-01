import "./BookListing.css"

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
