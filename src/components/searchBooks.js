import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ShowBooks from './showBooks'

class SearchBooks extends Component {
  state = {
    query:'',
    tempBooks: [],
    isLoadingSearch: false
  };

  updateQuery = (query) => {
    console.log(query)
    BooksAPI.search(query).then((tempBooks) => {
      this.setState(() => ({
        isLoadingSearch: true,
        tempBooks,
      }))})
  }

  render() {
    const { query, tempBooks } = this.state
    const { books, isLoaded } = this.props
    return (
      <div className="search-books">
      <div className="search-books-bar">
        {console.log(query)}
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            value={query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        <ShowBooks books={tempBooks} isLoaded={isLoaded}/>
        </ol>
      </div>
    </div>
    )}}

export default SearchBooks;
