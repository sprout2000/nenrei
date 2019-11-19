import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Icon from './icon-144.png';
import pjson from '../package.json';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    drawerHeader: {
      height: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em',
      backgroundColor: '#ff375f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
    },
    list: {
      width: 250,
    },
    link: {
      textDecoration: 'none',
      color: '#333',
    },
  })
);

const Drawer = (props: Props): JSX.Element => {
  const classes = useStyles();

  const handleReload = (): void => location.reload();
  const handleInfo = (): void => {
    location.href = 'https://github.com/sprout2000/nenrei/';
  };

  return (
    <SwipeableDrawer
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer(false)}
      onOpen={(): void => props.toggleDrawer(true)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={(): void => props.toggleDrawer(false)}>
        <div className={classes.drawerHeader}>
          <img src={Icon} width={48} />
          <p>年齢計算 v{pjson.version}</p>
        </div>
        <List>
          <ListItem button onClick={handleReload}>
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            <ListItemText primary="再読込み" />
          </ListItem>
          <ListItem button onClick={handleInfo}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="このアプリについて" />
          </ListItem>
          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
