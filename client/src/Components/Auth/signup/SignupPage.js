import React from 'react';
import AppBar from 'material-ui/AppBar';
import SignUpForm from './SignupForm';
import { userSignupRequest } from '../../../actions/authActions';


export default class SignUpPage extends React.Component {
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
        <SignUpForm />
      </div>
    );
  }
}

