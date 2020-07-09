import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

class showBooks extends Component {
  state = {};

  render() {
    const shelfOptions = [
      { title: 'read', description: 'Read' },
      { title: 'wantToRead', description: 'Want to Read' },
      { title: 'currentlyReading', description: 'Currently Reading' },
    ];
    const { books, isLoaded, onChangeShelf } = this.props;
    return (
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {isLoaded && books !== ''
            ? books.map((book) => (
                <li key={book.id}>
                  <div className='book'>
                    <div className='book-top'>
                      <div
                        className='book-cover'
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : '',
                        }}
                      ></div>
                      <div className='book-shelf-changer'>
                        <select
                          value={book.shelf}
                          onChange={async (e) => {
                            book.shelf = e.target.value;
                            await BooksAPI.update(book, e.target.value);
                            this.forceUpdate();

                            onChangeShelf(book);
                          }}
                        >
                          <option value='move' disabled>
                            Move to...
                          </option>
                          {shelfOptions.map((t) => (
                            <option key={t.title} value={t.title}>
                              {t.description}
                            </option>
                          ))}
                          <option value='none'>None</option>
                        </select>
                      </div>
                    </div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors}</div>
                  </div>
                </li>
              ))
            : 'Loading...'}
        </ol>
      </div>
    );
  }
}

export default showBooks;
