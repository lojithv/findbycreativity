import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme)=>({
  media: {
    height: 0,
    paddingTop: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 12,
    cursor: 'pointer',
    // marginright : 50,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '5px',
    height: '510px',
    backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderRadius:'10px',
      border: '1px solid rgba( 255, 255, 255, 0.4 )',
      color: 'white'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    align: 'center'
  },
  grid: {
    display: 'flex',
  },
  details: {
    position: 'absolute',
    display: 'flex',
    marginLeft:'15px',
    marginTop: '85%',
    color: 'white'
  },
  date: {
    align: 'right',
  },
  tags: {
    padding: '10px',
    marginLeft:'5px',
    marginTop:'10%',
   justifyContent:'center',
   alignItems:'center'
  },
  title: {
    position: 'absolute',
    marginLeft:'5%',
    marginTop:'1%'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white'
  },
  cardAction: {
    position: 'absolute',
    marginTop: '100%',
    display: 'block',
    textAlign: 'initial',
  },
}));
