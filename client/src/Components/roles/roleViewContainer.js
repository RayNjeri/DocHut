import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as roleActions from '../../actions/roleActions';
import validateInput from '../../utils/roleValidate';

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName: '',
      isLoading: false,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.listroles();
  }

  onChange(e) {
    this.setState({
      roleName: e.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createrole(this.state)
        .then(() => {
          this.context.router.push('/roles');
        })
        .catch(err => {
          this.setState({ errors: err, isLoading: false });

        });
    }
  }
  isValid() {
    const { errors, isValid } = validateInput({name: this.state.roleName});
    if (isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  render() {
    const { errors } = this.state;
    let roles = this.props.roles;
    let loading = this.props.loading;
    return (
      <div>

        <MuiThemeProvider>
          <center>
            <Card className="container" expanded initiallyExpanded>
              <form action="/" onSubmit={this.onSubmit} >
                <h2 className="card-heading">Create new Roles</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className="row">
                  <div className="input-field col s6">
                    <TextField
                      floatingLabelText="Role Name"
                      errorText={errors.roleName}
                      onChange={this.onChange}
                      value={this.state.roleName}
                    />
                  </div>
                </div>
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Create New Role" primary />
                </div>
              </form>
              <br /><br /><br />
            </Card>
            <br /><br /><hr />

            {
              loading ? <CircularProgress thickness={4} /> :
                roles.roles.map((role, index) => {
                  return <Card className="container">
                    <form key={index} ><p>{role.id}&nbsp;&nbsp;{role.roleName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <RaisedButton onTouchTap={() => {
                        if (confirm("Are you sure you want to delete this role?") === true) {
                          this.props.deleterole(role.id)
                            .then(() => {
                              this.props.listroles();
                            });
                          alert("Role deleted");
                        }
                        else {
                          alert("Role not deleted");
                        }
                      }

                      }>Delete</RaisedButton> </p>  <br /></form>
                  </Card>;
                })
            }

          </center>
        </MuiThemeProvider>

      </div >
    );
  }
}
Roles.contextTypes = {
  router: PropTypes.object,
  listroles: PropTypes.func
};

function mapStateToProps(state) {
  return {
    roles: state.roles,
    loading: state.loading
  };
  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(roleActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Roles);