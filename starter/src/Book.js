import PropTypes from "prop-types";

import BookShelfChanger from "./BookShelfChanger";

function Book({
    book,
    shiftBook
}) {
    const {
        authors,
        imageLinks,
        title,
        shelf
    } = book;

    const handleBookShelfChange = (shelf) => {
        shiftBook(book, shelf);
    };

    return (
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage:
                    imageLinks ? `url(${imageLinks.thumbnail})`: null,
                }}
            ></div>
            <BookShelfChanger 
                shelf={shelf}
                handleBookShelfChange={handleBookShelfChange}
            />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors?.join()}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shiftBook: PropTypes.func.isRequired
};

export default Book;