import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Search from "./components/Search";
function App() {
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
  .then(() => window.location.href = '/')
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<Home CurrentlyReadingBooks={CurrentlyReadingBooks}
         WantToReadBooks={WantToReadBooks}
         ReadBooks={ReadBooks} update={update}/>} />
        <Route exact path='/search' element={<Search search={search} searchBooks={searchBooks} update={update} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
