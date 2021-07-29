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

const CustomMenuItemContent = () => {
  var Content = 'Example';

  return (
                <Card>
                   {Content} 
                </Card>
  );
};

export default CustomMenuItemContent;
