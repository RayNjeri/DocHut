import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../API/api';

export const usersRequest = () => ({
  type: types.USERS_REQUEST
});

export const usersSuccess = users => ({
  type: types.USERS_SUCCESS,
  users
});

export const usersFailure = users => ({
  type: types.USERS_FAILURE,
  users
});

export const usersAddRequest = users => ({
  type: types.USERS_ADD_REQUEST,
  users
});

export const usersAddSuccess = users => ({
  type: types.USERS_ADD_SUCCESS,
  users
});

export const usersAddFailure =users => ({
  type: types.USERS_ADD_FAILURE,
  users
});

export const usersGetRequest = () => ({
  type: types.USERS_GET_REQUEST
});

export const usersGetSuccess = users => ({
  type: types.USERS_GET_SUCCESS,
  users
});

export const usersGetFailure = users => ({
  type: types.USERS_GET_FAILURE,
  users
});

export const usersUpdateRequest = users => ({
  type: types.USERS_UPDATE_REQUEST,
  users
});

export const usersUpdateSuccess = user => ({
  type: types.USERS_UPDATE_SUCCESS,
  user
});

export const usersUpdateFailure = users => ({
  type: types.USERS_UPDATE_FAILURE,
  users
});

export const usersDeleteRequest = () => ({
  type: types.USERS_DELETE_REQUEST
});

export const usersDeleteSuccess = users => ({
  type: types.USERS_DELETE_SUCCESS,
  users
});

export const userDeleteFailure = users => ({
  type: types.USERS_DELETE_FAILURE,
  users
});

export const usersSearchFilter = searchFilter => ({
  type: types.SET_USERS_SEARCH_FILTER,
  searchFilter
});

/* eslint no-undef: "off"*/

export const listUsers = () => (dispatch) => {
  dispatch(usersRequest());
  return (
    request
      .get('/api/user')
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(usersSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersFailure(error));
      })
  );
};

export const createUser = userData => (dispatch) => {
  dispatch(usersAddRequest(userData));
  return (
    request
      .post('/api/user')
      .set('x-access-token', window.localStorage.getItem('token'))
      .send(userData)
      .then((response) => {
        dispatch(usersAddSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersAddFailure(error.response));
      })
  );
};

export const updateUser = userData => (dispatch) => {
  dispatch(usersUpdateRequest(userData));
  return (
    request
      .put(`/api/user/${userData.id}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .send(userData)
      .then((response) => {
        dispatch(usersUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersUpdateFailure(error.response));
      })
  );
};

export const deleteUser = userId => (dispatch) => {
  dispatch(usersDeleteRequest());
  return (
    request
      .delete(`/api/user/${userId}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(usersDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersDeleteFailure(error.response));
      })
  );
};

export const getUser = userId => (dispatch) => {
  dispatch(usersGetRequest());
  return (
    request
      .get(`/api/user/${userId}`)
      .set('x-access-token', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(usersGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(usersGetFailure(error.response));
      })
  );
};

