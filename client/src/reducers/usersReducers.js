import * as types from '../actions/actionTypes';

const USER_LIST = {
  users: [],
  error: null,
  loading: false,
  searchFilter: ''
};

export default function reducer(state = USER_LIST, action) {
  switch (action.type) {
  case types.USERS_GET_SUCCESS:
    return Object.assign({}, state, {
      users: action.users,
      error: null,
      loading: true
    });
  case types.USERS_SUCCESS:
    return Object.assign({}, state, {
      users: action.users,
      error: null,
      loading: false
    });
  case types.USERS_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  case types.USERS_DELETE_SUCCESS:
    return Object.assign({}, state, {
      users: state.users.filter(id => id !== action.userId)
    });
  case types.USERS_UPDATE_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true
    });
  case types.USERS_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        ),
      error: null,
      loading: true
    });
  case types.USERS_UPDATE_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  case types.USERS_ADD_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true
    });
  case types.USERS_ADD_SUCCESS:
    return Object.assign({}, state, {
      users: [action.users, ...state.users],
      loading: false
    });

  case types.USERS_GET_FAILURE:
  case types.USERS_ADD_FAILURE:
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });

  case types.USERS_GET_REQUEST:
    return Object.assign({}, state, {
      error: null,
      loading: true
    });
  default:
    return state;
  }
}
