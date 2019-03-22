import React, { PropTypes } from 'react';
import UsersView from '../user/userView';
import ProfilePage from './userProfilePage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Validator from 'validator';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import * as roleActions from '../../actions/roleActions';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isEditing: false,
      user: this.props.user
    };

    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentWillMount() {
    this.props.roleActions.listroles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user
      });
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
    return true;
  }

  handleLogOut() {
    this.props.authActions.logoutUser();
    this.context.router.push('/login');
  }

  handleValidate() {
    const user = this.state.user;
    if (!Validator.isEmail(user.email)) {
      this.setState(prevState => ({
        errors: Object.assign({}, prevState.errors, {
          email: 'Email is invalid'
        })
      }));
    } else if (this.state.errors.email) {
      this.setState(prevState => ({
        errors: Object.assign({}, prevState.errors, {
          email: null
        })
      }));
    }

    if (user.password && user.confirmPassword !== user.password) {
      this.setState(prevState => ({
        errors: Object.assign({}, prevState.errors, {
          confirmPassword: "Doesn't match password"
        })
      }));
    } else if (this.state.errors.confirmPassword) {
      this.setState(prevState => ({
        errors: Object.assign({}, prevState.errors, {
          confirmPassword: null
        })
      }));
    }
  }

  render() {
    return (
      <div>
        <UsersView
          documents={this.state.documents}
          users={this.props.users}
          roles={this.props.roles}
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

        {this.state.user && (
          <ProfilePage
            documents={this.state.documents}
            roles={this.props.roles}
            errors={this.state.errors}
            onBlur={this.handleValidate}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            canEdit={this.handleShowEdit}
            onTitleTouchTap={this.handleTitleTouch}
            editUserToggle={this.handleEditToggle}
            user={this.state.user}
            isEditing={this.state.isEditing}
            userActions={this.props.userActions}
          />
        )}
      </div>
    );
  }
}

ProfilePageContainer.propTypes = {
  params: PropTypes.object,
  user: PropTypes.object,
  roles: PropTypes.object,
  authReducer: PropTypes.object,
  userActions: PropTypes.object,
  authActions: PropTypes.object,
  roleActions: PropTypes.object,
  loadUserData: PropTypes.func
};

ProfilePageContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  const user = state.users.users.find(user => user.id === Number(id));

  return {
    user,
    roles: state.roles.roles,
    authReducer: state.authReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    roleActions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageContainer);
