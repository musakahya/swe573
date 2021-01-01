import React, { Component, useEffect, useContext } from 'react';
import LoginForm from './login_form';
import SignupForm from './signup_form';
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
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(9),
      paddingRİght: theme.spacing(9),
    },
    button: {
      textTransform: 'capitalize',
      backgroundColor: '#FFFFFF',
  },
  fields: {
    backgroundColor: '#FFFFFF',
    borderColor: "rgba(0,40,100,.12)",
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
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
  const { user, setUser } = useContext(UserContext);
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
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: loginValues.username, password: loginValues.password})
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setDisplayedForm('');
        setLoggedIn(true);
        setUsername(json.user.username);
        console.log(json);
        setUser({
          username: json.user.username,
          email: json.user.email_address,
        });
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
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: 650 }}
        spacing={3}
        className={classes.fields}
      >
        <Grid item>
        <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
              Sign In
            </Typography>
        </Grid>
        <Grid item></Grid>
        <Grid item>
        <FormLabel component="legend">
              Email Address
            </FormLabel>
        </Grid>
        <Grid item xs={12}>
        <MuiThemeProvider theme={themeTextField}>
          <div style={{backgroundColor: '#FFFFFF', width: 600}}>
        <TextField
            id="username"
            variant="outlined"
            helperText={""}
            value={loginValues.username}
            onChange={(e, id) => handleLoginChange(e, 'username')}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          </div>
          </MuiThemeProvider>
        </Grid>
        
        <Grid item>
        <FormLabel component="legend">
              Password
            </FormLabel>
        </Grid>
        <Grid item xs={12}>
        <MuiThemeProvider theme={themeTextField}>
        <div style={{backgroundColor: '#FFFFFF', width: 600}}>
        <TextField
            id="password"
            variant="outlined"
            size="small"
            type="password"
            helperText={""}
            value={loginValues.password}
            onChange={(e, id) => handleLoginChange(e, 'password')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: '%100' }}
        spacing={3}
      >
        <Grid item>
        <Button disabled={!isLoginValid} onClick={handle_login} className={classes.button} variant="outlined" color="primary">
        Sign In
      </Button>
        </Grid>
        <Grid item>
        <Button className={classes.button} variant="outlined" color="primary" component={Link} to={"/app/signup"}>
        Sign Up
      </Button>
        </Grid>
      </Grid>
        </Grid>
        </Grid>
      </div>
      </div>
);
};

export default Login;