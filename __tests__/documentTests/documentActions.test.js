import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/documentsAction';
import * as types from '../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions',()=>{
  it('should close document on close document',() => {
    const expectedAction={
      type:types.DOCUMENTS_REQUEST,
    };
    expect(actions.documentsRequest()).toEqual(expectedAction);
  });

  it('should add a document on document add request',() => {
    const expectedAction={
      type:types.DOCUMENTS_ADD_REQUEST
    };
  });

  it('should add a document on document add success',() => {
    const expectedAction={
      type:types.DOCUMENTS_ADD_SUCCESS
    };
  });

  it('should not add a document on document add failure',() => {
    const expectedAction={
      type:types.DOCUMENTS_ADD_FAILURE
    };
  });

  it('should get a document on document get request',() => {
    const expectedAction={
      type:types.DOCUMENTS_GET_REQUEST
    };
  });

  it('should get a document on document get success',() => {
    const expectedAction={
      type:types.DOCUMENTS_GET_SUCCESS
    };
  });

  it('should not get a document on document get success',() => {
    const expectedAction={
      type:types.DOCUMENTS_GET_FAILURE
    };
  });

  it('should update a document on document update success',() => {
    const expectedAction={
      type:types.DOCUMENTS_UPDATE_SUCCESS
    };
  });

  it('should not update a document on document update success',() => {
    const expectedAction={
      type:types.DOCUMENTS_UPDATE_FAILURE
    };
  });

  it('should delete a document on document delete success',() => {
    const expectedAction={
      type:types.DOCUMENTS_DELETE_SUCCESS
    };
  });

  it('should not delete a document on document delete failure',() => {
    const expectedAction={
      type:types.DOCUMENTS_DELETE_FAILURE
    };
  });

  it('should create a new Document on create document', ()=> {
    const response = {
      body: {
        title:'title',
        content:'content',
        access:'access',
      }
    };

    nock(/^.*$/)
      .post('/api/document')
      .reply(201, response.body);

    const expectedActions= [{
      type: types.DOCUMENTS_ADD_REQUEST,
      document: response.body
    }, {
      type: types.DOCUMENTS_ADD_SUCCESS,
      document: response.body,
    }];

    const store = mockStore({ document: [] });

    // return store.dispatch(actions.documentsAddRequest(response.body)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    // });
  });

});
