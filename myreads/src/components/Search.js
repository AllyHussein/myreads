import React from 'react'
import { Link } from 'react-router-dom'

function Search({search , searchBooks , update}) {
    
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
                          <div className="book-shelf-changer">
                            <select onChange={(e) => update(searchBook , e.target.value)} >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option  value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option selected value="none">None</option>
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