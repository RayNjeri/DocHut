import React, { PropTypes } from 'react';
import UsersView from '../user/userView';
import ProfilePage from './userProfilePage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Validator from 'validator';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isEditing: false,
      user: this.props.user,
    };

    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user
      })
    }
  }
  loadUserData(userId) {
    const user = {
      id: userId
    };
    this.props.userActions.users(userId);
    this.props.userActions.documents(user);
  }

  handleEditToggle() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleShowEdit(user) {
    // In here, ensure the logged in user is either:
    // - owner of the profile
    // - an admin.
    // const loggedUser = this.props.authReducer(['user', 'user']);
    return true;
  }

  handleLogOut() {
    this.props.authActions.logoutUser();
    this.context.router.push('/');
  }

  handleClose() {
    this.props.userActions.closeUserToggle();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.userActions.updateUser(this.state.user);
  }

  handleChange(e) {
    e.preventDefault();
    let editedUser = Object.assign({}, this.props.user, (this.state.user || {}));
    this.setState({
      user: Object.assign({}, editedUser, {
        [e.target.name]: e.target.value
      })
    });
  }

  handleValidate() {
    const user = this.state.user;

    if (!Validator.isEmail(user.email)) {
      this.setState({ errors: { email: 'Email is invalid' } });
    }

    if (user.confirmPassword !== user.password) {
      this.setState({ errors: { confirmPassword: 'Doesn\'t match password' } });
    }
  }

  render() {
    console.log('rendering with props: ', this.props);
    return (
      <div>
        <UsersView
          documents={this.state.documents}
          userStateInfo={this.props.users}
          onClose={this.handleClose}
          errors={this.state}
          onBlur={this.handleValidate}
          onChange={this.handleChange}
          onLogOut={this.handleLogOut}
          onSubmit={this.handleSubmit}
          canEdit={this.handleShowEdit}
          onTitleTouchTap={this.handleTitleTouch}
          editUserToggle={this.handleEditToggle}
        />

        {this.state.user && <ProfilePage
          documents={this.state.documents}
          errors={this.state.errors}
          onBlur={this.handleValidate}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          canEdit={this.handleShowEdit}
          onTitleTouchTap={this.handleTitleTouch}
          editUserToggle={this.handleEditToggle}
          user={this.state.user}
          isEditing={this.state.isEditing}
        />}
      </div>
    );
  }
}

ProfilePageContainer.propTypes = {
  params: PropTypes.object,
  users: PropTypes.object,
  authReducer: PropTypes.object,
  userActions: PropTypes.object,
  authActions: PropTypes.object,
  loadUserData: PropTypes.func
};

ProfilePageContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  const user = state.users.users.find(user => user.id === Number(id));
  console.log(state, '>>>>>>>>')
  console.log(user, 'userrrr');
  return {
    user,
    authReducer: state.authReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
