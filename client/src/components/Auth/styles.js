import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),

    backgroundColor: 'rgba( 255, 255, 255, 0.8 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: ' blur(16px) saturate(180%)',
    border: '1px solid rgba( 255, 255, 255, 0.5 )'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    color: "white",
    marginTop: "10px",
    marginBottom: "10px",
    '&:hover': {
      backgroundColor: "#171717"
    }
  }
}));
