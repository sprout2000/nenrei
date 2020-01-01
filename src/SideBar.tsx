import React from 'react';

/** Styles */
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/** Common components */
import Typography from '@material-ui/core/Typography';

/** Drawer and List */
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/** Icons */
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

/** Resources */
import pjson from '../package.json';

interface Props {
  drawerOpen: boolean;
  toggleDrawer: Function;
}

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

const SideBar = (props: Props): JSX.Element => {
  const classes = useStyles();

  const handleReload = (): void => location.reload();
  const handleInfo = (): void => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      classes={{ paper: classes.drawerPaper }}
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer()}>
      <div
        className={classes.drawerContent}
        role='presentation'
        onClick={(): void => props.toggleDrawer()}>
        <div className={classes.drawerHeader}>
          <img src='icons/icon-192.png' alt='Icon' width={48} />
          <Typography className={classes.version}>
            年齢計算 v{pjson.version}
          </Typography>
        </div>
        <List>
          <ListItem button onClick={handleReload}>
            <ListItemIcon>
              <RefreshIcon color='primary' />
            </ListItemIcon>
            <ListItemText secondary='アプリを再読込み' />
          </ListItem>
          <ListItem button onClick={handleInfo}>
            <ListItemIcon>
              <InfoIcon color='secondary' />
            </ListItemIcon>
            <ListItemText secondary='このアプリについて' />
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
