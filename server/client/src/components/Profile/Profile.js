import React, { Component } from 'react';
import { Grid } from '../';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import { fetchUser, userSignOut } from '../../actions/userActions';
import { fetchAllPhotosByUserId } from '../../actions/photoCardActions';

import './Profile.css';

const mapDispatchToProps = dispatch => {
  return {
      userSignOut: user => dispatch(userSignOut(user)),
      fetchUser: user => dispatch(fetchUser(user)),
      fetchAllPhotosByUserId: photoCard => dispatch(fetchAllPhotosByUserId(photoCard))
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: String,
        name: String,
        id: String,
        avatar: String
      },
      photoCards: [],
      totalLikes: ''
     }
  }

  componentDidMount() {
    var token = localStorage.getItem('token');

    this.props.fetchUser(token)
      .then(res => {
        if(res.user) {
          this.setState({
            user: {
              email: res.user.email,
              name: res.user.name,
              avatar: res.user.avatar,
              id: res.user.id
            }
          })
        }
      });

    this.props.fetchAllPhotosByUserId(token)
      .then(res => {
        this.setState({
          photoCards: res
        }, function() {

          let likeCount = 0;

          if(this.state.photoCards.length) {
            this.state.photoCards.map(card => {
              likeCount = likeCount + card.likes.length
            })
        }
          this.setState({
            totalLikes: likeCount
          })
        });
      })
  }

  handleSignOut() {
    this.props.userSignOut();
    localStorage.removeItem('token');
  }

  render() {
    const avatarStyles = {
      backgroundImage: `url('${this.state.user.avatar}')`
    }
    return ( 
      <div className="Profile-container">
      <header className="Profile-header">
        <div className="Profile-row Profile--header__avatar" style={avatarStyles} />
          <div className="Profile-row Profile--header__infoContainer">
            <h1 className="Profile--header__name">{this.state.user.name}</h1>
            <div className="Profile-col">
              <p className="Profile--header__email">{this.state.user.email}</p>
              <div className="Profile-row">
                <p className="Profile--header__posts">Posts {this.state.photoCards.length}</p>
                <p className="Profile--header__likes">Total Likes {this.state.totalLikes}</p>
              </div>

            </div>
              <div className="Profile-col">
                <Link to="user/signin" className="Profile--sign-out" onClick={this.handleSignOut.bind(this)}><i class="fa fa-sign-out"></i></Link>
                <Link to="profile/settings"><h1 className="Profile--header__settings"><i className="fa fa-cogs"></i></h1></Link>
              </div>
          </div>

      </header>
      <main className="Profile-main">
      <div className="Grid-container">
        { this.state.photoCards.length ? 
            this.state.photoCards.map(photoCard => {
              console.log(photoCard)
              return (
                <Grid card={photoCard}/>
              );

            })
          :
          <p>You have no photos uploaded yet... Click <Link to="/upload/picture" >here</Link> to upload one :)</p>
      }
      </div>
      </main>
      </div>
     );
  }
}

const ConnectedProfile = connect(null, mapDispatchToProps)(Profile);
 
export default ConnectedProfile;