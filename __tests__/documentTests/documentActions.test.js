import * as actions from '../../client/src/actions/documentsAction';
import * as types from '../../client/src/actions/actionTypes';

describe('actions',()=>{
  it('should close document on close document',()=>{
    const expectedAction={
      type:types.DOCUMENTS_REQUEST,
    };
    expect(actions.documentsRequest()).toEqual(expectedAction);


  });
});
