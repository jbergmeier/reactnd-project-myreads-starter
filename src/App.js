import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './components/searchBooks';
import ShowBooks from './components/showBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ShowBooks books={this.state.books} />}
        />
        <Route exact path="/search" render={(history) => <SearchBooks />} />
      </div>
    );
  }
}

export default BooksApp;
