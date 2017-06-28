import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tabs from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import NavBar from './appBar';
import CircularProgress from 'material-ui/CircularProgress';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    this.props.userActions.listUsers();
  }

  handleLogOut() {
    this.props.authActions.logoutUser();
    this.context.router.push('/home');
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSelect(user) {
    this.context.router.push(`/profile/${user.id}`);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    return (
            this.props.users.loading ?
                <CircularProgress size={60} thickness={5} /> :
                <NavBar
                    openDrawer={this.handleOpen}
                    users={this.props.users}
                    isOpen={this.state}
                    onClose={this.handleClose}
                    onLogOut={this.handleLogOut}
                    onSelectUser={this.handleSelect}
                />
    );
  }
}

UserContainer.propTypes = {
  userActions: PropTypes.object.isRequired,
  users: PropTypes.object,
  authReducer: PropTypes.object,
  authActions: PropTypes.object,
};

UserContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  console.log('This is the store', state);
  return {
    users: state.users.users,
    authReducer: state.authReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
