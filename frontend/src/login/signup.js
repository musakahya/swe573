import React, { Component, useEffect } from 'react';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import validator from 'validator';

const Signup = ({}) => {

  const useStyles = makeStyles((theme) => ({
    oot: {
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
            borderColor: "#D2D2D2",
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
  const [status, setStatus] = React.useState();
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
    setLoginValid(loginValues.username !== '' && loginValues.password !== '' && validator.isEmail(loginValues.username) && loginValues.password.length > 7);
  }, [loginValues]);

  const handle_signup = (e, data) => {
    e.preventDefault();
    axios.post('/social_pill/users/', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      body: JSON.stringify({username: loginValues.username, email: loginValues.username, password: loginValues.password, is_superuser: false, is_staff: false})
    })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("failure");
      })
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
      <PersonAddIcon style={{color: "#FFFFFF", marginTop: 5}}/>
      </Grid>
      <Grid item>
      
      <Typography style={{ fontWeight: 600, color: '#ffffff',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
      
            Sign Up
          </Typography>
          </Grid>
          </Grid>
      </Grid>
      <Grid item></Grid>
      {status === "success" ? 
      <Grid item>
          <Typography style={{color: 'green',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="body2">
        
              You have successfully signed up. Please go back to the sign in page and use your credentials.
            </Typography>
        </Grid>
        : (
          status === "failure" ? 
          <Grid item>
          <Typography style={{color: 'red',
      fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="body2">
        
              Sign up failed.
            </Typography>
        </Grid>
        : null
        )
        }
      <Grid item></Grid>
      <Grid item xs={12}>
      <MuiThemeProvider theme={themeTextField}>
        <div style={{backgroundColor: '#FFFFFF', width: 380}}>
      <TextField
          id="username"
          variant="outlined"
          helperText={"Proper email shape and form required"}
          label="Email Address"
          value={loginValues.username}
          onChange={(e, id) => handleLoginChange(e, 'username')}
          fullWidth
          error={loginValues.username !== '' && !validator.isEmail(loginValues.username)}
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
          helperText={"At least 8-characters long"}
          value={loginValues.password}
          onChange={(e, id) => handleLoginChange(e, 'password')}
          fullWidth
          error={loginValues.password !== '' && loginValues.password.length <= 8}
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
      <Button fullWidth={true} disabled={!isLoginValid} onClick={handle_signup} className={classes.button} variant="outlined" color="primary">
      Sign Up
    </Button>
      </Grid>
      <Grid item>
      
      </Grid>
      
    </Grid>
    
      </Grid>
      
      </Grid>
      <Grid item style={{ marginTop: 50, marginLeft: 57}}>
      <Typography variant="subtitle2" className={classes.button_right} component={Link} to={"/app/login"}>
      Already have an account? Sign in from here
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

export default Signup;