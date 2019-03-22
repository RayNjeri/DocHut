import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import {
  mountWithContext as mount,
  shallowWithContext as shallow
} from '../test-utils';

import { DocumentViewContainer } from '../../client/src/Components/document/documentViewContainer';

const constructProps = ({ documents = [] } = {}) => ({
  deleteDocument() { },
  router: {},
  documentActions: {
    listDocuments() { }
  },
  documentList: {
    documents
  },
});

const constructWrapper = props => shallow(<DocumentViewContainer {...props} />);

describe('DocumentViewContainer component', () => {
  it('renders correctly', () => {
    const wrapper = constructWrapper(constructProps());
    expect(
      wrapper.props().className
    ).toBe('container');
  });

  it('should have a dialog container', () => {
    const wrapper = constructWrapper(constructProps());
    expect(
      wrapper.find('Dialog').length
    ).toEqual(1);
  });

  it('should have matching snapshot', () => {
    const wrapper = constructWrapper(constructProps());
    const tree = shallowToJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('handleOpen opens the modal', () => {
    const props = constructProps();
    const wrapper = constructWrapper(props);

    let state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);

    const button = wrapper.find('FloatingActionButton').first();
    button.simulate('click');

    state = wrapper.state();
    expect(state.open).toBe(true);
    expect(wrapper.find('Dialog').props().open).toBe(true);
  });


  it('handleClose closes the modal', () => {
    const props = constructProps();
    const wrapper = constructWrapper(props);

    let state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);

    const button = wrapper.find('FlatButton').first();
    button.simulate('click');

    state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });
});
