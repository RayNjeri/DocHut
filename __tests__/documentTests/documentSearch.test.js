import React from 'react';
import configureStore from 'redux-mock-store';
import shallowToJSON from 'enzyme-to-json';
import sinon from 'sinon';
import {
  mountWithContext as mount,
  shallowWithContext as shallow
} from '../test-utils';
import ConnectedDocumentSearch, {DocumentSearch} from '../../client/src/Components/document/documentSearch';

const constructProps = ({ documents = [] } = {}) => ({
  searchDocument() { },
  router: {},
  documentActions: {
    searchDocument() { }
  },
  documentList: {
    documents
  },
});

const constructWrapper = props => shallow(<DocumentSearch {...props} />);

describe('DocumentSearch component', () => {

  let wrapper, sandbox;
  const props = {
    actions: {
      searchDocument: jest.fn()
    }
  };

  beforeEach(()=>{
    sandbox = sinon.sandbox.create();
    sandbox.spy(DocumentSearch.prototype, 'handleSearchInput');
    wrapper = shallow(<DocumentSearch {...props} /> );  
  }),
  afterEach(() => {
    sandbox.restore();
  });

  it('renders correctly', () => {
    expect(
      wrapper.props().className
    ).toBe('search-wrapper card');
  });
  it('handles input changes correctly', () => {
    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'sample document',
      }
    });
    expect(DocumentSearch.prototype.handleSearchInput.calledOnce).toBe(true);
    expect(props.actions.searchDocument).toBeCalled();
    expect(wrapper.state().searchFilter).toBe('sample document');
  });
});