import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Header = () => (
    <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {' | '}
        <Link to="/users" activeClassName="active">Users</Link>

    </nav>
);
export default Header;

