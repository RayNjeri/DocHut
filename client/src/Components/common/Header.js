import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {' | '}
    <Link to="/about" activeClassName="active">About</Link>
    {' | '}
    <Link to="/document" activeClassName="active">Documents</Link>
  </nav>
);
export default Header;

