import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import SeacrhPopup from './components/Navbar/PopupSeacrh';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import UploadPost from './components/Form/UploadPost';
import SimpleDialog from './components/Navbar/PopupSeacrh';
import Profile from './components/Profile/Profile';
import './index.css';

import Settings from './components/settings/settings';
import AboutUs from './components/staticpages/aboutus';
import HelpSup from './components/staticpages/helpandsup';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
            <Navbar/>
      <Container maxWidth="inherit">

        <Switch>
          <Route path="/" exact component={() => <Redirect to="/users/posts" />} />
          <Route path="/users/posts" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/users/search" exact component={SeacrhPopup} />
          <Route path="/users/posts/search" exact component={Home} />
          <Route path="/users/posts/:id" exact component={PostDetails} />
          <Route path="/users/uploadpost" exact component={UploadPost} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/aboutus" exact component={AboutUs} />
          <Route path="/helpandsupport" exact component={HelpSup} />
          <Route path={['/users/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/users/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
