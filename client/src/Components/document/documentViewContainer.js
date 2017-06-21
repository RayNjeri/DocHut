import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as documentActions from '../../actions/documentsAction';
import DocumentView from './documentsView';
import DocumentList from './documentList';
import CreateDocument from './documentCreateForm';


const style = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    marginRight: 20,
};

class DocumentViewContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            document: {
                title: '',
                content: '',
                access: ''
            }
        };
        // const token = window.localStorage.getItem('token');
        // const userId = JWTDecode.decode(token)["userId"];
        // console.log(userId);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSetAccess = this.onSetAccess.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
    }
    componentWillMount() {
        this.props.documentActions.listDocuments();
    }
    onSetAccess(e, index, value) {
        const Document = this.state.document;
        Document.access = value;
        this.setState({ document: Document });
    }
    onTitleChange(e) {
        const Document = this.state.document;
        Document.title = e.target.value;
        this.setState({ document: Document });
    }
    onContentChange(e) {
        const Document = this.state.document;
        Document.content = e.target.value;
        this.setState({ document: Document });
    }
    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    updateDocument(document) {
        documentsUpdateRequest(document);
        browserHistory.push('/edit');
    }

    render() {
        const viewActions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={(e) => {
                    e.preventDefault();
                    this.props.documentActions.createDocument(this.state.document);
                    {/*console.log("documents", this.props.listDocuments());*/}
                    this.handleClose();
                }}
            />,
        ];
        // console.log("props", this.props.documentActions.listDocuments());
        return (
            <div className="container">
                <div>
                    {this.props.documentList.documents.map(document =>
                        (<DocumentView
                            key={document.id}
                            document={document}
                            onUpdate={this.props.documentActions.updateDocument}
                            deleteDocument={this.props.documentActions.deleteDocument}
                            listDocuments={this.props.documentActions.listDocuments}
                        />)
                    )}
                    <div>
                        <FloatingActionButton onClick={this.handleOpen} backgroundColor="#123c69" style={style}>
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
                    <CreateDocument
                        style={style}
                        onSetAccess={this.onSetAccess}
                        document={this.state.document}
                        onTitleChange={this.onTitleChange}
                        onContentChange={this.onContentChange}
                    />

                </Dialog>
            </div>
        );
    }
}
// DocumentViewContainer.PropTypes = {
//     documentList: PropTypes.object.isRequired,
//     deleteDocument: PropTypes.func.isRequired,
//     listDocuments: PropTypes.func.isRequired,
//     actions: PropTypes.object.isRequired,
//     router: PropTypes.object.isRequired
// };

DocumentViewContainer.contextTypes = {
    router: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewContainer);
