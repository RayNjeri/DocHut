import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentsAction';


class DocumentSearch extends React.Component {
  constructor(props, context) {
    super(props);
    this.searchDocument = this.searchDocument.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  searchDocument(searchFilter) {
    this.props.actions.searchDocument(searchFilter);
  }
  handleSearchInput(e) {
    this.setState({ searchFilter: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.searchDocument(this.state.searchFilter);
  }
  render() {
    return (
      <div className="search-wrapper card" style={{ marginLeft: '80%' }}>
        <input
          id="search"
          onChange={this.handleSearchInput}
        />
        {/*<a
          className="btn-floating btn-large waves-effect waves-light red">*/}
        <i className="material-icons" onClick={(this.onSubmit)} >search</i>
      </div>

    );
  }
}
// Props validation
DocumentSearch.propTypes = {
  actions: PropTypes.object.isRequired
};

// const mapStateToProps = (state, ownProps) => ({ searchFilter: state.searchFilter });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});
export default connect(null, mapDispatchToProps)(DocumentSearch);