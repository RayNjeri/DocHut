
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
        title="DocHut"
        titleStyle={{ color: 'white' }}
        iconStyleLeft={{ color: 'white' }}
        onLeftIconButtonTouchTap={props.openDrawer}
        iconElementRight={
          <span>
            <FlatButton label="LogOut" onClick={props.onLogOut}
              style={{ color: props.muiTheme.palette.alternateTextColor }} />
          </span>
        }
      />

      <Drawer
        docked={false}
        width={300}
        open={props.isOpen.open}
        onRequestChange={props.onClose}
      >
        <div style={{ backgroundColor: props.muiTheme.palette.primary1Color }}>
          <br />
          <p style={{
            margin: 12, fontSize: 14, fontWeight: 500,
            color: props.muiTheme.palette.alternateTextColor
          }} /> : <p style={{
            margin: 12, fontSize: 14, fontWeight: 500,
            color: props.muiTheme.palette.alternateTextColor
          }} />
          }
          <p style={{
            margin: 12, fontSize: 14, fontWeight: 500,
            color: props.muiTheme.palette.alternateTextColor
          }} />
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
