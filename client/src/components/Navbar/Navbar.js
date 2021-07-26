import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import SearchPopup from './PopupSeacrh';
import DropDownMenu from './DropDownMenu';

const Navbar = () => {
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
    // window.location.reload(); 
  };

  const uploadpost = () => {
   
    history.push('/users/uploadpost');
    setUser(null);
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
    <AppBar className={classes.appBar} position="sticky" color="inherit">
      {/* <Link to="/" className={classes.brandContainer}> */}
      <Typography component={Link} to="/" style={{color:"white",textDecoration: 'none'}} >FreelanCircle</Typography>
        {/* <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" /> */}
        {/* <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" /> */}
      {/* </Link> */}
      <Switch>
        <Route path="/users">
      <div className={classes.iconbutton}>
        <PopupState variant="popover" popupId="demo-popup-popover">
           {(popupState) => (
           <div>
            <Button
              // variant="contained"
              style={{  backgroundColor:'#525252', color:'#ffffff', maxWidth: '100px', maxHeight: '90px', minWidth: '30px', minHeight: '30px', paddingLeft:"50px", paddingRight:"50px"}}
              size="medium"
              className={classes.button}
              startIcon={<SearchIcon />}
              {...bindTrigger(popupState)}
            >
              Search
          </Button>    
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            {/* <Box p={2} style={{backgroundColor: "transparent"}}>
              
            </Box> */}
            <SearchPopup />
          </Popover>
        </div>
      )}
    </PopupState>
      </div>
      
      <Toolbar className={classes.toolbar}> 
        {user?.result ? (
          <div className={classes.profile}>
            
            <Button variant="contained" className={classes.buttons} color="#000000" onClick={uploadpost} startIcon={<CloudUploadIcon />}>Upload</Button>
           
           <DropDownMenu/>
          </div>
        ) : (
          <>
            <Button variant="contained" className={classes.buttons} color="#000000" onClick={uploadpost} startIcon={<CloudUploadIcon />}>Upload</Button>
          <Button component={Link} to="/auth" className={classes.buttons} variant="contained" color="#000000" >Sign In</Button>
          </>
        )}
      </Toolbar>
        </Route>
      </Switch>
    </AppBar>
  );
};

export default Navbar;
