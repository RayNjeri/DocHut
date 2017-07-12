
import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Gravatar from 'react-gravatar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


const NavBar = (props) => {
  const upperCaseFirst = (name) => {
    return name.replace(/[a-z]/, name[0].toUpperCase());
  };

  return (
    <div>
      <AppBar
        style={{ backgroundColor: 'transparent'}}
        iconStyleLeft={{ color: 'white', background: 'rgb(59, 172, 149)' }}
        onLeftIconButtonTouchTap={props.openDrawer}
      />

      <Drawer
        docked={false}
        width={300}
        open={props.isOpen.open}
        onRequestChange={props.onClose}
      >
        <div style={{ backgroundColor: 'rgb(59, 172, 149)' }}>
          <br />
        </div>
        <Divider />
        <List>
          <Subheader>View users:</Subheader>
          {props.users && props.users.length ?
            props.users.map((user) => (
              <ListItem
                key={user.id}
                primaryText={user.userName}
                onTouchTap={() => props.onSelectUser(user)}
              />
            ))
            : <span> No users found </span>
          }
        </List>
      </Drawer>
    </div>
  );
};

NavBar.propTypes = {
  authReducer: PropTypes.object,
  users: PropTypes.array,
  muiTheme: PropTypes.object,
  openDrawer: PropTypes.func,
  onClose: PropTypes.func,
  onLogOut: PropTypes.func,
  onSelectUser: PropTypes.func,
  isOpen: PropTypes.object
};


export default muiThemeable()(NavBar);
