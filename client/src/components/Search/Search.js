import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
        <div className="Search-container">
            <h1>Search component</h1>
            <form action="">
                <input type="text" placeholder="Search here..."/>
                <button>Search</button>
            </form>
        </div>
    );
  }
}

export default Search;
