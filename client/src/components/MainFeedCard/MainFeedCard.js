import React, { Component } from "react";
import PhotoComment from "./PhotoComment/PhotoComment";
import "./MainFeedCard.css";
import CommentForm from "../Comment/Form/CommentForm";

class MainFeedCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: this.props.photo.likes,
      commentForm: false
    }
  }

  handleCommentAdded(commentContent) {
    this.props.onCommentAdded(commentContent);
    this.setState({
      commentForm: false
    });
  }

  handleLike() {
    this.setState({
      likes: this.state.likes + 1
    });
  }

  handleCommentOpener() {

    if(!this.state.commentForm) {
    this.setState({
        commentForm: true
      });
    } else {
      this.setState({
        commentForm: false
      })
    }
  }

  render() {
    const styles = {
      backgroundImage: `url(${this.props.photo.photoPath})`
    };

    return (
      <div className="MainFeedCard">
        <div className="photo-line-divider-top"></div>
        <div className="user-container card-row">
          <img
            src={this.props.photo.author.avatar}
            alt=""
            className="card-avatar"
          />
          <p className="card-username">{this.props.photo.author.name}</p>
        </div>
        <div className="media-container">
          <div className="card-img" style={styles} />
        </div>
        <div className="card-like-section card-row">
          <button className="card-like-btn" onClick={this.handleLike.bind(this)}>
            <i className="fas fa-heart card-like-icon" />
          </button>
          <button className="card-comment-btn" onClick={this.handleCommentOpener.bind(this)}>
          <i className="far fa-comment card-comment-icon"></i>
          </button>
          </div>
          <div className="card-row">
            <p className="card-ammount-likes">{this.state.likes} Likes</p>  
          </div>
        <div className="card-comment-container">
          {this.props.photo.comments.map(item => {
            return <PhotoComment comment={item} />;
          })}
          { this.state.commentForm ?
          <CommentForm 
            onCommentAdded={this.handleCommentAdded.bind(this)} 
            photo={this.props.photo}
            id={this.props.photo.id}
            />
          :''}
        </div>
        <div className="photo-line-divider-bottom"></div>
      </div>
    );
  }
}

export default MainFeedCard;
