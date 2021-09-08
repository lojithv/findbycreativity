import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Service from './Service/Service';
import useStyles from './styles';

const Services = ({ setCurrentId }) => {
  const { services, isLoading } = useSelector((state) => state.services);
  const classes = useStyles();

  if (!services.length && !isLoading) return 'No services';

  return (
    isLoading ? <CircularProgress color='primary' /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {services?.map((service) => (
          <Grid key={service._id} item xs={12} sm={12} md={6} lg={3}>
            <Service service={service} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Services;
