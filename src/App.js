import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './components/searchBooks';
import ShowBooks from './components/showBooks';
import { Route } from 'react-router-dom';

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
          render={() => <ShowBooks books={this.state.books} error={this.state.error} isLoaded={this.state.isLoaded}/>}
        />
        <Route exact path="/search" render={(history) => <SearchBooks />} />
      </div>
    );
  }
}

export default BooksApp;
