/*  Search.js
*   This component will render the search page, as well as the functionality to
*   search for books within the API
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './ListBooks'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    result: [],
    noResult: false
  }
  updateQuery = (event) => {
    const query = event.target.value;
    this.setState({ query })
    // check if something entered
      if (query) {
        BooksAPI.search(query).then(books => {
          if (books.length > 0) {
           this.setState({result: books})
         } else {
           // clear array
           this.setState({result: [] })
         }
        })
      }
  }
  render() {
    const { query, result } = this.state
/* this.state.query = search term */
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.updateQuery} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {/* TODO: Add a fallback for the book thumbnail, title, and author */}
            {result.map((books) =>
              <Book bookTitle={books.title} bookAuthor={books.author} bookImage={books.imageLinks.thumbnail}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
