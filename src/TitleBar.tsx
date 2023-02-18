import { memo } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  toggleDrawer: () => void;
};

export const TitleBar = memo((props: Props): JSX.Element => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              data-testid="menu"
              sx={{ mr: 2 }}
              onClick={props.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography>年齢計算</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
});

TitleBar.displayName = 'TitleBar';
