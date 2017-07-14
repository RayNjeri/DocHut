import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import * as tokenUtils from '../utils/tokenUtils';

import { postEndpoint, getEndpoint, deleteEndpoint } from '../API/api';

export const closeDocument = () => ({
  type: types.CLOSE_DOCUMENT
});

export const documentsRequest = () => ({
  type: types.DOCUMENTS_REQUEST
});

export const documentsSuccess = documents => ({
  type: types.DOCUMENTS_SUCCESS,
  documents
});

export const documentsFailure = documents => ({
  type: types.DOCUMENTS_FAILURE,
  documents
});

export const documentsAddRequest = documents => ({
  type: types.DOCUMENTS_ADD_REQUEST,
  documents
});

export const documentsAddSuccess = documents => ({
  type: types.DOCUMENTS_ADD_SUCCESS,
  documents
});

export const documentsAddFailure = documents => ({
  type: types.DOCUMENTS_ADD_FAILURE,
  documents
});

export const documentsGetRequest = () => ({
  type: types.DOCUMENTS_GET_REQUEST
});

export const documentsGetSuccess = documents => ({
  type: types.DOCUMENTS_GET_SUCCESS,
  documents
});

export const documentsGetFailure = documents => ({
  type: types.DOCUMENTS_GET_FAILURE,
  documents
});

export const documentsUpdateRequest = documents => ({
  type: types.DOCUMENTS_UPDATE_REQUEST,
  documents
});

export const documentsUpdateSuccess = document => ({
  type: types.DOCUMENTS_UPDATE_SUCCESS,
  document
});

export const documentsUpdateFailure = documents => ({
  type: types.DOCUMENTS_UPDATE_FAILURE,
  documents
});

export const documentsDeleteRequest = () => ({
  type: types.DOCUMENTS_DELETE_REQUEST
});

export const documentsDeleteSuccess = documentId => ({
  type: types.DOCUMENTS_DELETE_SUCCESS,
  documentId
});

export const documentsDeleteFailure = documents => ({
  type: types.DOCUMENTS_DELETE_FAILURE,
  documents
});

export const documentsSearchFilter = searchFilter => ({
  type: types.SET_DOCUMENTS_SEARCH_FILTER,
  searchFilter
});

/* eslint no-undef: "off"*/

export const listDocuments = (limit, offset) => (dispatch) => {
  dispatch(documentsRequest());
  return (
    request
      .get(`/api/document?limit=${limit}&offset=${offset}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsFailure(error));
      })
  );
};

export const createDocument = documentData => (dispatch) => {
  dispatch(documentsAddRequest(documentData));
  return (
    request
      .post('/api/document')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(documentData)
      .then((response) => {
        dispatch(documentsAddSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsAddFailure(error.response));
      })
  );
};

export const updateDocument = documentData => (dispatch) => {
  dispatch(documentsUpdateRequest(documentData));
  return (
    request
      .put(`/api/document/${documentData.id}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(documentData)
      .then((response) => {
        dispatch(documentsUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsUpdateFailure(error.response));
      })
  );
};

export const deleteDocument = documentId => (dispatch) => {
  dispatch(documentsDeleteRequest());
  return (
    request
      .delete(`/api/document/${documentId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsDeleteSuccess(documentId));
      })
      .catch((error) => {
        dispatch(documentsDeleteFailure(error.response));
      })
  );
};

export const getDocument = documentId => (dispatch) => {
  dispatch(documentsGetRequest());
  return (
    request
      .get(`/api/document/${documentId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((response) => {
        dispatch(documentsGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsGetFailure(error.response));
      })
  );
};

export const searchDocument = (title) => {
  title = encodeURIComponent(title);
  return (dispatch) => {
    return getEndpoint(`/api/search/document?q=${title}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then((res) => {
        dispatch(documentsSearchFilter(res.body));
      })
      .catch((error) => {
        dispatch(documentsSearchFilter(error));
      });
  };
};
