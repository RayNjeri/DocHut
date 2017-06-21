import React from 'react';
import AppBar from 'material-ui/AppBar';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <center>
          <AppBar
            style={{ background: '#3bac95' }}
            title="DocHut"
            showMenuIconButton={false}
          />
        </center>
        <LoginForm />
      </div>
    );
  }
}
