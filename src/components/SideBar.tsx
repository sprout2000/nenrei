import React from 'react';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import { blue, common } from '@material-ui/core/colors';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import ShareIcon from '@material-ui/icons/Share';
import GitHubIcon from '@material-ui/icons/GitHub';

import pjson from '../../package.json';

type Props = {
  drawerOpen: boolean;
  toggleQR: () => void;
  toggleDrawer: () => void;
};

const drawerWidth = 250;
const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContent: {
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
    version: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SideBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleURL = () => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawerPaper }}
      open={props.drawerOpen}
      onClose={props.toggleDrawer}
    >
      <div
        className={classes.drawerContent}
        role="presentation"
        onClick={props.toggleDrawer}
      >
        <div className={classes.drawerHeader}>
          <Avatar alt="Logo" src="./icon-48.png" />
          <Typography className={classes.version}>
            年齢計算 v{pjson.version}
          </Typography>
        </div>
        <List>
          <ListItem button onClick={props.toggleQR}>
            <ListItemIcon>
              <ShareIcon style={{ color: blue[500] }} />
            </ListItemIcon>
            <ListItemText secondary="このアプリを共有" />
          </ListItem>
          <ListItem button onClick={handleURL}>
            <ListItemIcon>
              <GitHubIcon style={{ color: common.black }} />
            </ListItemIcon>
            <ListItemText secondary="レポジトリ" />
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};
