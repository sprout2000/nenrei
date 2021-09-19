import React from 'react';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  toggleDrawer: () => void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      backgroundColor: '#ff375f',
    },
    iconButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const TitleBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <IconButton
          onClick={props.toggleDrawer}
          edge="start"
          className={classes.iconButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>年齢計算</Typography>
      </Toolbar>
    </AppBar>
  );
};
