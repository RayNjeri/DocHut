import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as authActions from '../../../actions/authActions';
import loginValidate from '../../../utils/loginValidation';
import content from '../../common/content';


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.authActions.login(this.state).then((res) => {
        this.context.router.push('/content');
      })
      .catch(err => {
        console.log("....", err);
        this.setState({ errors: err, isLoading: false })
      });
    }
  }

    /* eslint no-undef: "off"*/

  isValid() {
    const { errors, isValid } = loginValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors, email, password, isLoading } = this.state;


    return (

      <MuiThemeProvider>
        <center>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>

              {errors.message && <div className="alert alert-danger">{errors.message}</div>}

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

              <div className="button-line">
                <RaisedButton type="submit" disabled={isLoading} label="Log in" primary />
              </div>

              <CardText>{"Don't have an account?"}<Link to={'/signup'}>Register</Link>.</CardText>
            </form>
          </Card>
        </center>
      </MuiThemeProvider>
    );
  }
}

LoginForm.propTypes = {
  authActions: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(null, mapDispatchToProps)(LoginForm);

