import React from "react";
import { startCase, get } from "lodash";

export default function Book({ book, shelves, onChange }) {
  const handleChange = event => onChange(book, event.target.value);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${get(book, "imageLinks.smallThumbnail")})`
            }}
          ></div>

          <div className="book-shelf-changer">
            <select value={book.shelf || "None"} onChange={handleChange}>
              <option value="move" disabled>
                Move to...
              </option>
              {shelves.map(shelf => (
                <option key={shelf} value={shelf}>
                  {startCase(shelf)}
                </option>
              ))}
              <option>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
}
