import React, { Component } from "react";
import update from "immutability-helper";
import { connect } from 'react-redux';
import { MainFeedCard } from "../components";
import { fetchPhotoCards } from "../actions/photoCardActions";
import { fetchUser } from "../actions/userActions";
import "./MainFeed.css";

const mapStateToProps = state => {
  return { photoCards: state.photoCard, user: state.user };
}

class MainFeed extends Component {
  constructor() {
    super();

  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchPhotoCards()
    if(localStorage.getItem('token')) {
      this.props.fetchUser(token)
    }
    
  }

  render() {
    return (
      <div className="MainFeed">
        { this.props.photoCards.length ?
          this.props.photoCards.map(photoCard => {

          return (
            <MainFeedCard key={photoCard._id} currentUser={this.props.user.user} photo={photoCard} />
          );
        })
        :
        'No photos here...'}
      </div>
    );
  }
}

const mapDispatchToProps = { fetchPhotoCards, fetchUser };

const ConnectedMainFeed = connect(mapStateToProps, mapDispatchToProps)(MainFeed);

export default ConnectedMainFeed;
