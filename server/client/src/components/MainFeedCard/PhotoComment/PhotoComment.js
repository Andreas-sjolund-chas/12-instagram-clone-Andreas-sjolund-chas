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
      <div className="card-col card-comment">
        <div className="card-row">
          <div className="card-comment-avatar" style={avatarStyles}/>
            
            <div className="card-row card--comment-info"> 
              <p className="card-comment-username">{this.props.comment.name}</p>
              <p className="card-comment-date">{moment(this.props.comment.createdAt).fromNow()}</p>
            </div>

        </div>

          <div className="card-comment-section">
            <p className="card-comment-message">{this.props.comment.content}</p>
          </div>
        </div>
      <div className="comment-line-divider-bottom"></div>
      </React.Fragment>
    );
  }
}

export default PhotoComment;
