import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './common/Header';
import { getUser } from '../actions/userActions';
import { loginSuccessful } from '../actions/authActions';
import { getUserFromToken } from '../utils/tokenUtils';

export class App extends React.Component {
  componentDidMount() {
    const { authReducer, dispatch } = this.props;
    if (authReducer.isAuthenticated && !authReducer.user) {
      const user = getUserFromToken();
      getUser(user.userId)(dispatch)
        .then(({ body }) => dispatch(loginSuccessful({ user: body })));
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = { children: PropTypes.object.isRequired };

export default connect(
  ({ authReducer }) => ({ authReducer })
)(App);