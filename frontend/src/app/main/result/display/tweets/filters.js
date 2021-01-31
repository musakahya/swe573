import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserContext from 'shared_resources/context/user_context';

const TweetsFilters = ({ setTweets, setWords, setLoading, startDate, setStartDate, endDate, setEndDate}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
        
      },
      button: {
        textTransform: 'capitalize',
        backgroundColor: '#FFFFFF', 
    },
    selected: {
      textTransform: 'capitalize',
      backgroundColor: '#3F51B5',
      color: '#FFFFFF',
      "&:hover ": {
        backgroundColor: '#142587',
      color: '#FFFFFF',
      },
      header: {
        paddingTop: theme.spacing(3),
        
      },
    }
  }));

  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  function handleStartDate(e){
    setStartDate(e.target.value);
  }

  function handleEndDate(e){
    setEndDate(e.target.value);
  }

  function handleUpdate(){
    axios({
      method: 'post',
      url: `/api/search_by_date/${location.search}/?u=${user.username}`,
      headers: {}, 
      data: 
        JSON.stringify({'startDate': startDate, 'endDate': endDate})
      ,
      withCredentials: true
    })
  .then((res) => {
      setTweets(res.data.response);
      setWords(res.data.words);
      setLoading(false);
  })
  .catch((err) => {
      console.log(err);
  })
  }

  return (
    <div className={classes.root}>     
    <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        spacing={3}
        className={classes.header}
      >
          {
          <Grid item xs={12} className={classes.header}>
<Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        spacing={3}
      >
          <Grid item>
          <TextField
        id="date"
        label="Start Date"
        size="small"
        type="date"
        onChange={(e) => {handleStartDate(e)}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
      <Grid item>
      <TextField
        id="date"
        label="End Date"
        type="date"
        size="small"
        onChange={(e) => {handleEndDate(e)}}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
      <Grid item>
<Button size="small" disabled={!(startDate !== undefined && endDate !== undefined)} className={classes.button} variant="outlined" color="primary" onClick={() => {handleUpdate()}}>
        Update
      </Button>
      </Grid>
          </Grid>
          </Grid>
          }
          </Grid>
    </div>
  );
};

export default TweetsFilters;