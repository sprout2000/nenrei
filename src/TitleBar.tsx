import React from 'react';

/** Styles */
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/** Common */
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

/** AppBar */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/** Icons */
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
  toggleDrawer: Function;
}

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

const TitleBar = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position='sticky'>
      <Toolbar className={classes.toolbar}>
        <IconButton
          onClick={(): void => props.toggleDrawer()}
          edge='start'
          className={classes.iconButton}
          color='inherit'
          aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>ウェブ年齢計算機</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
