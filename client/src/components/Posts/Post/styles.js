import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme)=>({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    height: '100%',
    position: 'sticky',
    backgroundColor: 'rgba( 255, 255, 255, 0.3 )',
      // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 1.5px )',
      WebkitBackdropFilter: ' blur( 1.5px )',
      borderRadius:'10px',
      border: '1px solid rgba( 255, 255, 255, 0.4 )',
      color: 'white'
  },
  overlay: {
    position: 'absolute',
    marginLeft: "80%",
    top: '20px',
    left: '20px',
    color: 'white',
    align: 'center'
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    color: 'white'
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white'
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));
