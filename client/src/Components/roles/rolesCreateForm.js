import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const CreateRole = props => (
  <div>
    <SelectField
      floatingLabelText="Role"
      value={props.document.access}
      onChange={props.onSetAccess}
    >
      <MenuItem value={'Fellow'} primaryText="Fellow" />
      <MenuItem value={'Success'} primaryText="Success" />
      <MenuItem value={'STC'} primaryText="STC" />


    </SelectField>
  </div>
);

export default CreateRole;