import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Item from './Item/Item';
import useStyles from './styles';

const Items = ({ setCurrentId }) => {
  const { items, isLoading } = useSelector((state) => state.items);
  const classes = useStyles();

  if (!items.length && !isLoading) return 'No items';

  return (
    isLoading ? <CircularProgress color='primary' /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {items?.map((item) => (
          <Grid key={item._id} item xs={12} sm={12} md={6} lg={3}>
            <Item item={item} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Items;
