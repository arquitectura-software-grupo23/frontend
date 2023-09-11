import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

import logo from '../assets/mrbreast_transparent.png';
import profile from '../assets/mrbreast.jpg';

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  function handleLogin() {
    loginWithRedirect();
  }

  function handleLogout() {
    logout();
  }

  function handleHomeRedirect() {
    navigate('/');
  }

  function handleProfileRedirect() {
    navigate('/profile');
  }


  if (isAuthenticated) {
    return (
      <nav className="navbar">
        <div className="navbar-left" onClick={handleHomeRedirect}>
          <div className="logo-div">
            <img src={logo} className="logo" />
          </div>
          <span>Mr stocks</span>
        </div>
        <div className="navbar-right">
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
          <div className="profile-picture" onClick={handleProfileRedirect}>
            <img
              src={profile}
              className="profile-image"
            />
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-div" onClick={handleHomeRedirect}>
          <img src={logo} className="logo" />
        </div>
        <span>Mr stocks</span>
      </div>
      <div className="navbar-right">
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;