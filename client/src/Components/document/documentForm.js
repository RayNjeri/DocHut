import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};
class EditDocument extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextField
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={this.props.title}
            onChange={this.props.onChange}
            fullWidth
          />
          <br />
          <TextField
            type="text"
            name="content"
            placeholder="Content"
            defaultValue={this.props.content}
            onChange={this.props.onChange}
            multiLine
            fullWidth
          />
          <br />
          <TextField
            type="text"
            name="access"
            label="Access"
            defaultValue={this.props.access}
            onChange={this.props.onChange}
            fullWidth
          />
          <br />
          <RaisedButton
            primary
            style={style}
            type="submit"
            label="Update"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSubmit}
          />
        </form>
      </div>
    );
  }
}

EditDocument.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  saving: PropTypes.func.isRequired,
  access: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EditDocument;
