import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Grid.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(this.props.card)
    const photoStyle = {
      backgroundImage: `url('${this.props.card.photoPath}'`
    }
    return ( 
      
      <React.Fragment>
        <div className="Grid--photo" style={photoStyle}></div>
      </React.Fragment>
     );
  }
}
 
export default Grid;