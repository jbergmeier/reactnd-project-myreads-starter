import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './components/searchBooks';
import ShowBooks from './components/showBooks';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    books: [],
    tempBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(
        () => ({
          isLoaded: true,
          books,
        }),
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    });
  }

  changeShelf = (book) => {
    console.log("search new Book added: ", book)
    const getIndexOfBook = this.state.books.findIndex(
      (old_book) => old_book.id === book.id
    );
    let updatedBooks = [...this.state.books];
    if(getIndexOfBook !== -1 ) {
      console.log("Index of Old Book", getIndexOfBook)
      updatedBooks[getIndexOfBook] = {
        ...updatedBooks[getIndexOfBook],
        shelf: book.shelf,
      };
      this.setState({ books: updatedBooks });
    }else {
      updatedBooks.push(book) 
      console.log("added new book")
      this.setState({ books: updatedBooks });
    }
    };

    clearTempBooks = () => {
      this.setState.tempBooks = []
    }

  onSearch = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ tempBooks: [] });
        } else {
          
          this.setState({ tempBooks: books });
        }
      });
    } else {
      this.setState({ tempBooks: [] });
    }
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books-content'>
                <div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Currently Reading</h2>
                    <ShowBooks
                      books={this.state.books.filter(
                        (b) => b.shelf === 'currentlyReading'
                      )}
                      isLoaded={this.state.isLoaded}
                      onChangeShelf={this.changeShelf}
                    />
                  </div>
                </div>
                <div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Want To Read</h2>
                    <ShowBooks
                      books={this.state.books.filter(
                        (b) => b.shelf === 'wantToRead'
                      )}
                      isLoaded={this.state.isLoaded}
                      onChangeShelf={this.changeShelf}
                    />
                  </div>
                </div>
                <div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Read</h2>
                    <ShowBooks
                      books={this.state.books.filter((b) => b.shelf === 'read')}
                      isLoaded={this.state.isLoaded}
                      onChangeShelf={this.changeShelf}
                    />
                  </div>
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>
                  <button
                    onClick={() => this.setState({ showSearchPage: true })}
                  >
                    Add a book
                  </button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path='/search'
          render={(history) => (
            <div>
              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Read</h2>
                <SearchBooks
                  books={this.state.books}
                  isLoaded={this.state.isLoaded}
                  searchedBooks={this.state.tempBooks}
                  search={this.onSearch}
                  onChangeShelf={this.changeShelf}
                  onClearTempBooks={this.clearTempBooks}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

//
