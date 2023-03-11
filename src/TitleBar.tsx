import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onToggleDrawer: () => void;
};

export const TitleBar = ({ onToggleDrawer }: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography>年齢計算</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
