import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as documentActions from '../../actions/documentsAction';

export class DocumentSearch extends React.Component {
  constructor(props, context) {
    super(props);
    this.searchDocument = this.searchDocument.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.makeSearch = _.debounce(this.apiCall, 500);
  }
  searchDocument(searchFilter) {
    this.props.actions.searchDocument(searchFilter);
  }

  apiCall() {
    this.props.actions.searchDocument(this.state.searchFilter);
  }
  handleSearchInput(e) {
    this.setState({ searchFilter: e.target.value });
    this.makeSearch();
  }

  render() {
    return (
      <div className="search-wrapper card" style={{ marginLeft: '80%' }}>
        <input id="search" onChange={this.handleSearchInput} />
        <i className="material-icons">search</i>
      </div>
    );
  }
}
DocumentSearch.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(
  null,
  mapDispatchToProps
)(DocumentSearch);
