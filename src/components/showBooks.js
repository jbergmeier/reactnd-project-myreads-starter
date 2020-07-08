import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShowBooks extends Component {
  static propTypes = {
    // Makes sure that books is an array
    books: PropTypes.array.isRequired,
  };

  state = {
  };



  render() {
    const { books, isLoaded, error } = this.props;
    const shelves = ["read", "currentlyReading", "wantToRead"]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

                
                {isLoaded ? shelves.map((shelf) => (
                  
                  
                  <div className="bookshelf" key={shelf}>
                  <h2 className="bookshelf-title">{shelf}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">

                    {books.map((book) => (
                      book.shelf === shelf &&      

                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              `url(${book.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="move" disabled>
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
                        <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
         ))}
                </ol>
              </div>
            </div>
                  
                  
                ))
                : "Loading..."}

                  

            <div className="open-search">
              <Link to="/search">
                <button onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

export default ShowBooks;
