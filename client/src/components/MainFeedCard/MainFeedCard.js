import React, { Component } from "react";
import PhotoComment from "./PhotoComment/PhotoComment";
import CommentForm from "../Comment/Form/CommentForm";
import { likePhoto } from "../../actions/photoCardActions";
import { connect } from "react-redux";
import moment from "moment";
import "./MainFeedCard.css";

const mapStateToProps = state => {
  return { likes: state.likes };
}

class MainFeedCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentForm: false
    }
  }

  handleCommentAdded(commentContent) {
    this.setState({
      commentForm: false
    });
  }

  handleLike() {
    this.props.dispatch(likePhoto(this.props.photo._id))
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
    console.log(this.props.photo)
    const photoStyles = {
      backgroundImage: `url('${this.props.photo.photoPath}')`
    };
    const avatarStyles = {
      backgroundImage: `url('${this.props.photo.author.avatar}')`
    };
    return (
      <div className="MainFeedCard">
        <div className="photo-line-divider-top"></div>
        <div className="user-container card-row">
        <div className="card-avatar" style={avatarStyles} />
          
          <div className="card-col">
            <p className="card-username">{this.props.photo.author.name}</p>
            <p>{moment(this.props.photo.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className="media-container">
          <div className="card-img" style={photoStyles} />
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
          {/*  TODO : MAKE SURE THE COMPONENT RERENDER WHEN THE LIKE BUTTON IS CLICKED! */}
            <p className="card-ammount-likes">{this.props.photo.likes.length} Likes</p>
          </div>
        <div className="card-comment-container">

          { this.props.photo.comments.length ?
            this.props.photo.comments.map(item => {
              return <PhotoComment comment={item} />;
            })
          
          :
            <div>
              <div className="comment-line-divider-top"></div>
                <p>No comments yet</p>
              <div className="comment-line-divider-bottom"></div>  
            </div>
          } 

          { this.state.commentForm ?
          <CommentForm 
            photo={this.props.photo}
            id={this.props.photo._id}
            />
          :''}
        </div>
        <div className="photo-line-divider-bottom"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainFeedCard);
