import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';

import { useLocation } from 'react-router-dom';

import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const UploadPost = () => {
  const classes = useStyles();
  const query = useQuery();

  const [currentId, setCurrentId] = useState(0);

  const [tags, setTags] = useState([]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
         
          <Grid item xs={12} sm={6} md={6}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default UploadPost;
