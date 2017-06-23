import React from 'react';
import { mount, shallow, wrapper } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import DocumentViewContainer from '../../client/src/Components/document/documentViewContainer';

function setup() {
  const props = {
    createDocument: jest.fn()
  };
  const enzymeWrapper = mount(<DocumentViewContainer {...props}/>);
  return {
    props,
    enzymeWrapper
  };
}

describe('components', () => {
  describe('DocumentViewContainer', () => {
    it('should render self and subcomponents', () =>{
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find(DocumentViewContainer).hasClass(DocumentViewContainer)).toBe(true);
    });
  });
});

describe('DocumentViewContainer component',() => {
  it('snapshot of the component', () =>{
    const component = shallow(<DocumentViewContainer data ={[]}/>);
    const tree = shallowToJSON(component);
    expect(tree).toMatchSnapshot();
  });
});
