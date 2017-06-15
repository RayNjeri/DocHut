import React from 'react';
import PropTypes from 'prop-types';

export default class Documents extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state={
      document:{content:null}
    };
  }

  onContentChange(event){
    const content = this.state.content;
    document.content = event.target.value;
    this.setState({content: content});
  }

  render(){
    return(
      <div>
        <h1> Documents </h1>
        <h2> Create documents </h2>
        <input type ='text' Onchange={this.onContentChange} value={this.state.document.content}/>
        <input type='submit' value= 'Save' onClick={this.onClickSave}/>
      </div>

        );
  }
}
