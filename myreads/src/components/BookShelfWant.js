import React from 'react'

function BookShelfWant({WantToReadBooks , update}) {
  return (
    <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {WantToReadBooks.length !== 0 ? WantToReadBooks.map((wantBook) => (
                      <li key={wantBook.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url(${wantBook.imageLinks.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => update(wantBook , e.target.value)} >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option selected value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{wantBook.title}</div>
                        <div className="book-authors">{wantBook.authors}</div>
                      </div>
                    </li>
                    )) : <div style={{fontSize : "25px" , marginTop : "10px"}}>You Dont Have Want To Read Books Yet</div>}
                  </ol>
                </div>
              </div>
  )
}

export default BookShelfWant