import React from 'react'

function BookShelfCuurent( {CurrentlyReadingBooks , update}) {
  return (
    <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {CurrentlyReadingBooks.length !== 0 ?  CurrentlyReadingBooks.map((currentBook) => (
                      <li key={currentBook.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url(${currentBook.imageLinks.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => update(currentBook , e.target.value)} >
                              <option  value="none" disabled>
                                Move to...
                              </option>
                              <option selected value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{currentBook.title}</div>
                        <div className="book-authors">{currentBook.authors}</div>
                      </div>
                    </li>
                    )) : <div style={{fontSize : "25px" , marginTop : "10px"}}>You Have No Currently Reading Books Yet</div>}
                  </ol>
                </div>
              </div>
  )
}

export default BookShelfCuurent