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

  it('should handle create document',() => {
    expect(
      reducer([],{
        type:types.DOCUMENTS_ADD_REQUEST,
        document:{
          title:'title',
          content:'content',
          access:'access',
        }
      }).toEqual({
        document:{
          title:'title',
          content:'content',
          access:'access',
        }
      })
    );
  });
});
