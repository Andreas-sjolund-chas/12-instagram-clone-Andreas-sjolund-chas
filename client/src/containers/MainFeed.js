import React, { Component } from "react";
import update from "immutability-helper";
import { connect } from 'react-redux';
import { MainFeedCard } from "../components";
import { fetchPhotoCards } from "../actions/photoCardActions";
import "./MainFeed.css";

const mapStateToProps = state => {
  return { photoCards: state.photoCard, user: state.user };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchPhotoCards: photos => dispatch(fetchPhotoCards())
//   }
// }

class MainFeed extends Component {
  constructor() {
    super();
    this.state = {
      photoCards: []
    };
  }

  handleCommentAdded(commentContent) {
    let photoIndex = commentContent.photo;
    let cardIndex = this.state.photoCards.indexOf(
      this.state.photoCards[photoIndex]
    );

    const newPhotoCards = update(this.state.photoCards, {
      [cardIndex]: { comments: { $push: [commentContent] } }
    });

    this.setState(
      {
        photoCards: newPhotoCards
      }
    );
  }

  componentWillMount() {
    this.props.fetchPhotoCards()
      .then(res => {
        this.setState({
          photoCards: res
        })
      });
      
  }

  render() {
    console.log(this.props)
    return (
      <div className="MainFeed">
        { this.state.photoCards.length ?
          this.state.photoCards.map(photoCard => {

          return (
            <MainFeedCard
              photo={photoCard}
              onCommentAdded={this.handleCommentAdded.bind(this)}
            />
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
