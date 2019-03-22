import React from 'react';
import { mount, shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import * as actions from '../../client/src/actions/authActions';
import * as types from '../../client/src/actions/actionTypes';
import ConnectedHeader, {Header} from '../../client/src/Components/common/Header';

describe('Header Component unauthenticated', () => {

  const initialState = { authReducer: { user: {}, isAuthenticated: false }};
  const mockStore = configureStore();
  let store,container,isAunthenticated,roleId, headerWrapper;

  beforeEach(()=>{
    const props = {
      user: {},
      isAuthenticated: false
    }
    store = mockStore(initialState);
    headerWrapper = shallow(<Header {...props} /> );  
  }),

  it('Should render the header component', () => {
    const tree = shallowToJSON(headerWrapper);
    expect(tree).toMatchSnapshot();
  });
});

describe('Header Component authenticated', () => {

  const user = {
    createdAt: "2017-07-10T17:08:22.941Z",
    documents: [
      {
        access: "public",
        content: "fdvfdsvsg",
        createdAt:"2017-07-13T16:35:41.850Z",
        id: 15,
        roleId: 1,
        title: "fefsdfvfds",
        updatedAt:"2017-07-13T16:35:41.850Z",
        userId: 3
      }
    ],
    email: "ray@gmail.com",
    firstName: "Rachael",
    id: 3,
    lastName: "Njeri",
    password: "$2a$10$yimKcc5xy.4YvulsFdC/pO2IADJKLHOZgZGwggtDxliQbL0K4HY5S",
    roleId: 1,
    updatedAt: "2017-07-13T06:30:25.765Z",
    userName: "Rachael",
      
  }
  let store,container,isAunthenticated,roleId, headerWrapper;

  beforeEach(()=>{
    const props = {
      user: user,
      isAuthenticated: true
    }
    headerWrapper = shallow(<Header {...props} /> );  
  }),

  it('Should render the header component with user authenticated', () => {
    const tree = shallowToJSON(headerWrapper);
    expect(tree).toMatchSnapshot();
  });
});