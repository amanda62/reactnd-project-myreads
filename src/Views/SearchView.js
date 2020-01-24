import React, { useState } from "react";
import * as BooksAPI from "../BooksAPI";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import Book from "../components/Book";

export default function SearchView({ shelves }) {
  // TODO: make this reactive. useEffect listens from changes in params.query and fetches using this
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);

  const search = debounce(
    async query => {
      const searchResults = await BooksAPI.search(query);
      if (!Array.isArray(searchResults)) return setSearchResults([]);

      const savedBooks = await BooksAPI.getAll();
      const computedResults = searchResults.map(result => {
        const savedBook = savedBooks.find(book => result.id === book.id);
        return savedBook || result;
      });

      setSearchResults(computedResults);
    },
    500,
    { leading: false }
  );

  const changeShelf = async (book, shelf) => {
    const response = await BooksAPI.update(book, shelf);
    const updatedSearchResults = searchResults.map(result => {
      result.shelf = null;
      for (const shelf of shelves) {
        if (response[shelf].includes(result.id)) return { ...result, shelf };
      }
      return result;
    });
    setSearchResults(updatedSearchResults);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="search"
            placeholder="Search by title or author"
            onChange={event => search(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map(book => (
            <Book
              key={book.id}
              book={book}
              shelves={shelves}
              onChange={changeShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
