import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ATTEMPT,
  USER_SIGNUP_ATTEMPT,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS,
  FETCH_USER
} from "../constants/actionTypes";

import { apiUtils } from '../utils/utils';

// FETCH USER
export function fetchUser(token) {
  return (dispatch) => {
    return fetch("/users/me", {
      headers: {
        "Accept": "application/json",
        "X-ACCESS-TOKEN": token
      }
    })
      .then(res => res.json())
      .then((data) => {
        const user = {user: data.user, token: token}
        
      })
  }
} 

// LOGIN
export const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error
});

export function userLoginAttempt(credentials) {
  return (dispatch) => {

    return fetch("/users/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(apiUtils.checkStatus)
    .then(response => response.json())
    .then(payload => {
      console.log(payload)
      localStorage.setItem("token", payload.token);
      return dispatch(userLoginSuccess(payload));
    })
    .catch(error => {
      return dispatch(userLoginFailure(error.response.statusText));
    })
  };
}


// REGISTER

export function userSignupAttempt(data) {
  return (dispatch) => {
    return fetch('/users/register', {
      method: 'POST',
      headers: {           
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => {


        localStorage.setItem("user", JSON.stringify(res.token));

        return dispatch(userLoginSuccess(res));

  })
  .catch(error => {
      return dispatch(userSignupFailure(error));
      console.error(error);
  });    
  }
};

export const userSignupSuccess = user => ({
  type: USER_SIGNUP_SUCCESS,
  payload: user
});

export const userSignupFailure = (error) => ({
  type: USER_SIGNUP_FAILURE,
  payload: error
});