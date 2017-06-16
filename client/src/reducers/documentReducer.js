import * as types from '../actions/actionTypes';

const DOCUMENT_LIST = {
  documents: [],
  error: null,
  loading: false,
  searchFilter: '',
};

export const documentList = (state = DOCUMENT_LIST, action) => {
  switch (action.type) {
    case types.DOCUMENTS_REQUEST:
      return Object.assign({}, state, {
        documents: [],
        error: null,
        loading: true,
      });
    case actionTypes.DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        documents: action.document,
        error: null,
        loading: false,
      });
    case actionTypes.DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        documents: [],
        error: action.error,
        loading: false,
      });
    case actionTypes.DOCUMENT_ADD_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.document,
          ...state.documents],
      });
    case actionTypes.DOCUMENTS_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });
    case actionTypes.SET_DOCUMENTS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: searchFilter(state.searchFilter, action),
      });
    default:
      return state;
  }
};

export const addDocument = (state = { error: null, loading: false, document: null }, action) => {
  switch (action.type) {
    case types.DOCUMENTS_ADD_REQUEST:
      return {
        error: null,
        loading: true,
        documents: null,
      };
    case types.DOCUMENTS_ADD_SUCCESS:
      return {
        error: null,
        loading: false,
        documents: action.document,
      };
    case types.DOCUMENTS_ADD_FAILURE:
      return {
        error: action.error,
        loading: false,
        documents: null,
      };
    default:
      return state;
  }
};

export const documentPage = (state = { document: null, error: null, loading: false }, action) => {
  switch (action.type) {
    case types.DOCUMENTS_GET_REQUEST:
      return {
        documents: null,
        error: null,
        loading: true,
      };
    case types.DOCUMENTS_GET_SUCCESS:
      return {
        documents: action.response.result,
        error: null,
        loading: false,
      };
    case types.DOCUMENTS_GET_FAILURE:
      return {
        documents: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const editDocument = (state = { error: null, loading: false }, action) => {
  switch (action.type) {
    case types.DOCUMENTS_UPDATE_REQUEST:
      return {
        error: null,
        loading: true,
      };
    case types.DOCUMENTS_UPDATE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case types.DOCUMENTS_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
