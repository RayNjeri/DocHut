import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './Components/layout';
import HomePage from './Components/home/HomePage';
import AboutPage from './Components/about/AboutPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='about' component={AboutPage} />
  </Route>
);
