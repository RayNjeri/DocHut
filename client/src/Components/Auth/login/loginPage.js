import React from 'react';
import AppBar from 'material-ui/AppBar';

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
