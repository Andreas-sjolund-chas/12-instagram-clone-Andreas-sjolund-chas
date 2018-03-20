import React, { Component } from 'react';
import { Grid } from '../';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions/userActions';
import { fetchAllPhotosByUserId } from '../../actions/photoCardActions';

import './Profile.css';

const mapDispatchToProps = dispatch => {
  return {
      fetchUser: user => dispatch(fetchUser(user)),
      fetchAllPhotosByUserId: photoCard => dispatch(fetchAllPhotosByUserId(photoCard))
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: String,
      name: String,
      id: String,
      avatar: String,
      photoCards: []
     }
  }

  componentDidMount() {
    var token = localStorage.getItem('token');
    this.props.fetchUser(token)
      .then(res => {
        this.setState({
          email: res.user.email,
          name: res.user.name,
          avatar: res.user.avatar
        })
      });
    this.props.fetchAllPhotosByUserId(token)
      .then(res => {
        this.setState({
          photoCards: res
        });
      })
  }

  render() {
    const avatarStyles = {
      backgroundImage: `url('${this.state.avatar}')`
    }
    return ( 
      <div className="Profile-container">
      <header className="Profile-header">
        <div className="Profile-row Profile--header__avatar" style={avatarStyles} />
          <div className="Profile-row Profile--header__infoContainer">
            <h1 className="Profile--header__name">{this.state.name}</h1>
            <div className="Profile-col">
              <p className="Profile--header__email">{this.state.email}</p>
              <div className="Profile-row">
                <p className="Profile--header__posts">POSTS 32</p>
                <p className="Profile--header__followers">FOLLOWERS 666</p>
                <p className="Profile--header__follows">FOLLOWS 42</p>
              </div>

            </div>
              <Link to="profile/settings"><h1 className="Profile--header__settings"><i className="fa fa-cogs"></i></h1></Link>
          </div>

      </header>
      <main className="Profile-main">
      <div className="Grid-container">
        {this.state.photoCards.map(photoCard => {
          return (
            <Grid card={photoCard}/>
          );

        })}
      </div>
      </main>
      </div>
     );
  }
}

const ConnectedProfile = connect(null, mapDispatchToProps)(Profile);
 
export default ConnectedProfile;