import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const CreateDocument = props => (
  <div>
    <TextField
      name="title"
      type="text"
      placeholder="Title"
      onChange={props.onTitleChange}
      defaultValue={props.document.title}
      fullWidth
    />{' '}
    <br />
    <br />
    <TextField
      className="content"
      name="content"
      type="text"
      placeholder="Content"
      onChange={props.onContentChange}
      defaultValue={props.document.content}
      fullWidth
      multiLine
      rows={2}
      rowsMax={10}
    />
    <br /> <br />
    <SelectField
      floatingLabelText="Access"
      value={props.document.access}
      onChange={props.onSetAccess}
    >
      <MenuItem value={'public'} primaryText="Public" />
      <MenuItem value={'private'} primaryText="Private" />
      <MenuItem value={'role'} primaryText="Role" />
    </SelectField>
  </div>
);

export default CreateDocument;
