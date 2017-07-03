import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import CreateIcon from 'material-ui/svg-icons/content/create';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import { getUserFromToken } from '../../utils/tokenUtils';
import DocumentList from '../document/documentList';
import { bindActionCreators } from 'redux';


export class OwnProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isEditing: false,
      user: {},
      editedUser: {}
    };
    this.editUserToggle = this.editUserToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    let user = getUserFromToken();
    this.setState({ user: user });
  }

  editUserToggle() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleSubmit(e) {
    e.preventDefault();
    const hasErrors = Object.keys(this.state.errors).some(key => !!this.state.errors[key]);
    if (hasErrors) {
      return;
    }
    const updatedUser = Object.assign({}, this.state.editedUser, {
      id: this.props.user.id
    });
    this.props.updateUser(updatedUser);
  }
  handleChange(e) {
    e.preventDefault();
    console.log('HandleChange', e.target.name, e.target.value);
    let editedUser = this.state.editedUser;
    this.setState({
      editedUser: Object.assign({}, editedUser, {
        [e.target.name]: e.target.value
      })
    });
  }

  canEdit(user) {
    return true;
  }
  render() {
    console.log('props: ', this.prop);
    let user = this.props.user;
    if (!user) {
      return (
        <CircularProgress />
      );
    } else {
      user = Object.assign({}, this.props.user, this.state.user);
    }
    return (
      <div className="row col-md-10 col-md-offset-1 col-sm-12" style={{ padding: 20 }}>
        <div className="col-md-4 col-sm-4" >
          {!this.state.isEditing ?
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={user.userName} />} />
              <CardText>
                {user.email}
              </CardText>
              {this.canEdit(user) ?
                <CardActions>
                  <FlatButton label="Edit Profile" onClick={this.editUserToggle}
                    icon={<CreateIcon />} primary />
                </CardActions> : <span />}
            </Card> :
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={user.userName} />} />
              <CardText>
                <TextField
                  hintText="Username"
                  floatingLabelText="Username"
                  name="userName"
                  onChange={this.handleChange}
                  defaultValue={user.userName}

                /><br />
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  name="email"
                  onChange={this.handleChange}
                  defaultValue={user.email}

                /><br />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                /><br />
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  onChange={this.handleChange}
                  name="confirmPassword"
                  type="password"


                /><br />
              </CardText>
              <CardActions>
                <FlatButton label="Submit" onClick={this.handleSubmit} primary />
                <FlatButton label="Cancel" onClick={this.editUserToggle} primary />
              </CardActions>
            </Card>
          }
        </div>
        <div className="col-md-8 col-sm-8" >
          <DocumentList documents={user.documents} />

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);
