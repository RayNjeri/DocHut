import React from 'react';
import { Link } from 'react-router';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1> DocHut </h1>
        <p>React Redux</p>
        <Link to="/about"> Learn More </Link>
      </div>

    );
  }
}

