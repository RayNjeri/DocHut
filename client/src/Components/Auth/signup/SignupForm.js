import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import validateInput from '../../../utils/signupValidate';
import { userSignupRequest } from '../../../actions/authActions';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
      invalid: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          browserHistory.push('/documents');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <MuiThemeProvider>
        <center>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Sign Up</h2>

              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}

              <div className="field-line">
                <TextField
                  floatingLabelText="First Name"
                  name="firstName"
                  errorText={errors.firstName}
                  onChange={this.onChange}
                  value={this.state.fName}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Last Name"
                  name="lastName"
                  errorText={errors.lastName}
                  onChange={this.onChange}
                  value={this.state.lName}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Username"
                  name="userName"
                  errorText={errors.userName}
                  onChange={this.onChange}
                  value={this.state.userName}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  errorText={errors.email}
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  errorText={errors.password}
                  value={this.state.password}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.onChange}
                  errorText={errors.confirmPassword}
                  value={this.state.confirmPassword}
                />
              </div>

              <div className="button-line">
                <RaisedButton
                  type="submit"
                  label="Create New Account"
                  primary
                />
              </div>

              <CardText>
                Already have an account? <Link to={'/login'}>Log in</Link>
              </CardText>
            </form>
          </Card>
        </center>
      </MuiThemeProvider>
    );
  }
}

SignUpForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { userSignupRequest })(SignUpForm);
