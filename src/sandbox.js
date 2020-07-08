const api = 'https://reactnd-books-api.udacity.com';

const headers = {
  Accept: 'application/json',
  Authorization: 'token1233333',
};

// get specific book via ID (if it is in a shelf or not)
const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

// Shows all books that have shelf === read, wantToRead or currentlyReading
const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books[0].title);

console.log(getAll())