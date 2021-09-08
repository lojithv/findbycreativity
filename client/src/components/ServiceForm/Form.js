import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createService, updateService } from '../../actions/services';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [serviceData, setServiceData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const service = useSelector((state) => (currentId ? state.services.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setServiceData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!service?.title) clear();
    if (service) setServiceData(service);
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createService({ ...serviceData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateService(currentId, { ...serviceData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center" style={{color: 'black'}}>
          Please Sign In to create your own Service.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setServiceData({ ...serviceData, tags: [...serviceData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setServiceData({ ...serviceData, tags: serviceData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6" style={{color: 'black'}}>{currentId ? `Editing "${service?.title}"` : 'Creating a Service'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={serviceData.title} onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={serviceData.message} onChange={(e) => setServiceData({ ...serviceData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={serviceData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setServiceData({ ...serviceData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
