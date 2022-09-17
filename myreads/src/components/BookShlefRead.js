import React from 'react'

function BookShlefRead({ReadBooks , update}) {
  return (
    <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {ReadBooks.length !== 0 ? ReadBooks.map((readBook) => (
                      <li key={readBook.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                `url(${readBook.imageLinks.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => update(readBook , e.target.value)} >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option selected value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{readBook.title}</div>
                        <div className="book-authors">{readBook.authors}</div>
                      </div>
                    </li>

                    )) : <div style={{fontSize : "25px" , marginTop : "10px"}}>You Dont Have Read Books Yet</div>}
                    
                    
                  </ol>
                </div>
              </div>
  )
}

export default BookShlefRead