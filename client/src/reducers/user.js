import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ATTEMPT,
  USER_SIGNUP_ATTEMPT,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS
} from "../constants/actionTypes";

import update from "immutability-helper";

const initialState = {
  token: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_ATTEMPT:
      return {
        isLoading: true
      }
      return state;
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      }
      return state;

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        token: action.payload.token,
        isLoading: false,
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email
        }
      }

    case USER_SIGNUP_ATTEMPT:
    return {
      ...state,
      isLoading: true
    } 
    return state;
    
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      } 
    return state;

    case USER_SIGNUP_SUCCESS:
      // 
    return state;

    default:
      return state;
  }
};
export default user;
