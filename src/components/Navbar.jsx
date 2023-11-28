import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/mrbreast_transparent.png";
import profile from "../assets/mrbreast.jpg";

import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  function handleLogin() {
    loginWithRedirect();
  }

  function handleLogout() {
    logout();
  }

  function handleHomeRedirect() {
    navigate("/");
  }

  function handleProfileRedirect() {
    navigate("/profile");
  }

  function handleProjectionsRedirect() {
    navigate("/projections");
  }

  function handleAuctionsRedirect() {
    navigate("/auctions");
  }

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function menuOptions(isAuthenticated) {
    if (isAuthenticated) {
      return (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={profile} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="profile" onClick={handleProfileRedirect}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>

            <MenuItem key="projections" onClick={handleProjectionsRedirect}>
              <Typography textAlign="center">Projections</Typography>
            </MenuItem>

            <MenuItem key="auctions" onClick={handleAuctionsRedirect}>
              <Typography textAlign="center">Auctions</Typography>
            </MenuItem>

            <MenuItem key="logout" onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      );
    }
    return (
      <MenuItem key="login" onClick={handleLogin}>
        <Typography textAlign="center">Login</Typography>
      </MenuItem>
    );
  }

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box component="img" src={logo} sx={{ height: 40 }} />
          <MenuItem
            key="home"
            onClick={handleHomeRedirect}
            sx={{ flexGrow: 1 }}
          >
            <Typography textAlign="center">Mr Stocks</Typography>
          </MenuItem>
          <Box sx={{ flexGrow: 0 }}> {menuOptions(isAuthenticated)} </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
