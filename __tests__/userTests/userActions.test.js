import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/userActions';
import * as types from '../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should close user on close user', () => {
    const expectedAction = {
      type: types.USERS_REQUEST,
    };
    expect(actions.usersRequest()).toEqual(expectedAction);
  });

  it('should add a user on user add request', () => {
    const expectedAction = {
      type: types.USERS_ADD_REQUEST
    };
  });

  it('should add a user on user add success', () => {
    const expectedAction = {
      type: types.USERS_ADD_SUCCESS
    };
  });

  it('should not add a user on user add failure', () => {
    const expectedAction = {
      type: types.USERS_ADD_FAILURE
    };
  });

  it('should get a user on user get request', () => {
    const expectedAction = {
      type: types.USERS_GET_REQUEST
    };
  });

  it('should get a user on user get success', () => {
    const expectedAction = {
      type: types.USERS_GET_SUCCESS
    };
  });

  it('should not get a user on user get success', () => {
    const expectedAction = {
      type: types.USERS_GET_FAILURE
    };
  });

  it('should update a user on user update success', () => {
    const expectedAction = {
      type: types.USERS_UPDATE_SUCCESS
    };
  });

  it('should not update a user on user update success', () => {
    const expectedAction = {
      type: types.USERS_UPDATE_FAILURE
    };
  });

  it('should delete a user on user delete success', () => {
    const expectedAction = {
      type: types.USERS_DELETE_SUCCESS
    };
  });

  it('should not delete a user on user delete failure', () => {
    const expectedAction = {
      type: types.USERS_DELETE_FAILURE
    };
  });
});