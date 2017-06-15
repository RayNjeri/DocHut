import request from 'superagent';
import * as types from './actionTypes';

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

export const documentsUpdateSuccess = documents => ({
  type: types.DOCUMENTS_UPDATE_SUCCESS,
  documents
});

export const documentsUpdateFailure = documents => ({
  type: types.DOCUMENTS_UPDATE_FAILURE,
  documents
});

export const documentsDeleteRequest = () => ({
  type: types.DOCUMENTS_DELETE_REQUEST
});

export const documentsDeleteSuccess = documents => ({
  type: types.DOCUMENTS_DELETE_SUCCESS,
  documents
});

export const documentsDeleteFailure = documents => ({
  type: types.DOCUMENTS_DELETE_FAILURE,
  documents
});

export const documentsSearchFilter = searchFilter => ({
  type: types.SET_DOCUMENTS_SEARCH_FILTER,
  searchFilter
});


export const listDocuments = () => (dispatch) => {
  dispatch(documentsRequest());
  return (
      request
        .get('/api/documents')
        .set('authorization', window.localStorage.getItem('token'))
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
      .set('authorization', window.localStorage.getItem('token'))
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
      .set('authorization', window.localStorage.getItem('token'))
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
      .set('authorization', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsDeleteSuccess(response.body));
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
      .set('authorization', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsGetFailure(error.response));
      })
  );
};
