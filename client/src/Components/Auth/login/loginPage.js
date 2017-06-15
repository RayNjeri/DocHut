import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <center>
          <AppBar
            style={{ background: '#ac3b80' }}
            title="DocHut"
            showMenuIconButton={false}
          />
        </center>
        <LoginForm />
      </div>
    );
  }
}

