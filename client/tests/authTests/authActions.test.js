import * as actions from '../../src/actions/authActions';
import * as types from '../../src/actions/actionTypes';

describe ('actions', () => {
  it ('should create an action to signup a user', () => {
    const text = "signUpUser";
    const expectedAction={
      type: types.SIGNUP_USER,
      text
    };
    expect(actions.signUpUser(text)).toEqual(expectedAction);
  });

  it('should create an action to Login a user',() => {
    const text ='LoginUser';
    const expectedAction={
      type:types.LOGIN_USER,
      text
    };
    expect(actions.LoginUser(text)).toEqual(expectedAction);
  });

  it('should create an action to log a user succesfully', () =>{
    const text ='loginSuccessful';
    const expectedAction={
      type:types.LOGIN_SUCCESS,
      text
    };
    expect(actions.loginSuccessful(text)).toEqual(expectedAction);
  });

  it('should craete an action on log in failure',() => {
    const text='loginFailed';
    const expectedAction={
      type:types.LOGIN_FAILURE,
      text
    };
    expect(actions.loginFailed(text)).toEqual(expectedAction);
  });

  it('should create an action to set the current user',() => {
    const text='setCurrentUser';
    const expectedAction={
      type:types.SET_CURRENT_USER,
      text
    };
    expect(actions.setCurrentUser(text)).toEqual(expectedAction);
  });

  it('should craete an action on user log out', () => {
    const text='logoutUser';
    const expectedAction={
      type:types.LOGOUT_USER,
      text
    };
    expect(actions.logoutUser(text)).toEqual(expectedAction);
  });

  it('should create an action on user successful log out',() => {
    const text='logoutSuccess';
    const expectedAction={
      type: types.LOGOUT_SUCCESS,
      text
    };
    expect(actions.logoutSuccess(text)).toEqual(expectedAction);
  });

  it('should create an action on log out failure',() => {
    const text ='logoutFailure';
    const expectedAction={
      type: types.LOGOUT_FAILURE,
      text
    };
    expectedAction(actions.logoutFailure(text)).toEqual(expectedAction);
  });
});
