import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Icon from './icon-192.png';
import pjson from '../package.json';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
}

const drawerWidth = 250;

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      height: 150,
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
      width: drawerWidth,
    },
  })
);

const SideBar = (props: Props): JSX.Element => {
  const classes = useStyles();

  const handleReload = (): void => location.reload();
  const handleInfo = (): void => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawerPaper }}
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer(false)}>
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
              <RefreshIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="アプリを再読込み" />
          </ListItem>
          <ListItem button onClick={handleInfo}>
            <ListItemIcon>
              <InfoIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="このアプリについて" />
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
