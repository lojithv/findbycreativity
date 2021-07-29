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
import CloseIcon from '@material-ui/icons/Close';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

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
import MainDropDown from './mainDropDown';


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


  // const [open, setOpen] = React.useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpenSearch = () => {
    setOpen(true);
  };

  const handleCloseSearch = () => {
    setOpen(false);
  };


  return (
    <AppBar className={classes.appBar} position="sticky">
      <MainDropDown/>
      {/* <MenuRoundedIcon fontSize="large" ></MenuRoundedIcon> */}
      <Typography component={Link} to="/" style={{color:"white",textDecoration: 'none',fontWeight: 'bold', fontSize: 25, marginLeft: '50px', position: 'absolute'}} >FreelanCircle</Typography>
      <Switch>
        <Route path="/users">
      <div className={classes.iconbutton}>
           <div>
            <Button
              // variant="contained"
              style={{ color:'#ffffff', maxWidth: '100px', maxHeight: '90px', minWidth: '30px', minHeight: '30px'}}
              size="medium"
              className={classes.button}
              startIcon={<SearchIcon />}
              onClick={handleClickOpenSearch}
            >
              Search
          </Button>  

      <Dialog className={classes.searchPop} open={open} onClose={handleCloseSearch} aria-labelledby="form-dialog-title" 
      overlayStyle="transparent"
      PaperProps={{
        style: {
          background: 'rgba( 255, 255, 255, 0.20 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: ' blur(16px) saturate(180%)',
          borderRadius:'10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )'
        } }}>
      <DialogContent >
        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", marginBottom:"20px"}}>
           <Typography variant="contained" style={{ color: 'white', fontSize: 30}}>Search</Typography>
           <CloseIcon style={{ color: 'white', fontSize: 30}} onClick={handleCloseSearch}/>
        </div>
        <div style={{
          background: 'rgba( 255, 255, 255, 0.70 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 20.0px )',
          WebkitBackdropFilter: ' blur( 20.0px )',
          borderRadius:'10px',
          border: '1px rgba( 255, 255, 255, 0.18 )'
          }}>
          <SearchPopup />
          </div>
        </DialogContent>
      </Dialog> 

        </div>
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
