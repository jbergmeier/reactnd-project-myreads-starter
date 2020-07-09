const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

// get specific book via ID (if it is in a shelf or not)
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

// Shows all books that have shelf === read, wantToRead or currentlyReading
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

// Calls to update the shelf: values should be: none, read, wantToRead or currentlyReading
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

// Search for a book, delivers all books, pick ID do what ever you want
export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
