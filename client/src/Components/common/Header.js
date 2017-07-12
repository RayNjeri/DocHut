import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Link, IndexLink } from 'react-router';
import jwtDecode from 'jwt-decode';
import * as authActions from '../../actions/authActions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    window.localStorage.removeItem('token');
  }
  render() {
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
    
        <Link to="/users" activeClassName="active">Users</Link>

        <Link to="/documents" activeClassName="active">Documents</Link>
        <Link to="/profile" activeClassName="active">Profile</Link>
        <Link to="/" activeClassName="active" onClick={this.logout} >Logout</Link>
        <Link to="/roles" activeClassName="active">Roles</Link>
        </AppBar>
    </nav>
    );
  }
 }
