import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Components/layout';
import HomePage from './Components/home/HomePage';
import AboutPage from './Components/about/AboutPage';
import DocumentViewContainer from './Components/document/documentViewContainer';
import SignUp from './Components/Auth/signup/SignupPage';
import Login from './Components/Auth/login/loginPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="documents" component={DocumentViewContainer} />
    <Route path="signup" component={SignUp} />
    <Route path="login" component={Login} />
  </Route>
);
