import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';

import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import SearchPopup from '../Navbar/PopupSeacrh';

import { useParams } from 'react-router-dom';
import {  CircularProgress, Grid, Divider } from '@material-ui/core';
import {  useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

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

  const CreatorOrTag = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);
  
    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname.startsWith('/tags')) {
        dispatch(getPostsBySearch({ tags: name }));
      } else {
        dispatch(getPostsByCreator(name));
      }
    }, []);
  
    if (!posts.length && !isLoading) return 'No posts';



  return (
    <div>
    <div className={classes.appBar} position="sticky" color="inherit">
      
      <Toolbar className={classes.toolbar}> 
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.large} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
          </div>
        ) : (
         <div>Please log in</div>
        )}
      </Toolbar>
    </div>
        <div>
        <Typography variant="h2" style={{color:'White'}} fontWeight="fontWeightBold">{name}</Typography>
        <Divider style={{ margin: '20px 0 50px 0' }} />
        {isLoading ? <CircularProgress /> : (
          <Grid container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      </div>
  );
};
}
 
export default Profile;
