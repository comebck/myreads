import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes} from "react-router-dom";

import SearchBooks from "./SearchBooks";
import BooksList from "./BooksList";

import * as BooksAPI from "./BooksAPI";

function App() {
    const [userBooks, setUserBooks] = useState({});

    const shiftBook = (book, shelf) => {
        const updateBook = async () => {
            const res = await BooksAPI.update(book, shelf);
            if (res) {
                // update books also localy => performs better then fetching user books from server each time
                const updatedBook = {
                    ...book,
                    shelf:shelf
                }
                updateUserBooks(updatedBook);
            }
        }

        updateBook();    
    };

    const updateUserBooks = (updatedBook) => {
        const updatedBooks = {};

        let bookUpdated = false;
        Object.entries(userBooks).forEach(([id, book]) => {
            if (id === updatedBook.id) {
                updatedBooks[id] = updatedBook;
                bookUpdated = true;
            } else {
                updatedBooks[id] = book;
            }
        });

        // if the book wasn't at any shelve until now, add it to user books
        if (!bookUpdated) {
            updatedBooks[updatedBook.id] = updatedBook;
        }

        setUserBooks(updatedBooks);
    }

    const fetchBooks = async () => {
        const res = await BooksAPI.getAll();

        // map books by id => for better performance in assigning right shelves in books search component.
        const books = {}
        res.forEach((book) => {
            books[book.id] = book
        });

        setUserBooks(books);
    };

    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <div className="app">
            <Routes>
                <Route 
                    exact path="/"
                    element={userBooks ? (
                        <BooksList 
                            books={Object.values(userBooks)}
                            shiftBook={shiftBook}
                        />
                    ) : (
                        <div>Books are loading.</div>
                    )}
                />
                <Route 
                    path="/search" 
                    element={
                        <SearchBooks 
                            shiftBook={shiftBook}
                            userBooks={userBooks}
                        />
                    } 
                />
            </Routes>      
        </div>
    );
}

export default App;
