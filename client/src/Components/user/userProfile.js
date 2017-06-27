import React, { PropTypes } from 'react';
import ProfilePage from '../user/userView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Validator from 'validator';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';

class ProfilePageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidMount() {
        const users = this.props.users;
        if (users.documents && users.users.length === 0) {
            this.loadUserData(this.props.params.id);
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
        this.props.userActions.editUserToggle();
    }

    handleShowEdit(user) {
        const loggedUser = this.props.authReducer(['user', 'user']);
    }

    handleLogOut() {
        this.props.authActions.logoutUser();
        this.context.router.push('/');
    }

    handleClose() {
        this.props.userActions.closeUserToggle();
    }

    handleSubmit(user) {
        this.props.userActions.editUser(user);
    }

    handleChange(event) {
        event.preventDefault();
        this.updateUser(event.target.name, event.target.value);
    }

    updateUser(field, value) {
        let user = this.props.users['userDetails'];
        user = user.set(field, value);
        this.props.userActions.userUpdateRequest(user);
    }

    handleValidate() {
        const user = this.props.users['userDetails'];

        if (!Validator.isEmail(user.email)) {
            this.setState({ errors: { email: 'Email is invalid' } });
        }

        if (user.confirmPassword !== user.password) {
            this.setState({ errors: { confirmPassword: 'Doesn\'t match password' } });
        }
    }

    render() {
        return (
            <div>
                <ProfilePage documents={this.props.users}
                    userStateInfo={this.props.users}
                    onClose={this.handleClose}
                    errors={this.state}
                    onBlur={this.handleValidate}
                    onChange={this.handleChange}
                    onLogOut={this.handleLogOut}
                    onSubmit={this.handleSubmit}
                    canEdit={this.handleShowEdit}
                    onTitleTouchTap={this.handleTitleTouch}
                    user={this.props.users['userDetails']}
                    editUserToggle={this.handleEditToggle} />
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

function mapStateToProps(state) {
    console.log(state)
    return {
        users: state.users,
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
