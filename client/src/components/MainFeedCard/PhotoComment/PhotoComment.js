import React, { Component } from "react";
import "./PhotoComment.css";

class PhotoComment extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <React.Fragment>
      <div className="comment-line-divider-top"></div>
        <div className="card-comment">
            <div className="card-row">
              <img
                src={this.props.comment.avatar}
                alt=""
                className="card-comment-avatar"
              />
              <p className="card-comment-username">{this.props.comment.username}</p>
            </div>
            <div className="card-comment-section">
              <p className="card-comment">{this.props.comment.content}</p>
            </div>
        </div>
        <div className="comment-line-divider-bottom"></div>
      </React.Fragment>
    );
  }
}

export default PhotoComment;
