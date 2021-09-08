
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      borderColor: 'white',
      borderRadius: '5px'
    },
  },
  
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba( 255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: ' blur(16px) saturate(180%)',
    border: '1px solid rgba( 255, 255, 255, 0.5 )'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    color: "white",
    marginTop: "10px",
    marginBottom:"10px",
    '&:hover':{
      backgroundColor:"#171717"
    }
  },

}));
