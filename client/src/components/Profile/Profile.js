import React, { Component } from 'react';
import { Grid } from '../';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      name: ''
     }
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    var data = {
      token: localStorage.getItem('token')
    }
    fetch('/users/me', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        id: res.id,
        email: res.email,
        name: res.name
      })
    })
    .catch()
  }

  render() { 
    return ( 
      <div className="Profile-container">
      <header className="Profile-header">
        <div className="Profile-row Profile--header__avatar">
          <img src="http://placehold.it/100x100" alt="Profile picture"/>
          </div>
          
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
            <Link to="profile/settings"><h1 className="Profile--header__settings"><i class="fas fa-cogs"></i></h1></Link>
        </div>


      </header>
      <main className="Profile-main">
        <Grid />
      </main>
      </div>
     );
  }
}
 
export default Profile;