import React from 'react';
import PropTypes from 'prop-types';
import {Link,IndexLink} from 'react-router';

const Header = ()=>{
  return(
    <nav>
      <IndexLink to='/' activeClassName='active'>Home</IndexLink>
      {' | '}
      <Link to='/client/src/Components/about' activeClassName='active'>About</Link>
      {' | '}
      <Link to='/client/src/Components/document' activeClassName='active'>Documents</Link>
      </nav>
  );
};
export default Header;


