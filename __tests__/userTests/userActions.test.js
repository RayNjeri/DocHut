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
    expect(actions.usersAddRequest()).toEqual(expectedAction);
  });

  it('should add a user on user add success', () => {
    const expectedAction = {
      type: types.USERS_ADD_SUCCESS
    };
    expect(actions.usersAddSuccess()).toEqual(expectedAction);
  });

  it('should not add a user on user add failure', () => {
    const expectedAction = {
      type: types.USERS_ADD_FAILURE
    };
    expect(actions.usersAddFailure()).toEqual(expectedAction);
  });

  it('should get a user on user get request', () => {
    const expectedAction = {
      type: types.USERS_GET_REQUEST
    };
    expect(actions.usersGetRequest()).toEqual(expectedAction);
  });

  it('should get a user on user get success', () => {
    const expectedAction = {
      type: types.USERS_GET_SUCCESS
    };
    expect(actions.usersGetSuccess()).toEqual(expectedAction);
  });

  it('should not get a user on user get success', () => {
    const expectedAction = {
      type: types.USERS_GET_FAILURE
    };
    expect(actions.usersGetFailure()).toEqual(expectedAction);
  });

  it('should update a user on user update success', () => {
    const expectedAction = {
      type: types.USERS_UPDATE_SUCCESS
    };
    expect(actions.usersUpdateSuccess()).toEqual(expectedAction);
  });

  it('should not update a user on user update failure', () => {
    const expectedAction = {
      type: types.USERS_UPDATE_FAILURE
    };
    expect(actions.usersUpdateFailure()).toEqual(expectedAction);
  });

  it('should delete a user on user delete success', () => {
    const expectedAction = {
      type: types.USERS_DELETE_SUCCESS
    };
    expect(actions.usersDeleteSuccess()).toEqual(expectedAction);
  });

  it('should not delete a user on user delete failure', () => {
    const expectedAction = {
      type: types.USERS_DELETE_FAILURE
    };
    // expect(actions.usersRequest()).toEqual(expectedAction);
  });
});