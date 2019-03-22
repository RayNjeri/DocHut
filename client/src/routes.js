import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/layout';
import HomePage from './Components/home/HomePage';
import OwnProfile from './Components/user/ownProfile';
import DocumentViewContainer from './Components/document/documentViewContainer';
import ProfilePageContainer from './Components/user/userProfile';
import SignUp from './Components/Auth/signup/SignupPage';
import Login from './Components/Auth/login/loginPage';
import ProfilePage from './Components/user/userProfilePage';
import content from './Components/common/content';
import Roles from './Components/roles/roleViewContainer';
import { getUserFromToken } from './utils/tokenUtils';


function isAdmin() {
  let user = getUserFromToken();
  let role = user.roleId;
  if (role === 1) {
    return true;
  }
  return false;
}


function requireAuth(nextState, replace) {
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
    <Route path="documents" component={DocumentViewContainer} />
    <Route path="signup" component={SignUp} />
    <Route path="login" component={Login} />
    <Route path="profile" component={OwnProfile} />
    <Route path="users" onEnter={requireAuth} component={ProfilePageContainer} />
    <Route path="profile/:id" component={ProfilePageContainer} />
    <Route path="content" component={content} />
    <Route path="roles" component={Roles} />
  </Route>
);


