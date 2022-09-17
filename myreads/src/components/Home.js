import React from 'react'
import { Link } from 'react-router-dom';
import BookShelfCuurent from "../components/BookShelfCurrent";
import BookShelfWant from "../components/BookShelfWant";
import BookShlefRead from "../components/BookShlefRead";
function Home({CurrentlyReadingBooks , WantToReadBooks ,ReadBooks , update , shelf}) {
  return (
    <>
    <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelfCuurent CurrentlyReadingBooks={CurrentlyReadingBooks} update={update} shelf={shelf} />
              <BookShelfWant WantToReadBooks={WantToReadBooks} update={update} />
              <BookShlefRead ReadBooks={ReadBooks} update={update} />
            </div>
          </div>
          
        </div>
        <div className="open-search">
        <Link to="/search"></Link>
      </div>
    </>
    
  )
}

export default Home