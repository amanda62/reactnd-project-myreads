import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Bookshelf from "../components/Bookshelf";
import { useHistory } from "react-router-dom";

export default function BooksApp({ shelves }) {
  const [library, setLibrary] = useState([]);
  const history = useHistory();

  useEffect(() => {
    BooksAPI.getAll().then(response => setLibrary(response));
  }, []);
  //TODO: create your own shelves. setShelves([...new Set(_library.map(book => book.shelf))])
  if (!library) return null;

  const changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    const _library = await BooksAPI.getAll();
    setLibrary(_library);
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf}
              shelves={shelves}
              shelf={shelf}
              library={library}
              onChange={changeShelf}
            />
          ))}
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    </div>
  );
}
