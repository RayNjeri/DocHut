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

    const expected = Object.assign({}, state, {
      users: [user],
      loading: false,
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

  it('should handle get user request', () => {
    const action = {
      type: types.USERS_GET_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle get users success', () => {
    const state = {
      users: [],
      error: null,
      loading: true,
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
      users: [user]
    };

    const expected = Object.assign({}, state, {
      users: [user]
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

  it('should handle update user request', () => {
    const action = {
      type: types.USERS_UPDATE_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle update user success', () => {
    const oldUser = {
      id: 1,
      firstName: 'FirstName',
      lastName: 'LastName',
      userName: 'UserName',
      email: 'Email',
      password: 'Password'
    };

    const state = {
      error: null,
      users: [oldUser],
      loading: false
    };
    
    const newUser = {
      id: 1,
      firstName: 'newFirstName',
      lastName: 'newLastName',
      userName: 'newUserName',
      email: 'newEmail',
      password: 'newPassword'
    };

    const action = {
      type: types.USERS_UPDATE_SUCCESS,
      user: newUser
    };

    const expected = Object.assign({}, state, {
      users: [newUser],
      loading: true,
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });
});
