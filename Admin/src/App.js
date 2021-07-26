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
// import SimpleDialog from './components/Navbar/PopupSeacrh';
// import Profile from './components/Profile/Profile';

const App = () => {
  const admin = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/users/posts" />} />
          <Route path="/users/posts" exact component={Home} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/users/search" exact component={SeacrhPopup} />
          <Route path="/users/posts/search" exact component={Home} />
          {/* <Route path="/users/popup" exact component={SimpleDialog} /> */}
          <Route path="/users/posts/:id" exact component={PostDetails} />
          <Route path="/users/uploadpost" exact component={UploadPost} />
          <Route path={['/users/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!admin ? <Auth /> : <Redirect to="/users/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
