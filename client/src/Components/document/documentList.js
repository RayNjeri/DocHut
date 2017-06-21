import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentView from './documentsView';

const DocumentList = ({ documents, handleOpen, style }) => (
  <div>
    {documents.map(document =>
      <DocumentView key={document.id} document={document} />
    )}
    <div>
      <FloatingActionButton onClick={handleOpen} style={style}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
);
DocumentList.PropTypes = {
  documents: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
  style: PropTypes.func.isRequired
};

export default DocumentList;
