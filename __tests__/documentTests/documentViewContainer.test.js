import React from 'react';
import { mount, shallow, wrapper } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import { DocumentViewContainer } from '../../client/src/Components/document/documentViewContainer';

// function setItem() {
//   const props = {
//     createDocument: jest.fn()
//   };
//   const enzymeWrapper = mount(<DocumentViewContainer {...props}/>);
//   return {
//     props,
//     enzymeWrapper
//   };
// }

// describe('components', () => {
//   describe('DocumentViewContainer', () => {
//     it('should render self and subcomponents', () =>{
//       const { enzymeWrapper } = setItem();
//       expect(enzymeWrapper.find(DocumentViewContainer).hasClass(DocumentViewContainer)).toBe(true);
//     });
//   });
// });

describe('DocumentViewContainer component',() => {
  it('snapshot of the component', () =>{
    const props = {
      documentActions: {
        listDocuments() {}
      },
      documentList: {
        documents: []
      },
    }
    const component = shallow(<DocumentViewContainer {...props} />);
    const tree = shallowToJSON(component);
    expect(tree).toMatchSnapshot();
  });
});
