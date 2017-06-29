import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/layout';
import HomePage from './Components/home/HomePage';
import AboutPage from './Components/about/AboutPage';
import ownProfile from './Components/user/ownProfile';
import DocumentViewContainer from './Components/document/documentViewContainer';
import ProfilePageContainer from './Components/user/userProfile';
import SignUp from './Components/Auth/signup/SignupPage';
import Login from './Components/Auth/login/loginPage';
import ProfilePage from './Components/user/userProfilePage';
import content from './Components/common/content';
import { getUserFromToken } from './utils/tokenUtils';


function isAdmin() {
  console.log('Admin check function');
  let user = getUserFromToken();
  let role = user.roleId;
  console.log(user, role);
  if (role === 1) {
    return true;
  }
  return false;
  // Get the token from local storage
  // Decode the token - use your existing fucntions
  // That means we'll need user role in the token
  // Check whether role id is admin id
  // return true or false
}


function requireAuth(nextState, replace) {
  console.log('Admin check', isAdmin());
  if (!isAdmin()) {
    replace({
      //  Redirect to path of choice
      pathname: '/documents'
    });
  }
}


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="documents" component={DocumentViewContainer} />
    <Route path="signup" component={SignUp} />
    <Route path="login" component={Login} />
    <Route path="profile" component={ownProfile} />
    <Route path="users" onEnter={requireAuth} component={ProfilePageContainer} />
    <Route path="profile/:id" component={ProfilePageContainer} />
    <Route path="content" component={content} />
  </Route>
);


{/*<Route path="users" onEnter={requireAuth} component={ProfilePageContainer} />*/ }