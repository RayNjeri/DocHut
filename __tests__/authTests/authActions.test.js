import * as actions from '../../client/src/actions/authActions';
import * as types from '../../client/src/actions/actionTypes';

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
      password:'password'
    };
    const expectedAction={
      type:types.LOGIN_SUCCESS,
      user
    };
    expect(actions.loginSuccessful(user)).toEqual(expectedAction);
  });

  it('should craete an action on log in failure',() => {
    const message='login Failed';
    const expectedAction={
      type:types.LOGIN_FAILURE,
      message
    };
    expect(actions.loginFailed(message)).toEqual(expectedAction);
  });

  it('should create an action to set the current user',() => {
    const user='setCurrentUser';
    const expectedAction={
      type:types.SET_CURRENT_USER,
      user
    };
    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });

  it('should create an action on user log out', () => {
    const expectedAction={
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
    expectedAction(actions.logoutFailure(message)).toEqual(expectedAction);
  });
});
