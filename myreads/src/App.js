import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks , setAllBooks] = useState([])
  const [searchBooks , setSearchBooks] = useState([])
  const api = "https://reactnd-books-api.udacity.com";

  let token = localStorage.token;
  
  if (!token) token = localStorage.token = Math.random().toString(36).substring(-8);
  
  const headers = {
    Accept: "application/json",
    Authorization: token,
  };

  const search = (query, maxResults) => {
    if (query.length !== 0 ) {
      fetch(`${api}/search`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, maxResults }),
      })
        .then((res) => res.json())
        .then((data) => setSearchBooks(data.books));
    }
  }
  useEffect(() => {
    fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => setAllBooks(data.books))
  }, [])

  const CurrentlyReadingBooks = allBooks.filter((readBook) => readBook.shelf === 'currentlyReading')
  const WantToReadBooks = allBooks.filter((readBook) => readBook.shelf === 'wantToRead')
  const ReadBooks = allBooks.filter((readBook) => readBook.shelf === 'read')
  const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json())
  .then(() => window.location.reload())
  
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
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
                              <option selected value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
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
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
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
                              <option selected value="none" disabled>
                                Move to...
                              </option>
                              <option disabled value="currentlyReading">
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
                              <option selected value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option disabled value="wantToRead">Want to Read</option>
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
                              <option selected value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option disabled value="read">Read</option>
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
            </div>
          </div>
          <div className="open-search">
            <a  onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
