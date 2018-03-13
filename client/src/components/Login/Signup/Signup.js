import React, { Component } from 'react';
import { connect } from "react-redux";

import { userSignupAttempt, userSignupFailure } from "../../../actions/userActions";

const mapStateToProps = state => {
  return { user: state.user };
}

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            status: [],
            username: true,
            email: true,
            password: true,
            nameStyle: [],
            emailStyle: [],
            passwordStyle: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Create the user from form 
    handleSubmit(event) {
        event.preventDefault();
        
        const data = {
            name: event.target.elements[0].value,
            email: event.target.elements[1].value,
            password: event.target.elements[2].value
        }

        // Call the action HERE
        this.props.userSignupAttempt(data);

        // fetch('/users/register', {
        //     method: 'POST',
        //     headers: {           
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res);
        //     if(res.error) {
        //         this.setState({
        //             status: {
        //                 error: res.error
        //             }
        //         });
        //     } else {
        //         this.setState({
        //             status: {
        //                 success: res.name
        //             }
        //         });
        //         localStorage.setItem("user", JSON.stringify(res.token));
        //         let storage = localStorage.getItem("user");
        //         console.log(JSON.parse(storage).user);
        //     }
        //     // Do something with the successfully created user
        // })
        // .catch(error => {
        //     // Show an error message in the component?
        //     // Could also handle validation errors here
        //     console.error(error);
        // });
        event.target.elements[0].value = '';
        event.target.elements[1].value = '';
        event.target.elements[2].value = '';
    }

    validateUsername(event) {
        var username = event.target.parentNode.parentNode[0].value;
        
        if (username.indexOf(' ') === -1 && username.length >= 3) {
            this.setState({
                username: true,
                nameStyle: {'borderColor': 'green'}
            });
        } else {
            this.setState({
                username: false,
                nameStyle: {'borderColor': 'red'}
            });
        }
    }

    validateEmail(event) {
        var email = event.target.parentNode.parentNode[1].value;

        if (email.indexOf('@') !== -1 && email.length > 5) {
            this.setState({
                email: true,
                emailStyle: {'borderColor': 'green'}
            });
        } else {
            this.setState({
                email: false,
                emailStyle: {'borderColor': 'red'}
            });
        }
    }

    validatePassword(event) {
        var password = event.target.parentNode.parentNode[2].value;

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
    }

  render() {
    return (
        <div className="Signup-container">
            <div className="msg-container-error">
                {this.state.status.success ? 
                    <p>{this.state.status.success} was successfully created.</p>
                :
                    <p>{this.state.status.error}</p>
                }
            </div>
                
            <form onSubmit={this.handleSubmit}>
                <div className="form-col">
                    <input
                        onChange={this.validateUsername.bind(this)} 
                        style={this.state.nameStyle} 
                        type="text" 
                        name="name" 
                        placeholder="Username..."/>

                    { !this.state.username ?
                        <p className="username-error">Needs to be at least 3 characters long. No spaces allowed.</p>
                    :
                    ''}
                </div>
                <div className="form-col">
                    <input
                        onChange={this.validateEmail.bind(this)} 
                        style={this.state.emailStyle} 
                        type="text" 
                        name="email" 
                        placeholder="Email..."/>
                    
                    { !this.state.email ?
                        <p className="email-error">Invalid email</p>
                    :
                    ''}
                </div>
                <div className="form-col">
                    <input
                        onChange={this.validatePassword.bind(this)} 
                        style={this.state.passwordStyle} 
                        type="password" 
                        name="password" 
                        placeholder="Password..."/>

                    { !this.state.password ?
                        <p className="password-error">Needs to be 8 at least characters long</p>
                    :
                    ''}
                </div>
                { this.state.username && this.state.email && this.state.password ?
                    <button type="submit">Sign in</button>
                :
                    <button disabled type="submit">Sign in</button>
                }

            </form>
        </div>
    );
  }
}

const mapDispatchToProps = { userSignupAttempt, userSignupFailure };

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);


export default Signup;
