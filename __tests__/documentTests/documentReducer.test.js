import reducer from '../../client/src/reducers/documentReducer';
import * as types from '../../client/src/actions/actionTypes';

describe('documentReducer',() => {
  it('should return the initial state',() => {
    expect(reducer(undefined,{})).toEqual({
      documents: [],
      error: null,
      loading: false,
      searchFilter: '',
    });
  });

  it('should handle create document request',() => {
    const action = {
      type: types.DOCUMENTS_ADD_REQUEST
    };
    const expected = {
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle create document success',() => {
    const state = {
      documents: []
    };

    const document = {
      title:'title',
      content:'content',
      access:'access',
    };

    const action = {
      type: types.DOCUMENTS_ADD_SUCCESS,
      documents: document
    };

    const expected = {
      documents: [document],
      loading: false,
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(expected);
  });

  it('should handle get document request',() => {
    const action = {
      type: types.DOCUMENTS_GET_REQUEST
    };
    const expected = {
      documents: null,
      error: null,
      loading: true
    };
    expect(reducer({}, action)).toEqual(expected);
  });

  it('should handle get documents success', () => {
    const state = {
      documents: [],
      error: null,
      loading: false,
      searchFilter: '',
    };

  const document = {
    title:'title',
    content:'content',
    access:'access',
  };

  const action = {
    type: types.DOCUMENTS_GET_SUCCESS,
    documents: document
  };

  const expected = Object.assign({}, state, {
    documents: [document]
  });

  const newState = reducer(state, action);
  expect(newState).toEqual(expected);
  });
});
