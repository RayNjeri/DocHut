import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as documentActions from '../../actions/documentsAction';
import Snackbar from 'material-ui/Snackbar';
import DocumentView from './documentsView';
import CreateDocument from './documentCreateForm';
import DocumentEditForm from './documentEditForm';
import DocumentSearch from './documentSearch';

const style = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  marginRight: 20
};

export class DocumentViewContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      activePage: 1,
      limit: 3,
      offset: 0,
      document: {
        title: '',
        content: '',
        access: '',
        snackBarOpen: false
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  componentWillMount() {
    this.props.documentActions.listDocuments(
      this.state.limit,
      this.state.offset
    );
  }
  onSetAccess(value) {
    const Document = this.state.document;
    Document.access = value;
    this.setState({ document: Document });
  }
  onTitleChange(event) {
    const Document = this.state.document;
    Document.title = event.target.value;
    this.setState({ document: Document });
  }
  onContentChange(event) {
    const Document = this.state.document;
    Document.content = event.target.value;
    this.setState({ document: Document });
  }

  handleOpen() {
    this.setState({ open: true, document: {} });
  }

  handleClose() {
    this.setState({ open: false, edit: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      document: Object.assign({}, this.state.document, {
        [name]: value
      })
    });
  }

  updateDocument(document) {
    return () => {
      this.setState({
        document,
        edit: true,
        open: true
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.edit
      ? this.props.documentActions.updateDocument(this.state.document)
      : this.props.documentActions.createDocument(this.state.document);

    this.setState({ snackBarOpen: true });
    this.handleClose();
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.documentActions.listDocuments(
      this.state.limit,
      this.state.limit * (pageNumber - 1)
    );
  }

  closeSnackBar() {
    this.setState({ snackBarOpen: false });
  }

  render() {
    const viewActions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />
    ];
    return (
      <div className="container">
        <div className="documents">
          <h1>Documents</h1>
          <DocumentSearch />
          {this.props.documentList.documents.map(document => (
            <DocumentView
              key={document.id}
              document={document}
              onUpdate={this.updateDocument(document)}
              deleteDocument={this.props.documentActions.deleteDocument}
              listDocuments={this.props.documentActions.listDocuments}
            />
          ))}
          <div className="paginitaion">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={10}
              pageRangeDisplayed={3}
              onChange={this.handlePageChange}
            />
          </div>
          <div>
            <FloatingActionButton
              onClick={this.handleOpen}
              backgroundColor="#123c69"
              style={style}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <br />
        <Dialog
          title="Create a new Document"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.edit ? (
            <DocumentEditForm
              document={this.state.document}
              onChange={this.handleChange}
            />
          ) : (
            <CreateDocument
              style={style}
              onSetAccess={this.onSetAccess}
              document={this.state.document}
              onTitleChange={this.onTitleChange}
              onContentChange={this.onContentChange}
            />
          )}
        </Dialog>
        <Snackbar
          open={this.state.snackBarOpen}
          message="Document Saved"
          autoHideDuration={2000}
          onRequestClose={this.closeSnackBar}
        />
      </div>
    );
  }
}
DocumentViewContainer.propTypes = {
  documentList: PropTypes.object.isRequired,
  documentActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documentList: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    documentActions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentViewContainer);
