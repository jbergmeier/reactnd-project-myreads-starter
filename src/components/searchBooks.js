import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ShowBooks from './showBooks';

class SearchBooks extends Component {
  state = {
    query: '',
    isLoadingSearch: false,
  };

  handleChange = (e) => {
    const newValue = e.target.value;
    this.setState({ query: newValue }, () => {
      this.props.search(newValue);
    });
  };


  render() {
    const { query } = this.state;
    const {
      isLoaded,
      searchedBooks,
      onChangeShelf,
      books,
    } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            <ShowBooks
              books={searchedBooks}
              originalBooks={books}
              onChangeShelf={onChangeShelf}
              isLoaded={isLoaded}
            />
            {console.log(books)}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
