import React, { Component } from "react";
import { connect } from "react-redux";

import { userLoginAttempt, userLoginFailure } from "../../../actions/userActions";

const mapStateToProps = state => {
  return { user: state.user };
}

class Signin extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      emailValidation: true,
      passwordValidation: true,
      emailStyle: [],
      passwordStyle: []
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    var email = event.target.value;
        if (email.indexOf('@') !== -1 && email.length > 5) {
            this.setState({
                emailValidation: true,
                emailStyle: {'borderColor': 'green'}
            });
        } else {
            this.setState({
                emailValidation: false,
                emailStyle: {'borderColor': 'red'}
            });
        }

    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    var password = event.target.value;
        if (password.length >= 8) {
            this.setState({
                password: true,
                passwordStyle: {'borderColor': 'green'}
            });
        } else {
            this.setState({
                password: false,
                passwordStyle: {'borderColor': 'red'}
            });
        }

    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.userLoginAttempt({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <div className="Signin-container">
        <form onSubmit={this.handleSubmit} method="post">
          <div className="form-col">
            <input
              type="text"
              name="email"
              placeholder="Email..."
              value={this.state.email}
              onChange={this.handleEmailChange}
              style={this.state.emailStyle}
            />
            { !this.state.emailValidation ?
              <p className="email-error">Invalid email</p>
          :
          ''}
          </div>
          <div className="form-col">
            <input
              type="password"
              name="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.handlePasswordChange}
              style={this.state.passwordStyle}
            />
            { !this.state.password ?
              <p className="password-error">Needs to be 8 at least characters long</p>
            :
            ''}
            {this.props.user.errorMessage !== '' ? 
            <p>{this.props.user.errorMessage}</p>
            :
            ''}
          </div>
          <button
            disabled={
              !(this.state.email.length > 0 && this.state.password.length > 0)
                ? "disabled"
                : ""
            }
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { userLoginAttempt, userLoginFailure };

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default Signin;
