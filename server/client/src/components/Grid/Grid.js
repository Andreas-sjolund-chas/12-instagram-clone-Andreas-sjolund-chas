import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import './Grid.css';

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const photoStyle = {
      backgroundImage: `url('${this.props.card.photoPath}'`
    }
    return ( 
      
      <React.Fragment>
        <div className="Grid--photo" style={photoStyle}>
          <div className="card-row Grid-overlay">
            <p className="card-ammount-likes">{this.props.card.likes.length} Likes</p>
            <p className="card--date">{moment(this.props.card.createdAt).fromNow()}</p>
          </div>
        </div>
      </React.Fragment>
     );
  }
}
 
export default Grid;