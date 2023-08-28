import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

import * as BooksAPI from "./BooksAPI";

function SearchBooks({
    shiftBook,
    userBooks
}) {

    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");

    const updateQuery = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        const queryBooks = async () => {
            const res = await BooksAPI.search(query, 50);

            // check if result doesn't contain error msg
            if (!res || "error" in res) {
                setBooks([]);
            } else {
                setBooks(res);
            }
            
        };

        // search for books only if search-text is given => otherwise 500 is thrown
        if (query) {
            queryBooks(query);
        } else {
            setBooks([]);
        }
    }, [query])
    

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={updateQuery}
              />
            </div>
          </div>
          <div className="search-books-results">
            {books ? (
                <BookShelf 
                    books={books.map((book) => {
                        // user books have shelf information
                        if (book.id in userBooks) {
                            return userBooks[book.id];
                        } else {
                            return book;
                        }
                    })}
                    title=""
                    shiftBook={shiftBook}
                />
            ) : (null)}            
          </div>
        </div>
    );
};

SearchBooks.propTypes = {
    userBooks: PropTypes.object.isRequired,
    shiftBook: PropTypes.func.isRequired   
};

export default SearchBooks;