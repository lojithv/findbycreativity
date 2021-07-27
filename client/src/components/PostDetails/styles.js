import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    backgroundColor: 'rgba( 148, 148, 148, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: ' blur(16px) saturate(180%)',
    border: '1px solid rgba( 255, 255, 255, 0.5 )',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',

  },
  Mainpaper:{
    backgroundColor: 'rgba( 148, 148, 148, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: ' blur(16px) saturate(180%)',
    border: '1px solid rgba( 255, 255, 255, 0.5 )',
  },
  Typography: {
    color: 'white'
  }
}));
