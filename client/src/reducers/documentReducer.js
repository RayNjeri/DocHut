import * as types from '../actions/actionTypes';

const DOCUMENT_LIST = {
  documents: [],
  error: null,
  loading: false,
  searchFilter: '',
};

export default function reducer(state = DOCUMENT_LIST, action) {
  switch (action.type) {
    case types.DOCUMENTS_GET_SUCCESS:
      return Object.assign({}, state, {
        documents: [...state.documents, action.documents],
        error: null,
        loading: false,
      });
    case types.DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        documents: action.documents,
        error: null,
        loading: false,
      });
    case types.DOCUMENTS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    case types.DOCUMENTS_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });
    case types.SET_DOCUMENTS_SEARCH_FILTER:
      return Object.assign({}, state, {
        searchFilter: action.searchFilter,
      });
    case types.DOCUMENTS_UPDATE_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case types.DOCUMENTS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => doc.id === action.document.id ? action.document : doc),
        error: null,
        loading: true,
      });
    case types.DOCUMENTS_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case types.DOCUMENTS_ADD_REQUEST:
      return Object.assign({}, state, {
        error: null,
        loading: true,
      });
    case types.DOCUMENTS_ADD_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.documents,
          ...state.documents],
        loading: false,
      });

    case types.DOCUMENTS_GET_FAILURE:
    case types.DOCUMENTS_ADD_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case types.DOCUMENTS_GET_REQUEST:
      return {
        documents: null,
        error: null,
        loading: true,
      };
    default:
      return state;
  }
}
