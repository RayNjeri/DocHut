import React from 'react';
import { mount, shallow, wrapper } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import DocumentViewContainer from '../../client/src/Components/document/documentViewContainer';

describe('DocumentViewContainer component',() => {
  it('snapshot of the component', () =>{
    const component = shallow(<DocumentViewContainer data ={[]}/>);
    const tree = shallowToJSON(component);
    expect(tree).toMatchSnapshot();
  } );
});
