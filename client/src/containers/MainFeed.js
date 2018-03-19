import React, { Component } from "react";
import update from "immutability-helper";
import { connect } from 'react-redux';
import { MainFeedCard } from "../components";
import { fetchPhotoCards } from "../actions/photoCardActions";
import "./MainFeed.css";

const mapStateToProps = state => {
  return { photoCards: state.photoCard, user: state.user };
}

class MainFeed extends Component {
  componentDidMount() {
    this.props.fetchPhotoCards()
  }

  render() {
    return (
      <div className="MainFeed">
        { this.props.photoCards.length ?
          this.props.photoCards.map(photoCard => {

          return (
            <MainFeedCard photo={photoCard} />
          );
        })
        :
        'No photos here...'}
      </div>
    );
  }
}

const mapDispatchToProps = { fetchPhotoCards };

const ConnectedMainFeed = connect(mapStateToProps, mapDispatchToProps)(MainFeed);

export default ConnectedMainFeed;
