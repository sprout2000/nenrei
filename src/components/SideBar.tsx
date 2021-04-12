import React, { useContext } from 'react';

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
import ShareIcon from '@material-ui/icons/Share';
import GitHubIcon from '@material-ui/icons/GitHub';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';

/** Colors */
import { blue, common } from '@material-ui/core/colors';

/** Resources */
import pjson from '../../package.json';

/** Context */
import { AppContext } from './App';

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

const SideBar: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const handleURL = () => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      classes={{ paper: classes.drawerPaper }}
      open={state.drawerOpen}
      onClose={() => dispatch({ type: 'drawer', value: !state.drawerOpen })}>
      <div
        className={classes.drawerContent}
        role="presentation"
        onClick={() => dispatch({ type: 'drawer', value: !state.drawerOpen })}>
        <div className={classes.drawerHeader}>
          <Avatar alt="Logo" src="./icons/icon-288.png" />
          <Typography className={classes.version}>
            年齢計算 v{pjson.version}
          </Typography>
        </div>
        <List>
          <ListItem
            button
            onClick={() => dispatch({ type: 'qr', value: true })}>
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
          <ListItem
            button
            onClick={() => dispatch({ type: 'snack', value: true })}>
            <ListItemIcon>
              <CopyrightOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText secondary="ライセンスの表示" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
