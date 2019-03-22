import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LoginPage from '../Auth/login/loginPage';


const HomePage = () => (
  <div>
    <center>
      <LoginPage />
    </center>
  </div>
);
export default HomePage;
