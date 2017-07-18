import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../API/api';

export const rolesRequest = () => ({
  type: types.ROLES_REQUEST
});

export const rolesSuccess = roles => ({
  type: types.ROLES_SUCCESS,
  roles
});

export const rolesFailure = roles => ({
  type: types.ROLES_FAILURE,
  roles
});

export const rolesAddRequest = roles => ({
  type: types.ROLES_ADD_REQUEST,
  roles
});

export const rolesAddSuccess = roles => ({
  type: types.ROLES_ADD_SUCCESS,
  roles
});

export const rolesAddFailure = roles => ({
  type: types.ROLES_ADD_FAILURE,
  roles
});

export const rolesGetRequest = () => ({
  type: types.ROLES_GET_REQUEST
});

export const rolesGetSuccess = roles => ({
  type: types.ROLES_GET_SUCCESS,
  roles
});

export const rolesGetFailure = roles => ({
  type: types.ROLES_GET_FAILURE,
  roles
});

export const rolesUpdateRequest = roles => ({
  type: types.ROLES_UPDATE_REQUEST,
  roles
});

export const rolesUpdateSuccess = role => ({
  type: types.ROLES_UPDATE_SUCCESS,
  role
});

export const rolesUpdateFailure = roles => ({
  type: types.ROLES_UPDATE_FAILURE,
  roles
});

export const rolesDeleteRequest = () => ({
  type: types.ROLES_DELETE_REQUEST
});

export const rolesDeleteSuccess = roles => ({
  type: types.ROLES_DELETE_SUCCESS,
  roles
});


export const rolesDeleteFailure = roles => ({
  type: types.ROLES_DELETE_FAILURE,
  roles
});


/* eslint no-undef: "off"*/

export const listroles = () => (dispatch) => {
  dispatch(rolesRequest());
  return (
    request
      .get('/api/roles')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(rolesSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesFailure(error));
      })
  );
};

export const createrole = roleData => (dispatch) => {
  dispatch(rolesAddRequest(roleData));
  return (
    request
      .post('/api/roles')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(roleData)
      .then((response) => {
        dispatch(rolesAddSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesAddFailure(error.response));
      })
  );
};

export const updaterole = roleData => (dispatch) => {
  dispatch(rolesUpdateRequest(roleData));
  return (
    request
      .put(`/api/roles/${roleData.id}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(roleData)
      .then((response) => {
        dispatch(rolesUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesUpdateFailure(error.response));
      })
  );
};

export const deleterole = roleId => (dispatch) => {
  dispatch(rolesDeleteRequest());
  return (
    request
      .delete(`/api/roles/${roleId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(rolesDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(rolesDeleteFailure(error.response));
      })
  );
};

export const getrole = roleId => (dispatch) => {
  // dispatch(rolesGetRequest());
  return (
    request
      .get(`/api/roles/${roleId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
    // .then((response) => {
    //   dispatch(rolesGetSuccess(response.body));
    // })
    // .catch((error) => {
    //   dispatch(rolesGetFailure(error.response));
    // })
  );
};

