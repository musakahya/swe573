import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserContext from 'shared_resources/context/user_context';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const TopBar = ({}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: 80,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    search: {
      position: 'relative',
      borderRadius: 25,
      backgroundColor: '#EDEEEF',
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        marginRight: 10,
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      borderRadius: 25,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DFE0E1',
    },
    inputRoot: {
      color: '#000000',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      color: '#000000',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    expand: {
      color: '#C4C4C4',
    },
    text: {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(3),
      color: '#495057',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    logo: {
      marginLeft: theme.spacing(7),
      marginTop: theme.spacing(0.5),
      cursor: 'pointer',
      textDecoration: 'none'
    },
    user: {
      color: '#000000', 
    },
    button: {
      textTransform: 'capitalize',
      backgroundColor: '#FFFFFF',
      marginRight: theme.spacing(8)
  },
   pointer: {
     cursor: 'pointer',
     textDecoration: 'none'
   }
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  
  const { user, setUser } = useContext(UserContext);

  const handle_logout = () => {
    localStorage.removeItem('token');
    setUser({ username: '', email: '' });
  };

  return (
    <AppBar
      style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0,40,100,.12)' }}
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBar]: open,
      })}
    >
      <Toolbar disableGutters>
      <Grid
              container
              direction="row"
  justify="space-between"
  alignItems="center"
            >
              <Grid item>
              <Grid
              container
              direction="row"
  justify="flex-start"
  alignItems="center"
            >
              <Grid item classNAme={classes.pointer}>
      <img
            className={classes.logo}
            src="/logo.png"
            align="middle"
            height="48"
            width="48"
            component={Link}
            to={'/app'}
          />
        </Grid>
        <Grid item style={{textDecoration: 'none'}} component={Link}
          to={'/app'}>
          <h1 
          className={classes.text}
          >Social Pill
          </h1>
          </Grid>
          </Grid>
          </Grid>
          <Grid item>
          {user.username === '' ? null : 
          <Grid
              container
              direction="row"
  justify="flex-start"
  alignItems="center"
  spacing={5}
            >
              <Grid item></Grid>
            
          <div className={classes.user}>Hi, {user.username}
          </div>
          
          <Grid item>
          <Button size="small" className={classes.button} variant="outlined" color="primary" onClick={handle_logout}>
        Sign Out
      </Button>
          </Grid>
          
          </Grid>
          }
          </Grid>
          </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
