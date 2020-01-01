import React from 'react';

/** AppBar */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

/** Drawer */
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/** Icons */
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

/** Styles */
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/** Resources */
import pjson from '../package.json';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
}

const drawerWidth = 250;
const useStyles = makeStyles((theme) =>
  createStyles({
    titlebar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      backgroundColor: '#ff375f',
    },
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
    version: {
      marginTop: theme.spacing(2),
    },
  })
);

const Titlebar = (props: Props): JSX.Element => {
  const classes = useStyles();

  const handleReload = (): void => location.reload();
  const handleInfo = (): void => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <div className={classes.titlebar}>
      <AppBar position='sticky'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={(): void => props.toggleDrawer()}
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>ウェブ年齢計算機</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='temporary'
        classes={{ paper: classes.drawerPaper }}
        open={props.drawerOpen}
        onClose={(): void => props.toggleDrawer()}>
        <div
          className={classes.list}
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
    </div>
  );
};

export default Titlebar;
