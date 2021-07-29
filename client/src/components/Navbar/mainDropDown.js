import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Card } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import SearchPopup from './PopupSeacrh';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CustomMenuItemContent from './MenuItem';

const MainDropDown = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
    setAnchorEl(null);
    
  };

  const logout2 = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
    setAnchorEl(null);
  };


  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
      <div>
            <Menu
            id= "simple-menu"
            classes={{ paper: classes.dropDownMenu}}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users/posts">Services</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users/posts">creativeMart</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/aboutus">About us</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/helpandsupport">Help & Support</MenuItem>
          </Menu>

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuRoundedIcon fontSize="large" style={{paddingRight:'35px', marginLeft: '-10px', color: 'white'}} ></MenuRoundedIcon>
            </Button>

            </div>
  );
};

export default MainDropDown;
