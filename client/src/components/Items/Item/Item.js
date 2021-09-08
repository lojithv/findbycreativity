import React, { useState } from 'react';
import { Card,Grid, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Avatar, Box } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { likeItem, deleteItem} from '../../../actions/items';
import useStyles from './styles';

const Item = ({item, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(item?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
   
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedItem = item.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeItem(item._id));

    if (hasLikedItem) {
      setLikes(item.likes.filter((id) => id !== userId));
    } else {
      setLikes([...item.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openItem = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/users/items/${item._id}`);
  };

  const gotoProfile = (e) => {
    history.push(`/users/creators/${item.name}`);
  }

  return (
    <Card className={classes.card} elevation={6} >
        <CardMedia className={classes.media} image={item.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={item.title} onClick={openItem}/>
        <div className={classes.details}>
           <Avatar className={classes.small} alt={item.name} src={item.imageUrl} onClick={gotoProfile}>{item.name.charAt(0)}</Avatar>
           <Typography style={{marginLeft:10, cursor: 'pointer', color: 'white'}} onClick={gotoProfile}>{item.name}</Typography> 
           <Box fontSize={12} onClick={gotoProfile} style={{position:'absolute', cursor: 'pointer', marginLeft:'35px' , marginTop:'25px'}}>{moment(item.createdAt).fromNow()}</Box>
        </div>

        <MoreVertIcon onClick={gotoProfile} style={{position:'absolute', marginLeft: '90%', marginTop:'85%'}}></MoreVertIcon>

        <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openItem}> 
        {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(item._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
          </Button>
        </div>
        )}
    <div>
    <Typography className={classes.title.split(' ').splice(0, 2).join(' ')} >{item.title}</Typography>
        {/* <Typography className={classes.tags} variant="body2" color="white" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
        <Typography className={classes.description} color="white">{item.message.split(' ').splice(0, 10).join(' ')}...</Typography>
    </div>

     </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button size="small" style={{color: 'white'}} disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
          <Button size="small" style={{color: 'white'}} onClick={() => dispatch(deleteItem(item._id))}>
            <DeleteIcon fontSize="small" style={{color: 'white'}}/> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Item;
