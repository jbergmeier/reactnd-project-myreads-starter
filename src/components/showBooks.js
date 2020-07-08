import React, { Component } from 'react';
import BooksApp from '../App';
import * as BooksAPI from '../BooksAPI';

class showBooks extends Component {
  state = {  }
  shelfOptions = [{ title: 'read', description: 'Read' }, { title: 'wantToRead', description: 'Want to Read' }, { title: 'currentlyReading', description: 'Currently Reading' }]
  render() { 
    const { books, isLoaded, shelfInfo } = this.props
    console.log(shelfInfo.title)
    return ( 
      <div className="bookshelf-books">
        <ol className="books-grid">
          {isLoaded ? books.map((book) => 
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={async (e) => {
                    book.shelf = e.target.value
                    this.forceUpdate();
                    await BooksAPI.update(book, e.target.value)
                    }}>
                    <option value="move" disabled>Move to...</option>
                    {this.shelfOptions.map((t) => (
                      <option key={t.title} value={t.title}>{t.description}</option>
                      ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
          ): 'Loading...'} 
        </ol>
      </div>
     );
  }
}
 
export default showBooks;