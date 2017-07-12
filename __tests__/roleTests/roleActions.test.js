import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/roleActions';
import * as types from '../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should close role on close rolre', () => {
    const expectedAction = {
      type: types.ROLES_REQUEST,
    };
    expect(actions.rolesRequest()).toEqual(expectedAction);
  });

  it('should add a role on role add request', () => {
    const expectedAction = {
      type: types.ROLES_ADD_REQUEST
    };
    expect(actions.rolesAddRequest()).toEqual(expectedAction);
  });

  it('should add a role on role add success', () => {
    const expectedAction = {
      type: types.ROLES_ADD_SUCCESS
    };
    expect(actions.rolesAddSuccess()).toEqual(expectedAction);
  });

  it('should not add a role on role add failure', () => {
    const expectedAction = {
      type: types.ROLES_ADD_FAILURE
    };
    expect(actions.rolesAddFailure()).toEqual(expectedAction);
  });

  it('should get a role on role get request', () => {
    const expectedAction = {
      type: types.ROLES_GET_REQUEST
    };
    expect(actions.rolesGetRequest()).toEqual(expectedAction);
  });

  it('should get a role on role get success', () => {
    const expectedAction = {
      type: types.ROLES_GET_SUCCESS
    };
    expect(actions.rolesGetSuccess()).toEqual(expectedAction);
  });

  it('should not get a role on role get success', () => {
    const expectedAction = {
      type: types.ROLES_GET_FAILURE
    };
    expect(actions.rolesGetFailure()).toEqual(expectedAction);
  });

  it('should update a role on role update success', () => {
    const expectedAction = {
      type: types.ROLES_UPDATE_SUCCESS
    };
    expect(actions.rolesUpdateSuccess()).toEqual(expectedAction);
  });

  it('should not update a role on role update failure', () => {
    const expectedAction = {
      type: types.ROLES_UPDATE_FAILURE
    };
    expect(actions.rolesUpdateFailure()).toEqual(expectedAction);
  });

  it('should delete a role on role delete success', () => {
    const expectedAction = {
      type: types.ROLES_DELETE_SUCCESS
    };
    expect(actions.rolesDeleteSuccess()).toEqual(expectedAction);
  });

  it('should not delete a role on role delete failure', () => {
    const expectedAction = {
      type: types.ROLES_DELETE_FAILURE
    };
  });

  it('should list all available roles', () => {
    const response = {
      body: {
        roles: []
      }
    };

    nock(/^.*$/)
      .get('/api/roles')
      .reply(200, response.body);

    const expectedActions = [{
      type: types.ROLES_REQUEST
    }, {
      type: types.ROLES_SUCCESS,
      roles: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.listroles()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });


  
});