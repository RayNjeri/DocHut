import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  render(){
    return(
      <div className ='app'>
        <p>Header here...</p>
        {this.props.children}
        </div>
    );
  }
}

App.propTypes ={children: PropTypes.object.isRequired};
