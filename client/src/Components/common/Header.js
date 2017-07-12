import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Link, IndexLink } from 'react-router';
import * as authActions from '../../actions/authActions';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    window.localStorage.removeItem('token');
  }
  render() {
    const { user, isAuthenticated } = this.props;
    const isAdmin = user.roleId === 1;
    return (
    <nav>
          <AppBar
            className="navbar"
            style={{ background: '#3bac95' }}
            titleStyle={{ flex: "none"}}
            title="DocHut"
            showMenuIconButton={false}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          >
         <IndexLink to="/" activeClassName="active">Home</IndexLink>
    
        {isAdmin && <Link to="/users" activeClassName="active">Users</Link>}
        {isAdmin && <Link to="/roles" activeClassName="active">Roles</Link>}
        {isAuthenticated && (
          <span>
            <Link to="/documents" activeClassName="active">Documents</Link>
            <Link to="/profile" activeClassName="active">Profile</Link>
            <Link to="/" activeClassName="active" onClick={this.logout} >Logout</Link>
          </span>
        )}
        </AppBar>
    </nav>
    );
  }
 }

export default connect(
    state => {
      const { authReducer: { isAuthenticated, user = {} } } = state;
      return { user };
    }
)(Header);