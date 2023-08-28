import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";
import { BOOK_SHELVES } from "./constants";

function BooksList({
    books,
    shiftBook
}) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {Object.entries(BOOK_SHELVES).map(([shelfKey, shelfTitle]) => {
                    return (
                        <BookShelf
                            books={books.filter((book) => book.shelf === shelfKey)} 
                            key={shelfKey}
                            title={shelfTitle}
                            shiftBook={shiftBook}
                        /> 
                    );
                      
                })}
            </div>       
            <div className="open-search">
                <Link to="/search" className="add-book">
                    Add a book
                </Link>
            </div>
        </div>
    )
};

BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    shiftBook: PropTypes.func.isRequired 
};

export default BooksList;

