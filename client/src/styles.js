import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
  appBar: {
    borderRadius: 0,
    // margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  buttons: {
    backgroundColor: 'rgba( 148, 148, 148, 0.3 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: ' blur(16px) saturate(180%)',
    border: '1px solid rgba( 255, 255, 255, 0.5 )',
  }
}));
