import * as types from '../actions/actionTypes';

const ROLE_LIST = {
  roles: [],
  error: null,
  loading: false,
  searchFilter: '',
};

export default function reducer(state = ROLE_LIST, action) {
  switch (action.type) {
  case types.ROLES_GET_SUCCESS:
    return Object.assign({}, state, {
      roles: action.roles,
      error: null,
      loading: true,
    });
  case types.ROLES_SUCCESS:
    return Object.assign({}, state, {
      roles: action.roles,
      error: null,
      loading: false,
    });
  case types.ROLES_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  case types.ROLES_DELETE_SUCCESS:
    return Object.assign({}, state, {
      roles: state.roles.filter(id => id !== action.roleId),
    });
  case types.SET_ROLES_SEARCH_FILTER:
    return Object.assign({}, state, {
      searchFilter: action.searchFilter,
    });
  case types.ROLES_UPDATE_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true,
    });
  case types.ROLES_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      roles: state.roles.map(role => role.id === action.role.id ? action.role : role),
      error: null,
      loading: true,
    });
  case types.ROLES_UPDATE_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  case types.ROLES_ADD_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true,
    });
  case types.ROLES_ADD_SUCCESS:
    return Object.assign({}, state, {
      roles: [action.roles, ...state.roles],
      loading: false,
    });

  case types.ROLES_GET_FAILURE:
  case types.ROLES_ADD_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });

  case types.ROLES_GET_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true,
    });
  default:
    return state;
  }
}
