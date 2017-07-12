import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Link, IndexLink } from 'react-router';

const Header = () => (
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
        <Link to="/logout" activeClassName="active">Logout</Link>
        <Link to="/roles" activeClassName="active">Roles</Link>
        </AppBar>
    </nav>
);
export default Header;

