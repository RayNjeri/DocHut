import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../client/src/actions/authActions';
import * as types from '../../client/src/actions/actionTypes';
import * as endpoint from '../../client/src/API/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe ('actions', () => {
  it ('should create an action to signup a user', () => {
    const user = {
      firstName:"firstName",
      lastName:"lastName",
      userName:"userName",
      email:"email",
      password:"password"
    };
    const expectedAction={
      type: types.SIGNUP_USER,
      user
    };
    expect(actions.signUpUser(user)).toEqual(expectedAction);
  });

  it('should create an action to Login a user',() => {
    const user ={
      email:'email',
      password:'password'
    };
    const expectedAction={
      type:types.LOGIN_USER,
      user
    };
    expect(actions.LoginUser(user)).toEqual(expectedAction);
  });

  it('should create an action to log a user succesfully', () =>{
    const user ={
      email:'email',
      password:'password',
    };
    const expectedAction={
      type:types.LOGIN_SUCCESS,
      user,
      isFetching: false,
      isAuthenticated: true,
    };
    expect(actions.loginSuccessful(user)).toEqual(expectedAction);
  });

  it('should craete an action on log in failure',() => {
    const message = {text: 'login Failed'};
    const expectedAction = {
      type:types.LOGIN_FAILURE,
      message,
      isFetching: false,
      isAuthenticated: false,
    };
    expect(actions.loginFailed(message)).toEqual(expectedAction);
  });

  it('should create an action to set the current user',() => {
    const user='setCurrentUser';
    const expectedAction = {
      type:types.SET_CURRENT_USER,
      user
    };
    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });

  it('should create an action on user log out', () => {
    const expectedAction = {
      type:types.LOGOUT_USER,
    };
    expect(actions.logoutUser()).toEqual(expectedAction);
  });

  it('should create an action on user successful log out',() => {
    const expectedAction={
      type: types.LOGOUT_SUCCESS,
    };
    expect(actions.logoutSuccess()).toEqual(expectedAction);
  });

  it('should create an action on log out failure',() => {
    const message ='logoutFailure';
    const expectedAction={
      type: types.LOGOUT_FAILURE,
      message
    };
    expect(actions.logoutFailure(message)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a new user on user signUp', ()=> {
    const response = {
      body: {
        firstName:'firstName',
        lastName:'lastName',
        userName:'userName',
        email:'email',
        password:'password',
        token: 'asdjf'
      }
    };

    nock(/^.*$/)
      .post('/api/user')
      .reply(200, response.body);

    const expectedActions= [{
      type: types.SIGNUP_USER,
      user: response.body
    }, {
      type: types.LOGIN_SUCCESS,
      user: response.body,
      isFetching: false,
      isAuthenticated: true,
      token: response.body.token
    }];

    const store = mockStore({ user: [] });

    return store.dispatch(actions.userSignupRequest(response.body)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
