import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Grid.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="Grid-container">

          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          <Link to="/photo/id"><img src="http://placehold.it/300x300" alt="Profile picture"/></Link>
          

      </div>
     );
  }
}
 
export default Grid;