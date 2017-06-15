import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as documentsAction from '../../actions/documentsAction';

export class Documents extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: { content: '' }
    };

    this.onContentChange = this.OnContentChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onContentChange(event) {
    const content = this.state.content;
    document.content = event.target.value;
    this.setState({ content });
  }
  onClickSave() {
    this.props.dispatch(documentsAction.craeteDocument(this.state.document));
  }

  documentRow(document, index) {
    return <div key={index}>{document.content}</div>;
  }

  render() {
    return (
      <div>
        <h1> Documents </h1>
        {this.props.documents.map(this.documentRow)}
        <h2> Create documents </h2>
        <input type="text" Onchange={this.onContentChange} value={this.state.document.content} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents
  };
}

export default connect(mapStateToProps)(Documents);
