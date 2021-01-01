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

const Search = () => {
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
    }
  }));

  const classes = useStyles();

  // Styling ends

  // Component logic begins

  const [options, setOptions] = useState([]);
  // const [options, setoptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  function handleChange(e) {
    setSelected(e.target.value);
    axios.post('/api/history/', {
      email_address: 'musa@kahya.com',
      search_term: e.target.value,
      date: new Date(),
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handlePopup(e) {
    if (e === "close") setPopupOpen(false);
    else if (e.target.value != "") setPopupOpen(true);
    else setPopupOpen(false);
  }

  // Component logic ends

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
      >
        <Grid item xs={12}>
      <Grid
        className={classes.welcome}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
      >
        <Grid item xs={12} className={classes.header}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
              New Search
            </Typography>
          </Grid>
        </Grid>
        
        <Grid item xs={12} className={classes.search}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ flexWrap: "nowrap", backgroundColor: '#FFFFFF', }}
          >
            <Autocomplete
              open={popupOpen}
              onClose={() => handlePopup("close")}
              id="search-autocomplete"
              options={options.sort(
                (a, b) => -b.keyword.localeCompare(a.keyword)
              )}
              style={{ width: window.innerWidth - 50 }}
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
            <Grid item>
            <div className={classes.dashboard_element}> 

            </div>
            </Grid>
            <Grid item>
            <div className={classes.dashboard_element}> 

            </div>
            </Grid>
            <Grid item>
            <div className={classes.dashboard_element}> 

            </div>
            </Grid>
            <Grid item>
            <div className={classes.dashboard_element}> 

            </div>
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