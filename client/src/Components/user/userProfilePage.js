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


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isEditing: false,
      user: this.props.user,
      value: this.props.roles.find(element => {return element.id === this.props.user.roleId; }).id
    };

    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleShowEdit(user) {
    return true;
  }

  handleEditToggle() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const hasErrors = Object.keys(this.state.errors).some(key => !!this.state.errors[key]);
    if (hasErrors) {
      return;
    }
    const updatedUser = Object.assign({}, this.state.user);
    delete updatedUser.documents;
    this.props.userActions.updateUser(updatedUser);
  }

  handleChange(e) {
    e.preventDefault();
    let editedUser = Object.assign({}, this.props.user, this.state.user);
    this.setState({
      user: Object.assign({}, editedUser, {
        [e.target.name]: e.target.value
      })
    });
  }

  handleRoleChange(event, index, value) {
    let editedUser = Object.assign({}, this.state.user, {roleId: value});
    this.setState({value: value, user: editedUser});
  }

  render() {
    return (
      <div>
        <div className="row col-md-10 col-md-offset-1 col-sm-12" style={{ padding: 80 }}>
          <div className="col-md-4 col-sm-4" >
            {!this.state.isEditing ?
              <Card style={{ maxWidth: 350, marginTop: 30 }}>
                <CardMedia overlay={<CardTitle title={this.state.user.userName} />} />
                <CardText>
                  {this.state.user.email}
                </CardText>
                {this.handleShowEdit(this.state.user) ?
                  <CardActions>
                    <FlatButton label="Edit Profile" onClick={this.handleEditToggle}
                      icon={<CreateIcon />} primary />
                  </CardActions> : <span />}
              </Card> :
              <Card style={{ maxWidth: 350, marginTop: 30 }}>
                <CardMedia overlay={<CardTitle title={this.state.user.userName} />} />
                <CardText>
                  <TextField
                    hintText="Username"
                    floatingLabelText="Username"
                    name="userName"
                    onChange={this.handleChange}
                    onBlur={this.props.onBlur}
                    defaultValue={this.state.user.userName}

                  /><br />
                  <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    name="email"
                    onChange={this.handleChange}
                    onBlur={this.props.onBlur}
                    defaultValue={this.state.user.email}

                  /><br />
                  <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  /><br />
                  <TextField
                    hintText="Confirm Password"
                    floatingLabelText="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={this.handleChange}
                    onBlur={this.props.onBlur}

                  /><br />
                  <SelectField
                  floatingLabelText="Role"
                  value={this.state.value}
                  onChange={this.handleRoleChange}>
                    {this.props.roles.map(role => {
                      return (
                        <MenuItem value={role.id} primaryText={role.roleName} />
                      )
                    })}
                  </SelectField>

                </CardText>
                <CardActions>
                  <FlatButton label="Submit" onClick={this.handleSubmit} primary />
                  <FlatButton label="Cancel" onClick={this.handleEditToggle} primary />
                </CardActions>
              </Card>
            }
          </div>
          <div className="col-md-8 col-sm-8" >
            <DocumentList documents={this.state.user.documents} />

          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  documents: PropTypes.array,
  user: PropTypes.object,
  roles: PropTypes.array,
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