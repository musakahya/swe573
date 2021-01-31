/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styling begins

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

const Search = ({ historyData }) => {
  const useStyles = makeStyles((theme) => ({
    welcome: {
      
      
    },
    header: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    search: {
      position: "relative",
      
      
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
      
    },
    dashboard_element: {
      backgroundColor: '#FFFFFF',
      borderRadius: '3px',
      border: '1px solid rgba(0,40,100,.12)',
      height: theme.spacing(18),
      width: theme.spacing(25.5),
      boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
      margin: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  // Styling ends

  // Component logic begins

  const [options, setOptions] = useState([]);
  // const [options, setoptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [tweetCount, setTweetCount] = useState();
  const [totalTweetCount, setTotalTweetCount] = useState();
  const [mostSearched, setMostSearched] = useState();

  function handleChange(e) {
    setSelected(e.target.value);
    axios.post('/api/history/', {
      email_address: 'musa@kahya.com',
      search_term: e.target.value,
      date: new Date(),
    },
    {withCredentials: true})
    .then((res) => {
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handlePopup(e) {
    setInput(e.target.value)
  }

  useEffect(() => {

    axios.get('/api/tweet/',
    {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    withCredentials: true}
    )
    .then((res) => {
      if(res.data[0] && res.data[0] > 0){
        setTotalTweetCount(res.data[1]);
        setTweetCount(res.data[0]);
        setMostSearched(res.data[2]);
      } 
      else {
        setTotalTweetCount(0);
        setTweetCount(0);
        setMostSearched("not found");
      }
    })
    .catch((err) => {
      setTotalTweetCount(0);
        setTweetCount(0);
        setMostSearched("not found");
      console.log(err);
    })
  }, []);

  // Component logic ends

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap", width: window.innerWidth - 100 }}
      >
        <Grid item xs={12}>

        <Grid item xs={12} className={classes.header}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item >
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
              New Search
            </Typography>
            </Grid>
            {input.length > 0 ?
            <Grid item >
            <Chip
        label="hit enter to search"
        color="primary"
      />
            </Grid>
            : null
            }
            </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ flexWrap: "nowrap", width: window.innerWidth - 108 }}
          >
            <Grid item xs={12} style={{ backgroundColor: '#FFFFFF', marginRight: 18 }}>
            <Autocomplete
              open={popupOpen}
              onClose={() => handlePopup("close")}
              id="search-autocomplete"
              options={options.sort(
                (a, b) => -b.keyword.localeCompare(a.keyword)
              )}
              onChange={(e) => {
                handleChange(e);
              }}
              freeSolo={true}
              renderInput={(params) => (
                <MuiThemeProvider theme={themeTextField}>
                  <TextField
                    {...params}
                    label="e.g. Covid-19"
                    variant="outlined"
                    onChange={(e) => handlePopup(e)}
                  />
                </MuiThemeProvider>
              )}
            />
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
      <Grid item xs={12} className={classes.header}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ flexWrap: "nowrap" }}
          >
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
              Dashboard
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={4}
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item className={classes.dashboard_element}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontWeight: '600', fontSize: '2rem', marginTop: 15}}>
              {historyData.length >= 0 && tweetCount >= 0 ? historyData.length : <CircularProgress />}
            </Typography>
            </Grid>
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontSize: '.9375rem', fontWeight: '400'}}>
              Topics Searched by You
            </Typography>
            </Grid>
            </Grid>
            </Grid>
            <Grid item className={classes.dashboard_element}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontWeight: '600', fontSize: '2rem', marginTop: 15}}>
              {tweetCount >= 0 ? tweetCount : <CircularProgress />}
            </Typography>
            </Grid>
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontSize: '.9375rem', fontWeight: '400'}}>
              Tweets Returned for You
            </Typography>
            </Grid>
            </Grid>
            </Grid>
            <Grid item className={classes.dashboard_element}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontWeight: '600', fontSize: '2rem', marginTop: 15}}>
              {totalTweetCount >= 0 ? totalTweetCount : <CircularProgress />}
            </Typography>
            </Grid>
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontSize: '.9375rem', fontWeight: '400'}}>
              All Tweets We Have
            </Typography>
            </Grid>
            </Grid>
            </Grid>
            <Grid item className={classes.dashboard_element}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontWeight: '600', fontSize: '2rem', marginTop: 15}}>
              {mostSearched !== undefined ? mostSearched : <CircularProgress />}
            </Typography>
            </Grid>
            <Grid item>
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', fontSize: '.9375rem', fontWeight: '400'}}>
              Most Searched Topic
            </Typography>
            </Grid>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>

        {selected && selected !== "" ? <Redirect to={`/app/result/tweets/?q=${selected.toLowerCase().replace(' ', '_')}`} /> : null}
    </div>
  );
};

export default Search;