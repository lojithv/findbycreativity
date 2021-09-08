import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import { getItem, getItemsBySearch } from '../../actions/items';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Item = () => {
  const { item, items, isLoading } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getItem(id));
  }, [id]);

  useEffect(() => {
    if (item) {
      dispatch(getItemsBySearch({ search: 'none', tags: item?.tags.join(',') }));
    }
  }, [item]);

  if (!item) return null;

  const openItem = (_id) => history.push(`/users/items/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedItems = items.filter(({ _id }) => _id !== item._id);

  return (
    <Paper className={classes.Mainpaper} elevation={6} className={classes.backDrop}
    style={{
      backgroundColor: 'rgba( 148, 148, 148, 0.2 )',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: ' blur(16px) saturate(180%)',
      border: '1px solid rgba( 255, 255, 255, 0.5 )',
      padding: '20px'
    }}
    >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography className={classes.Typography} variant="h3" component="h2">{item.title}</Typography>
          <Typography className={classes.Typography} gutterBottom variant="h6" component="h2">{item.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: 'white' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography className={classes.Typography} gutterBottom variant="body1" component="p">{item.message}</Typography>
          <Typography className={classes.Typography} variant="h6">
            Created by:
            <Link to={`/users/creators/${item.name}`} style={{ textDecoration: 'none', color: '#baf5ff' }}>
              {` ${item.name}`}
            </Link>
          </Typography>
          <Typography className={classes.Typography} variant="body1">{moment(item.createdAt).fromNow()}</Typography>
          <Divider className={classes.Typography} style={{ margin: '20px 0' }} />
          <Typography className={classes.Typography} variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider className={classes.Typography} style={{ margin: '20px 0' }} />
          <CommentSection className={classes.Typography} item={item} />
          <Divider style={{ margin: '20px 0' }} />
        </div>

        <div className={classes.imageSection}>
         <Typography className={classes.Typography} component={Link} to="/users/items" >
              <CloseIcon style={{ color: 'white', fontSize: 30, marginLeft:'94%'}}/>
          </Typography>
          <img className={classes.media} src={item.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={item.title} />
        </div>
      </div>
      {!!recommendedItems.length && (
        <div className={classes.section}>
          <Typography className={classes.Typography} gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedItems}>
            {recommendedItems.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openItem(_id)} key={_id}>
                <Typography className={classes.Typography} gutterBottom variant="h6">{title}</Typography>
                <Typography className={classes.Typography} gutterBottom variant="subtitle2">{name}</Typography>
                <Typography className={classes.Typography} gutterBottom variant="subtitle2">{message}</Typography>
                <Typography className={classes.Typography} gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Item;
