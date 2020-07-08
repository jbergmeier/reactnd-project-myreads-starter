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
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        isLoaded: true,
        books,
      }),
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
    })
  })}
    

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ShowBooks books={this.state.books.filter((b) => b.shelf ==='currentlyReading')} error={this.state.error} isLoaded={this.state.isLoaded} shelfInfo={{title: "currentlyReading", description: "Currently Reading"}}/>
                  </div>
                </div>
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <ShowBooks books={this.state.books.filter((b) => b.shelf ==='wantToRead')} error={this.state.error} isLoaded={this.state.isLoaded} shelfInfo={{title: "wantToRead", description: "Want To Read"}}/>
                  </div>
                </div>
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <ShowBooks books={this.state.books.filter((b) => b.shelf ==='read')} error={this.state.error} isLoaded={this.state.isLoaded} shelfInfo={{title: "read", description: "Read"}}/>
                  </div>
                </div>
              </div>
              <div className="open-search">
              <Link to="/search">
                <button onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
                </button>
              </Link>
            </div>
            </div>
          )}
        />
        <Route exact path="/search" render={(history) => <SearchBooks />} />
      </div>
    )
  }  
}


export default BooksApp;

// 
