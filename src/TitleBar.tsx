import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

type Props = {
  toggleDrawer: () => void;
};

export const TitleBar = (props: Props): JSX.Element => {
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
              <Icon>menu</Icon>
            </IconButton>
            <Typography>年齢計算</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
