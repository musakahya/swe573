import React, { Component, useEffect, useContext, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Topbar from '../app/topbar/topbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import UserContext from 'shared_resources/context/user_context';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const Login = ({}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#F5F7FB'
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
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(9),
      paddingRİght: theme.spacing(9),
    },
    button: {
      textTransform: 'capitalize',
  },
  button_right: {
    color: '#000000',
    textDecoration: 'none'
},
  fields: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D2D2D2",
            boxShadow: '0 5px 10px 0 rgba(0,0,0,.05)',
            color: '#000000',
            borderRadius: 10
  }
  }));

  const themeTextField = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: 3,
          "& $notchedOutline": {
            borderColor: "rgba(0,40,100,.12)",
            
            boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
            color: '#000000'
          },
          "&:hover ": {
            borderColor: "rgba(0,40,100,.12)",
            boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
            color: '#000000'
          },
        },
      },
    },
  });

  const classes = useStyles();

  const [displayedForm, setDisplayedForm] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);
  const [username, setUsername] = React.useState();
  const [loginFormData, setLoginFormData] = React.useState();
  const [isLoginValid, setLoginValid] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const [ isError, setError ] = React.useState(false);
  let form;

  // login form
  const [loginValues, setLoginValues] = React.useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoginFormData(loginValues);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [loginValues]);

  const handleLoginChange = (event, id) => {
    setLoginValues({ ...loginValues, [id]: event.target.value });
  };

  useEffect(() => {
    setLoginValid(loginValues.username !== '' && loginValues.password !== '');
  }, [loginValues]);

  const handle_login = (e) => {
    e.preventDefault();
    fetch('/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: loginValues.username, password: loginValues.password})
    })
    .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', json.user.username);
        setDisplayedForm('');
        setLoggedIn(true);
        setUsername(json.user.username);
        setUser({
          username: json.user.username,
          email: json.user.email_address,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

return (
  <div className={classes.root}>
    <CssBaseline />
    <Topbar />
    <div className={classes.toolbar} />
    <div className={classes.content}>
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: 400 }}
        spacing={2}
        className={classes.fields}
      >
        <Grid item xs={12} style={{ backgroundColor: "#3F51B5", borderRadius: 10, width: "100%", borderColor: "#D2D2D2",
            boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
            color: '#000000'}}>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
        <VpnKeyIcon style={{color: "#FFFFFF", marginTop: 5}}/>
        </Grid>
        <Grid item>
        
        <Typography style={{ fontWeight: 600, color: '#ffffff',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
        
              Sign In
            </Typography>
            </Grid>
            </Grid>
        </Grid>
        <Grid item></Grid>
        {isError ? (
        <Grid item>
          <Typography style={{color: 'red',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="body2">
        
              Email address or password is invalid. Please try again.
            </Typography>
        </Grid>
        ) : null}
        <Grid item></Grid>
        <Grid item xs={12}>
        <MuiThemeProvider theme={themeTextField}>
          <div style={{backgroundColor: '#FFFFFF', width: 380}}>
        <TextField
            id="username"
            variant="outlined"
            helperText={""}
            label="Email Address"
            value={loginValues.username}
            onChange={(e, id) => handleLoginChange(e, 'username')}
            fullWidth
           
          />
          </div>
          </MuiThemeProvider>
        </Grid>
        

        <Grid item></Grid>

        <Grid item xs={12}>
        <MuiThemeProvider theme={themeTextField}>
        <div style={{backgroundColor: '#FFFFFF', width: 380}}>
        <TextField
            id="password"
            variant="outlined"
            type="password"
            label="Password"
            helperText={""}
            value={loginValues.password}
            onChange={(e, id) => handleLoginChange(e, 'password')}
            fullWidth

          />
          </div>
          </MuiThemeProvider>
        </Grid>
        <Grid item></Grid>
        <Grid item xs={12}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="space-between"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={3}
      >
        <Grid item xs={12} style={{width: "100%"}}>
        <Button fullWidth={true} disabled={!isLoginValid} onClick={handle_login} className={classes.button} variant="outlined" color="primary">
        Sign In
      </Button>
        </Grid>
        <Grid item>
        
        </Grid>
        
      </Grid>
      
        </Grid>
        
        </Grid>
        <Grid item style={{ marginTop: 50, marginLeft: 60}}>
        <Typography variant="subtitle2" className={classes.button_right} component={Link} to={"/app/signup"}>
        Don't have an account? Sign up from here
      </Typography>
      </Grid>
        </Grid>
        
        </Grid>
        
        </Grid>
        
        </Grid>
        
      </div>
      </div>
);
};

export default Login;