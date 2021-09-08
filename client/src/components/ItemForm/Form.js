import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createItem, updateItem } from '../../actions/items';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [itemData, setItemData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const item = useSelector((state) => (currentId ? state.items.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setItemData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!item?.title) clear();
    if (item) setItemData(item);
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createItem({ ...itemData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateItem(currentId, { ...itemData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center" style={{color: 'black'}}>
          Please Sign In to create your own item.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setItemData({ ...itemData, tags: [...itemData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setItemData({ ...itemData, tags: itemData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6" style={{color: 'black'}}>{currentId ? `Editing "${item?.title}"` : 'Creating a Item'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={itemData.title} onChange={(e) => setItemData({ ...itemData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={itemData.message} onChange={(e) => setItemData({ ...itemData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={itemData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setItemData({ ...itemData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
