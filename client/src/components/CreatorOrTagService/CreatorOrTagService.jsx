import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Service from '../Services/Service/Service';
import { getServicesByCreator, getServicesBySearch } from '../../actions/services';

const CreatorOrTagService = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { services, isLoading } = useSelector((state) => state.services);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getServicesBySearch({ tags: name }));
    } else {
      dispatch(getServicesByCreator(name));
    }
  }, []);

  if (!services.length && !isLoading) return 'No services';

  return (
    <div>
      <Typography variant="h2" style={{color:'White'}} fontWeight="fontWeightBold">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {services?.map((service) => (
            <Grid key={service._id} item xs={12} sm={12} md={6} lg={3}>
              <Service service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTagService;
