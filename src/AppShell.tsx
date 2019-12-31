import React from 'react';

/** AppBar */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

/** Drawer and List */
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
import styled from '@material-ui/core/styles/styled';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

/** Resources */
import pjson from '../package.json';

interface Props {
  toggleDrawer: Function;
  drawerOpen: boolean;
}

const theme = createMuiTheme();

const Titlebar = styled('div')({
  flexGrow: 1,
});

const StyledToolbar = styled(Toolbar)({
  backgroundColor: '#ff375f',
});

const MenuButton = styled(IconButton)({
  marginRight: theme.spacing(1),
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const StyledDrawer = styled(Drawer)({
  width: 250,
  flexShrink: 0,
});

const ListContainer = styled('div')({
  width: 250,
});

const DrawerHeader = styled(List)({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: '#ff375f',
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

const Version = styled(Typography)({
  marginTop: theme.spacing(1),
});

const AppShell = (props: Props): JSX.Element => {
  const handleReload = (): void => location.reload();
  const handleInfo = (): void => {
    window.open('https://github.com/sprout2000/nenrei', '_blank');
  };

  return (
    <Titlebar>
      <AppBar position="sticky">
        <StyledToolbar>
          <MenuButton
            onClick={(): void => props.toggleDrawer()}
            edge="start"
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </MenuButton>
          <Title>ウェブ年齢計算機</Title>
        </StyledToolbar>
      </AppBar>
      <StyledDrawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={(): void => props.toggleDrawer()}>
        <ListContainer
          role="presentation"
          onClick={(): void => props.toggleDrawer()}>
          <DrawerHeader>
            <img src="icons/icon-192.png" alt="Icon" width={48} />
            <Version>年齢計算 v{pjson.version}</Version>
          </DrawerHeader>
          <List>
            <ListItem button onClick={handleReload}>
              <ListItemIcon>
                <RefreshIcon color="primary" />
              </ListItemIcon>
              <ListItemText secondary="アプリを再読込み" />
            </ListItem>
            <ListItem button onClick={handleInfo}>
              <ListItemIcon>
                <InfoIcon color="secondary" />
              </ListItemIcon>
              <ListItemText secondary="このアプリについて" />
            </ListItem>
            <Divider />
          </List>
        </ListContainer>
      </StyledDrawer>
    </Titlebar>
  );
};

export default AppShell;
