import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/photoCardActions';
import './CommentForm.css';

const mapDispatchToProps = dispatch => {
    return {
        addComment: comment => dispatch(addComment(comment))
    };
};

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            username: 'Axel Olsson',
            avatar: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
            content: ''
        }
    }

    handleCommentChange(event) {
        // This probably won't have to be done EVERY time someone types into the textarea...
        // The content one needs to happen though
        this.setState({
            content: event.target.value
        });
    }

    addComment(event) {
        event.preventDefault();
        const newComment = {
            username: this.state.username,
            avatar: this.state.avatar,
            content: this.state.content,
            photoId: this.props.photo.id
        }

        // this.props.onCommentAdded(newComment);
        this.props.addComment(newComment);
    }

    render() { 
        return (
            <React.Fragment>
                <form className="App-comment__form">
                    <textarea 
                        tabIndex={1} 
                        name="comment" 
                        placeholder="Write your comment here.." 
                        value={this.state.content} 
                        onChange={this.handleCommentChange.bind(this)}
                    ></textarea>
                    
                    <button tabIndex={2} className="App-comment__send" onClick={this.addComment.bind(this)}>Send</button>
                </form>
            </React.Fragment>
         )
    }
}

const ConnectedForm = connect(null, mapDispatchToProps)(CommentForm);
 
export default ConnectedForm;