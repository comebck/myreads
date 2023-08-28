import PropTypes from "prop-types";
import Book from "./Book";

function BookShelf({
    books,
    title,
    shiftBook
}) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book) => {
                    return (
                        <li key={book.id}>
                            <Book 
                                book = {book}
                                shiftBook = {shiftBook}
                            />
                        </li>
                    );
                })}
            </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shiftBook: PropTypes.func.isRequired,
    title: PropTypes.string    
};

export default BookShelf;