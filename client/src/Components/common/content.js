import React from 'react';
import DocumentViewContainer from '../../Components/document/documentViewContainer';
import { Card } from 'material-ui/Card';

class content extends React.Component {
  render() {
    return (
      <div>
        <Card className="container">
          <DocumentViewContainer />
        </Card>
      </div>
    );
  }
}

export default content;
