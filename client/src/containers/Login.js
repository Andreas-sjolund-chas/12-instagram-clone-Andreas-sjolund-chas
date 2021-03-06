import React, { Component } from 'react';
import { connect } from "react-redux";

import { Route, Link } from 'react-router-dom';
import { Signin, Signup, Profile } from '../components';

import './Login.css';

class Login extends Component {
  constructor() {
    super();
    
    this.state = {
      isLoggedIn: false
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated !== this.state.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="Login">
        { !this.props.isAuthenticated ?
        <div>
            <Link to="/user/signin">Sign in</Link>
            <Link to="/user/signup">Sign up</Link>
            
            <Route path="/user/signin" component={Signin} />
            <Route path="/user/signup" component={Signup} />
            </div>
          :
          <Profile />
          } 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

Login = connect(mapStateToProps)(Login);

export default Login;
