import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/layout';
import HomePage from './Components/home/HomePage';
import AboutPage from './Components/about/AboutPage';
import DocumentViewContainer from './Components/document/documentViewContainer';
import SignUp from './Components/Auth/signup/SignupPage';
import Login from './Components/Auth/login/loginPage';
import content from './Components/common/content';

function isAdmin() {
  // Get the token from local storage
  // Decode the token - use your existing fucntions
  // That means we'll need user role in the token
  // Check whether role id is admin id
  // return true or false
}


function requireAuth(nextState, replace) {
  if (!isAdmin()) {
    replace({
      //  Redirect to path of choice
      pathname: '/login'
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
    {/*<Route path="users" onEnter={requireAuth} component={users} />*/}
    <Route path="content" component={content} />
  </Route>
);
