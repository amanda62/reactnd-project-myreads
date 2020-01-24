import React from "react";
import { startCase } from "lodash";
import Book from "./Book";

export default function Bookshelf({ shelves, shelf, library, onChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{startCase(shelf)}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {library
            .filter(book => book.shelf === shelf)
            .map(book => (
              <Book
                key={book.id}
                shelves={shelves}
                book={book}
                onChange={onChange}
              />
            ))}
        </ol>
      </div>
    </div>
  );
}
