import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import {getProfile} from "../API";
const Navbar = () => {
  const [navMenuAnchor, setNavMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const openNavMenu = (event) => setNavMenuAnchor(event.currentTarget);
  const closeNavMenu = () => setNavMenuAnchor(null);

  const openUserMenu = (event) => setUserMenuAnchor(event.currentTarget);
  const closeUserMenu = () => setUserMenuAnchor(null);

  return (
    <AppBar position="static" sx={{ background: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/FindJob"
            sx={{
              mr: 2,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 0,
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            IT HireSmart
          </Typography>

          {/* Desktop Navigation*/}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0 }}>
            <Button component={Link} to="/FindJob" sx={{ color: "white" }}>
              FindJob
            </Button>
            <Button component={Link} to="/Courses" sx={{ color: "white" }}>
              Courses
            </Button>
            <Button component={Link} to="/Hiring" sx={{ color: "white" }}>
              Hiring
            </Button>
            <Button component={Link} to="/faq" sx={{ color: "white" }}>
              FAQ
            </Button>
          </Box>

          {/* Spacer to push avatar to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0 }}>
            <IconButton color="inherit" onClick={openNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={navMenuAnchor}
              open={Boolean(navMenuAnchor)}
              onClose={closeNavMenu}
            >
              <MenuItem onClick={closeNavMenu} component={Link} to="/FindJob">
                FindJob
              </MenuItem>
              <MenuItem onClick={closeNavMenu} component={Link} to="/Courses">
                Courses
              </MenuItem>
              <MenuItem onClick={closeNavMenu} component={Link} to="/Hiring">
                Hiring
              </MenuItem>
              <MenuItem onClick={closeNavMenu} component={Link} to="/faq">
                FAQ
              </MenuItem>
            </Menu>
          </Box>

          {/* User Avatar and Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                <Avatar src="" alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={closeUserMenu}
            >
              <MenuItem onClick={closeUserMenu}>Profile</MenuItem>
              <MenuItem onClick={closeUserMenu}>Settings</MenuItem>
              <MenuItem onClick={closeUserMenu}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
