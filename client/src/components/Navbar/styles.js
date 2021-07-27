import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    marginBottom: '20px',
    display: 'flex',
    height: '80px',
    width: 'inherit',
    // position: 'sticky',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    // backgroundColor: 'rgba(18, 18, 18, 0.8)',
    backgroundColor: 'rgba( 255, 255, 255, 0.7 )',
    // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 1.5px )',
    WebkitBackdropFilter: ' blur( 1.5px )',
    border: '1px solid rgba( 255, 255, 255, 0.8 )',
    color: 'black',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    
      
    },
  },

  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 100,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '800px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  buttons: {
    marginLeft: '20px',
  },
  iconbutton: {
    position: 'relative',
    marginLeft: '150px',
    alignItems: 'center',
  },
  userName: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  dropDownMenu: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    color: 'white'
  },
  // searchPop: {
  //  paper: {
  //    backgroundColor:'rgba(18, 18, 18, 0.8)'
  //  }
  // }
  
}));

