import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtils';
import * as types from './actionTypes';
import { setAuthToken } from '../utils/tokenUtils';
export const signUpUser = user => ({ type: types.SIGNUP_USER, user });

export const logoutUser = () => ({ type: types.LOGOUT_USER });

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

export const logoutFailure = message => ({ type: types.LOGOUT_FAILURE, message });

export const loginSuccessful = user => ({
  type: types.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
  user
});

export const loginFailed = message => ({
  type: types.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

export const loginUser = user => ({ type: types.LOGIN_USER, user });

/* eslint no-undef: "off"*/

export const userSignupRequest = userData => (dispatch) => {
  dispatch(signUpUser(userData));
  return (
    request
      .post('/api/user')
      .send(userData)
      .then((response) => {
        setAuthToken(response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
  );
};

export const login = (userData) => (dispatch) => {
  dispatch(loginUser(userData));
  return (
    request
      .post('/api/user/login')
      .send(userData)
      .then((response) => {
        setAuthToken(response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
        return Promise.reject(error.response.body);
      })
  );
};


export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser());
};
