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


export class OwnProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            isEditing: false,
            user: {}
        };

        this.handleShowEdit = this.handleShowEdit.bind(this);
    }
    componentWillMount() {
        let user = getUserFromToken();
        this.setState({ user: user });
    }

    handleShowEdit(user) {
        const loggedUser = this.props.authReducer(['user', 'user']);
        return (
            loggedUser && loggedUser.role.id === '1' || loggedUser._id === user._id
        );
    }

    canEdit(user) {
        return false;
    }
    render() {
        console.log('props: ', this.props);
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
                    {!this.props.isEditing ?
                        <Card style={{ maxWidth: 350, marginTop: 30 }}>
                            <CardMedia overlay={<CardTitle title={user.userName} />} />
                            <CardText>
                                {user.email}
                            </CardText>
                            {this.canEdit(user) ?
                                <CardActions>
                                    <FlatButton label="Edit Profile" onClick={this.props.editUserToggle}
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
                                    onChange={this.props.onChange}
                                    onBlur={this.props.onBlur}
                                    defaultValue={user.userName}
                                    errorText={this.props.errors.username}
                                /><br />
                                <TextField
                                    hintText="Email"
                                    floatingLabelText="Email"
                                    name="email"
                                    onChange={this.props.onChange}
                                    onBlur={this.props.onBlur}
                                    defaultValue={user.email}
                                    errorText={this.props.errors.email}
                                /><br />
                                <TextField
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    name="password"
                                    type="password"
                                    onChange={this.props.onChange}
                                /><br />
                                <TextField
                                    hintText="Confirm Password"
                                    floatingLabelText="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    onChange={this.props.onChange}
                                    onBlur={this.props.onBlur}
                                    errorText={this.props.errors.confirmPassword}
                                /><br />
                            </CardText>
                            <CardActions>
                                <FlatButton label="Submit" onClick={this.props.onSubmit} primary />
                                <FlatButton label="Cancel" onClick={this.props.editUserToggle} primary />
                            </CardActions>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps)(OwnProfile);
