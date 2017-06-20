import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import documentActions from '../../actions/documentsAction';
import { updateDocument, deleteDocument, listDocuments } from '../../actions/documentsAction';
import EditDocument from './documentForm';

class EditDocumentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            document: {
                id: props.document.id,
                title: props.document.title,
                content: props.document.content,
                access: props.document.access
            }
        };
        this.state.open = true;
        this.onSubmit = this.onSubmit.bind(this);
        this.updateDocument = this.updateDoc.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    updateDocument(e) {
        const field = e.target.name;
        const Document = this.state.document;
        document[field] = e.target.value;
        return this.setState({ document: Document });
    }

    onSubmit() {
        this.props.updateDocument(this.state.document);
        this.context.router.push('/documentView');
        this.setState({ open: false });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title="Edit Document"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div>
                    <EditDocument
                        id={this.props.document.id}
                        title={this.props.document.title}
                        content={this.props.document.content}
                        access={this.props.document.access}
                        onSubmit={this.onSubmit}
                        onChange={this.updateDocument}
                    />
                </div>
            </Dialog>
        );
    }
}

EditDocumentContainer.PropTypes = {
    updateDocument: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    listDocuments: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired
};

EditDocumentContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    document: state.document
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(documentActions, dispatch)
    };
}

export default connect(mapStateToProps, { updateDocument, deleteDocument, listDocuments })(EditDocumentContainer);
