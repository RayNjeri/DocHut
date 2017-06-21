import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Gravatar from 'react-gravatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Subheader from 'material-ui/Subheader';
import JWTdecode from 'jwt-decode';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Header from '../common/Header';
import { getUserFromToken } from '../../utils/tokenUtils';


const styles = {
    titleStyle: {
        color: '#ffffff'
    }
};

/* eslint no-undef: "off"*/
const owner = window.localStorage.getItem('userName');
// const token = window.localStorage.getItem('token');
// console.log((token));

const DocumentView = props => (
    <div>
        <GridList
            cellHeight={180}
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
                        onTouchTap={() =>
                            props.onUpdate(props.document)}
                    />
                    <MenuItem
                        primaryText="Delete Document"
                        onTouchTap={() => {
                            props.deleteDocument(props.document.id)
                                .then(() => {
                                    props.listDocuments();
                                });
                        }
                        }
                    />
                </IconMenu> : <span />
            }
            <GridTile
                title={`Title: ${props.document.title}`}
                titleStyle={styles.titleStyle}
            >
                <h5>{props.document.title}</h5>
                {props.document.content}
            </GridTile>
        </GridList>
    </div>
);

Document.propTypes = {
    dispatch: PropTypes.func.isRequired,
    documents: PropTypes.func.isRequired
};

export default DocumentView;
