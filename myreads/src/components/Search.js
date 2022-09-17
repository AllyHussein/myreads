import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substring(-8);

  const headers = {
    Accept: "application/json",
    Authorization: token,
  };


function Search({search , searchBooks , update}) {

  const [shelf , setShelf] = useState("")

  
  const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => setShelf(data.book.shelf))
    
  return (
    <>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'className="close-search"></Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(e) => search(e.target.value , 24 )}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {!searchBooks?.error ? searchBooks?.map((searchBook) => (
                      <li key={searchBook.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url(${searchBook.imageLinks?.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer" onClick={() => get(searchBook.id)}>
                            <select onChange={(e) => update(searchBook , e.target.value)} >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option selected={shelf === "currentlyReading"}  value="currentlyReading">
                                Currently Reading
                              </option>
                              <option selected={shelf === "wantToRead" } value="wantToRead">Want to Read</option>
                              <option selected={shelf === "read"} value="read">Read</option>
                              <option selected={shelf === "none"} value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{searchBook.title}</div>
                        <div className="book-authors">{searchBook.authors}</div>
                      </div>
                    </li>
                    )) : <div style={{fontSize : "25px" , marginTop : "10px"}}>No Items Found</div>}
            </ol>
          </div>
        </div>
        </>
  )
}

export default Search