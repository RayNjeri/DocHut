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


