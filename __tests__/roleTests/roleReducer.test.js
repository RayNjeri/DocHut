import reducer from '../../client/src/reducers/roleReducer';
import * as types from '../../client/src/actions/actionTypes';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      roles: [],
      error: null,
      loading: false
    });
  });

  it('should handle create role request', () => {
    const action = {
      type: types.ROLES_ADD_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle create role success', () => {
    const state = {
      roles: []
    };

    const role = {
      roleName: 'roleName'
    };

    const action = {
      type: types.ROLES_ADD_SUCCESS,
      roles: role
    };

    const expected = {
      roles: [role],
      loading: false,
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

  it('should handle get role request', () => {
    const action = {
      type: types.ROLES_GET_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle get roles success', () => {
    const state = {
      roles: [],
      error: null,
      loading: true,
      searchFilter: '',
    };

    const role = {
      roleName: 'roleName'
    };

    const action = {
      type: types.ROLES_GET_SUCCESS,
      roles: [role]
    };

    const expected = Object.assign({}, state, {
      roles: [role]
    });

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

});
