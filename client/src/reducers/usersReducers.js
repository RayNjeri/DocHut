import * as types from '../actions/actionTypes';

const USERS_LIST = {
  users: [],
  error: null,
  loading: false,
  searchFilter: '',
};

export const usersList = (state = USER_LIST, action) => {
  switch (action.type) {
    case types.USER_REQUEST:
      return Object.assign({}, state, {
        users: [],
        error: null,
        loading: true,
      });
    case actionTypes.USER_SUCCESS:
    return Object.assign({}, state,{
      users:action.users,
      error:null,
      loading:false,
    });
    case actionTypes.USER_FAILURE:
    return Object.assign({}, state,{
      users:[],
      error:action.error,
      loading:false,
    });
    case actionTypes.USER_ADD_SUCCESS:
    return Object.assign({}, state,{
      users:[action.users,
      ...state.users],
    });
    case actionTypes.USER_DELETE_SUCCESS:
    return Object.assign({}, state,{
      users:state.users.filter(id => id! ==action.userId),
    });
    case actionTypes.SET_USER_SEARCH_FILTER:
    return Object.assign({}, state,{
      searchFilter:searchFilter(state.searchFilter,action),
    });
    default:
    return state
  }
};

export const addUser = (state = { error: null, loading: false, user: null }, action) => {
  switch (action.type) {
    case types.USER_ADD_REQUEST:
      return {
        error: null,
        loading: true,
        users: null,
      };
    case types.USER_ADD_SUCCESS:
      return {
        error: null,
        loading: false,
        users: action.users,
      };
    case types.USER_ADD_FAILURE:
      return {
        error: action.error,
        loading: false,
        users: null,
      };
    default:
      return state;
  }
};

export const userPage = (state = { users: null, error: null, loading: false }, action) => {
  switch (action.type) {
    case types.USER_GET_REQUEST:
      return {
        users: null,
        error: null,
        loading: true,
      };
    case types.USER_GET_SUCCESS:
      return {
        users: action.response.result,
        error: null,
        loading: false,
      };
    case types.USER_GET_FAILURE:
      return {
        users: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const editUser = (state = { error: null, loading: false }, action) => {
  switch (action.type) {
    case types.USER_UPDATE_REQUEST:
      return {
        error: null,
        loading: true,
      };
    case types.USER_UPDATE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case types.USER_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
