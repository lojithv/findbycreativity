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

import { likeService, deleteService } from '../../../actions/services';
import useStyles from './styles';

const Service = ({ service, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(service?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
   
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedService = service.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeService(service._id));

    if (hasLikedService) {
      setLikes(service.likes.filter((id) => id !== userId));
    } else {
      setLikes([...service.likes, userId]);
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

  const openService = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/users/services/${service._id}`);
  };

  const gotoProfile = (e) => {
    history.push(`/users/creators/${service.name}`);
  }

  return (
    <Card className={classes.card} elevation={6} >
        <CardMedia className={classes.media} image={service.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={service.title} onClick={openService}/>
        <div className={classes.details}>
           <Avatar className={classes.small} alt={service.name} src={service.imageUrl} onClick={gotoProfile}>{service.name.charAt(0)}</Avatar>
           <Typography style={{marginLeft:10, cursor: 'pointer', color: 'white'}} onClick={gotoProfile}>{service.name}</Typography> 
           <Box fontSize={12} onClick={gotoProfile} style={{position:'absolute', cursor: 'pointer', marginLeft:'35px' , marginTop:'25px'}}>{moment(service.createdAt).fromNow()}</Box>
        </div>

        <MoreVertIcon onClick={gotoProfile} style={{position:'absolute', marginLeft: '90%', marginTop:'85%'}}></MoreVertIcon>

        <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openService}>  
        {(user?.result?.googleId === service?.creator || user?.result?._id === service?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(service._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
          </Button>
        </div>
        )}
    <div>
    <Typography className={classes.title.split(' ').splice(0, 2).join(' ')} >{service.title}</Typography>
        {/* <Typography className={classes.tags} variant="body2" color="white" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
        <Typography className={classes.description} color="white">{service.message.split(' ').splice(0, 10).join(' ')}...</Typography>
    </div>

     </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button size="small" style={{color: 'white'}} disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === service?.creator || user?.result?._id === service?.creator) && (
          <Button size="small" style={{color: 'white'}} onClick={() => dispatch(deleteService(service._id))}>
            <DeleteIcon fontSize="small" style={{color: 'white'}}/> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Service;