import React, { Component } from "react";
import moment from "moment";
import "./PhotoComment.css";

class PhotoComment extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const avatarStyles = {
      backgroundImage: `url('${this.props.comment.avatar}')`
    };
    return (
      <React.Fragment>
      <div className="comment-line-divider-top"></div>
        <div className="card-row">
          <div className="card-comment">
            <div className="card-comment-avatar" style={avatarStyles}/>
            <p className="card-comment-username">{this.props.comment.name}</p>
            <p>{moment(this.props.comment.createdAt).fromNow()}</p>
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
