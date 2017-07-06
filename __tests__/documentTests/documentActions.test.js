import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/documentsAction';
import * as types from '../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should close document on close document', () => {
    const expectedAction = {
      type: types.DOCUMENTS_REQUEST,
    };
    expect(actions.documentsRequest()).toEqual(expectedAction);
  });

  it('should add a document on document add request', () => {
    const expectedAction = {
      type: types.DOCUMENTS_ADD_REQUEST
    };
    expect(actions.documentsAddRequest()).toEqual(expectedAction);
  });

  it('should add a document on document add success', () => {
    const expectedAction = {
      type: types.DOCUMENTS_ADD_SUCCESS
    };
    expect(actions.documentsAddSuccess()).toEqual(expectedAction);
  });

  it('should not add a document on document add failure', () => {
    const expectedAction = {
      type: types.DOCUMENTS_ADD_FAILURE
    };
    expect(actions.documentsAddFailure()).toEqual(expectedAction);
  });

  it('should get a document on document get request', () => {
    const expectedAction = {
      type: types.DOCUMENTS_GET_REQUEST
    };
    expect(actions.documentsGetRequest()).toEqual(expectedAction);
  });

  it('should get a document on document get success', () => {
    const expectedAction = {
      type: types.DOCUMENTS_GET_SUCCESS
    };
    expect(actions.documentsGetSuccess()).toEqual(expectedAction);
  });

  it('should not get a document on document get failure', () => {
    const expectedAction = {
      type: types.DOCUMENTS_GET_FAILURE
    };
    expect(actions.documentsGetFailure()).toEqual(expectedAction);
  });

  it('should update a document on document update success', () => {
    const expectedAction = {
      type: types.DOCUMENTS_UPDATE_SUCCESS
    };
    expect(actions.documentsUpdateSuccess()).toEqual(expectedAction);
  });

  it('should not update a document on document update success', () => {
    const expectedAction = {
      type: types.DOCUMENTS_UPDATE_FAILURE
    };
    expect(actions.documentsUpdateFailure()).toEqual(expectedAction);
  });

  it('should delete a document on document delete success', () => {
    const expectedAction = {
      type: types.DOCUMENTS_DELETE_SUCCESS
    };
    expect(actions.documentsDeleteSuccess()).toEqual(expectedAction);
  });

  it('should not delete a document on document delete failure', () => {
    const expectedAction = {
      type: types.DOCUMENTS_DELETE_FAILURE
    };
    expect(actions.documentsDeleteFailure()).toEqual(expectedAction);
  });

  it('should create a new Document on create document', () => {
    const response = {
      body: {
        title: 'title',
        content: 'content',
        access: 'access',
      }
    };

    nock(/^.*$/)
      .post('/api/document')
      .reply(201, response.body);

    const expectedActions = [{
      type: types.DOCUMENTS_ADD_REQUEST,
      documents: response.body
    }, {
      type: types.DOCUMENTS_ADD_SUCCESS,
      documents: response.body,
    }];

    const store = mockStore({ document: [] });

    return store.dispatch(actions.createDocument(response.body)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('should list all available documents', () => {
    const response = {
      body: {
        documents: []
      }
    };

    nock(/^.*$/)
      .get('/api/document')
      .reply(200, response.body);

    const expectedActions = [{
      type: types.DOCUMENTS_REQUEST
    }, {
      type: types.DOCUMENTS_SUCCESS,
      documents: response.body,
    }];

    const store = mockStore({});

    return store.dispatch(actions.listDocuments()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it('should update a document', () => {
    const editFields = {
      id:'1',
      title: 'New title',
      content: 'New content',
    };
    const response = {
      body: {
        id: 1,
        title: 'New title',
        content: 'New content',
        access: 'Private',
      }
    };
    nock(/^.*$/)
      .put('/api/document/' + editFields.id)
      .reply(201, response.body);
    const expectedActions = [{
      type: types.DOCUMENTS_UPDATE_REQUEST,
      documents: editFields
    }, {
      type: types.DOCUMENTS_UPDATE_SUCCESS,
      document: response.body,
    }];
    
    const store = mockStore({});

    return store.dispatch(actions.updateDocument(editFields)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  // it('should delete a document', () => {
  //   const response = {
  //     body: {
  //       documents: []
  //     }
  //   };

  //   nock(/^.*$/)
  //     .get('/api/document')
  //     .reply(200, response.body);

  //   const expectedActions = [{
  //     type: types.DOCUMENTS_DELETE_REQUEST
  //   }, {
  //     type: types.DOCUMENTS_DELETE_SUCCESS,
  //     documents: response.body,
  //   }];

  //   const store = mockStore({});

  //   return store.dispatch(actions.documentsDeleteSuccess()).then(() => {
  //     const actions = store.getActions();
  //     expect(actions).toEqual(expectedActions);
  //   });
  // });



});
