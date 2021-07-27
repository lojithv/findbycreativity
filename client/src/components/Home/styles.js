import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
    backgroundColor: 'rgba( 255, 255, 255, 0.2 )',
    // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 1.5px )',
    WebkitBackdropFilter: ' blur( 1.5px )',
    borderRadius:'10px',
    border: '1px solid rgba( 255, 255, 255, 0.4 )',
    color: 'white'
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
