import reducer from '../../client/src/reducers/usersReducers';
import * as types from '../../client/src/actions/actionTypes';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      error: null,
      loading: false,
      searchFilter: '',
    });
  });

  it('should handle create user request', () => {
    const action = {
      type: types.USERS_ADD_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle create user success', () => {
    const state = {
      users: []
    };

    const user = {
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
      password: 'password'
    };

    const action = {
      type: types.USERS_ADD_SUCCESS,
      users: user
    };

    const expected = {
      users: [user],
      loading: false,
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

  it('should handle get user request', () => {
    const action = {
      type: types.USERS_GET_REQUEST
    };
    const expected = {
      users: null,
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle get users success', () => {
    const state = {
      users: [],
      error: null,
      loading: false,
      searchFilter: '',
    };

    const user = {
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName',
      email: 'email',
      password: 'password'
    };

    const action = {
      type: types.USERS_GET_SUCCESS,
      users: user
    };

    const expected = Object.assign({}, state, {
      users: [user]
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });
});
