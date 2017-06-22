import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

export default function DocumentEditForm(props) {
  return (
    <form>
      <TextField
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={props.document.title}
        onChange={props.onChange}
        fullWidth
      />
      <br />
      <TextField
        type="text"
        name="content"
        placeholder="Content"
        defaultValue={props.document.content}
        onChange={props.onChange}
        multiLine
        fullWidth
      />
    </form>
  );
}

DocumentEditForm.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired
};
