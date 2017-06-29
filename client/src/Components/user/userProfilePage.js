import React, { PropTypes } from 'react';
import { Card, CardActions, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import CreateIcon from 'material-ui/svg-icons/content/create';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocumentList from '../document/documentList';
import userContainer from './userView';
import DocumentViewContainer from '../document/documentViewContainer';


const ProfilePage = (props) => {
  console.log('props: ', props);
  return (
    <div>
      <div className="row col-md-10 col-md-offset-1 col-sm-12" style={{ padding: 20 }}>
        <div className="col-md-4 col-sm-4" >
          {!props.isEditing ?
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={props.user.userName} />} />
              <CardText>
                {props.user.email}
              </CardText>
              {props.canEdit(props.user) ?
                <CardActions>
                  <FlatButton label="Edit Profile" onClick={props.editUserToggle}
                    icon={<CreateIcon />} primary />
                </CardActions> : <span />}
            </Card> :
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={props.user.userName} />} />
              <CardText>
                <TextField
                  hintText="Username"
                  floatingLabelText="Username"
                  name="userName"
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  defaultValue={props.user.userName}
                  errorText={props.errors.username}
                /><br />
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  name="email"
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  defaultValue={props.user.email}
                  errorText={props.errors.email}
                /><br />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  name="password"
                  type="password"
                  onChange={props.onChange}
                /><br />
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  errorText={props.errors.confirmPassword}
                /><br />
              </CardText>
              <CardActions>
                <FlatButton label="Submit" onClick={props.onSubmit} primary />
                <FlatButton label="Cancel" onClick={props.editUserToggle} primary />
              </CardActions>
            </Card>
          }
        </div>
        <div className="col-md-8 col-sm-8" >
          <DocumentList documents={props.user.documents} />

        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  documents: PropTypes.array,
  user: PropTypes.object,
  editUserToggle: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onLogOut: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  canEdit: PropTypes.func
};

export default ProfilePage;