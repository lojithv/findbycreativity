import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentItem } from '../../actions/items';
import useStyles from './styles';

const CommentSection = ({ item }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(item?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentItem(`${user?.result?.name}: ${comment}`, item._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography className={classes.Typography} gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography className={classes.Typography} key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography className={classes.Typography} gutterBottom variant="h6">Write a comment</Typography>
          <TextField style={{color: 'white', backgroundColor: 'transparent', borderColor: 'white', outlineColor: 'white'}} fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px', backgroundColor: '#dbdbdb', color: 'black'}} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
