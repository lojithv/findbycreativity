import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../Items/Item/Item';
import { getItemsByCreator, getItemsBySearch } from '../../actions/items';

const CreatorOrTagItem = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getItemsBySearch({ tags: name }));
    } else {
      dispatch(getItemsByCreator(name));
    }
  }, []);

  if (!items.length && !isLoading) return 'No items';

  return (
    <div>
      <Typography variant="h2" style={{color:'White'}} fontWeight="fontWeightBold">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {items?.map((item) => (
            <Grid key={item._id} item xs={12} sm={12} md={6} lg={3}>
              <Item item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTagItem;
