import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import JWTdecode from 'jwt-decode';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Header from '../common/Header';
import { getUserFromToken } from '../../utils/tokenUtils';

const styles = {
  titleStyle: {
    color: '#ffffff',
  }
};

const DocumentView = props => (
  <div>
    <GridList className="gridlist"
      cellHeight="auto"
      cols={1}
    >
      {getUserFromToken().userId === props.document.userId ?
        <IconMenu
          style={{ float: 'right' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="Edit Document"
            onTouchTap={props.onUpdate}
          />
          <MenuItem
            primaryText="Delete Document"
            onTouchTap={() => {
              props.deleteDocument(props.document.id)
            }
            }
          />
        </IconMenu> : <span />
      }
      <GridTile>
        <h2>{props.document.title}</h2>
        {props.document.content}
        <Chip backgroundColor="#123c69" labelColor="#ffffff"> {props.document.access} </Chip> <br />
      </GridTile>
    </GridList>
  </div>
);

Document.propTypes = {
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DocumentView;
