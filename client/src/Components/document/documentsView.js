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

    this.onContentChange = this.onContentChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onContentChange(event) {
    this.setState({
      document: {
        content: event.target.value
      }
    });
  }
  onClickSave() {
    this.props.dispatch(documentsAction.craeteDocument(this.state.document));
  }

  // eslint-disable-next-line class-methods-use-this
  documentRow(document, index) {
    return <div key={index}>{document.content}</div>;
  }

  render() {
    return (
      <div>
        <h1> Documents </h1>
        {this.props.documents.map(this.documentRow)}
        <h2> Create documents </h2>
        <input type="text" onChange={this.onContentChange} value={this.state.document.content} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents.documents
  };
}

Documents.propTypes = {
  dispatch: PropTypes.func.isRequired, documents: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Documents);
