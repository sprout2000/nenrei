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
import Avatar from '@material-ui/core/Avatar';

/** Icons */
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';
import OpenInBrowserOutlinedIcon from '@material-ui/icons/OpenInBrowserOutlined';

/** Resources */
import pjson from '../../package.json';

interface Props {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  onSnackOpen: () => void;
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

const SideBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleReload = (): void => location.reload();
  const handleURL = (): void => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawerPaper }}
      open={props.drawerOpen}
      onClose={(): void => props.toggleDrawer()}>
      <div
        className={classes.drawerContent}
        role="presentation"
        onClick={(): void => props.toggleDrawer()}>
        <div className={classes.drawerHeader}>
          <Avatar alt="Logo" src="./icons/manifest-icon-192.png" />
          <Typography className={classes.version}>
            年齢計算 v{pjson.version}
          </Typography>
        </div>
        <List>
          <ListItem button onClick={handleReload}>
            <ListItemIcon>
              <RefreshIcon color="primary" />
            </ListItemIcon>
            <ListItemText secondary="アプリを再読込み" />
          </ListItem>
          <ListItem button onClick={handleURL}>
            <ListItemIcon>
              <OpenInBrowserOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary="ソースコードURL" />
          </ListItem>
          <Divider />
          <ListItem button onClick={props.onSnackOpen}>
            <ListItemIcon>
              <CopyrightOutlinedIcon color="action" />
            </ListItemIcon>
            <ListItemText secondary="ライセンスの表示" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
