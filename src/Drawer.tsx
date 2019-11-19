import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { blue } from '@material-ui/core/colors';

import InfoIcon from '@material-ui/icons/InfoOutlined';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import pjson from '../package.json';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    drawerHeader: {
      height: 120,
      padding: '1em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: blue[100],
      color: blue[600],
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    list: {
      width: 250,
    },
  })
);

const Drawer = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer(false)}
      onOpen={(): void => props.toggleDrawer(true)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={(): void => props.toggleDrawer(false)}>
        <div className={classes.drawerHeader}>App shell v{pjson.version}</div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Exit" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
