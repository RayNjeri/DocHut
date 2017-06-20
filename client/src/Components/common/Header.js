import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {' | '}
    <Link to="/about" activeClassName="active">About</Link>
    {' | '}
    <Link to="/documents" activeClassName="active">Documents</Link>
    {' | '}
    {/*<Link to="/login" activeClassName="active">LogIn</Link>
    {' | '}
    <Link to="/signup" activeClassName="active">Sign Up</Link>
    {' | '}*/}
  </nav>
);
export default Header;

