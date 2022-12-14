import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { styled } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

import pjson from '../package.json';
import icon from './icon.png';

type Props = {
  drawerOpen: boolean;
  onQROpen: () => void;
  toggleDrawer: () => void;
};

const DrawerList = styled('div')(() => ({
  width: 250,
}));

const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: '#ff375f',
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = (props: Props): JSX.Element => {
  const handleURL = () => {
    window.open('https://github.com/sprout2000/nenrei#readme', '_blank');
  };

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.toggleDrawer}
    >
      <DrawerList role="presentation" onClick={props.toggleDrawer}>
        <DrawerHeader>
          <DrawerAvatar>
            <img src={icon} />
          </DrawerAvatar>
          <p>年齢計算 v{pjson.version}</p>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={props.onQROpen} aria-label="share">
              <ListItemIcon>
                <Icon sx={{ color: blue[500] }}>share</Icon>
              </ListItemIcon>
              <ListItemText secondary="このアプリを共有" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleURL}
              aria-label="repo"
              data-testid="repo"
            >
              <ListItemIcon>
                <Icon sx={{ color: grey }}>launch</Icon>
              </ListItemIcon>
              <ListItemText secondary="GitHub レポジトリ" />
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerList>
    </Drawer>
  );
};
