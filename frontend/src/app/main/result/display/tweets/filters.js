import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TweetsTable from './table';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const TweetsFilters = ({ setTimeRange, type, setType }) => {

    let location = useLocation();
    const [tweets, setTweets] = useState();


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

  const [selected, setSelected] = React.useState('last_week');

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const handleClick = (new_value) => {

    setSelected(new_value);

    if(new_value === 'last_week'){ 

    var days = 7; 
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    setTimeRange(year + '-' + month + '-' + day);
        
     }
    else if (new_value === 'last_month'){ 
        var days = 30; 
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    setTimeRange(year + '-' + month + '-' + day);
     }
    else if (new_value === 'three_months'){ 
        var days = 90; 
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    setTimeRange(year + '-' + month + '-' + day);
     }
    else if (new_value === 'six_months'){ 
        var days = 180; 
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    setTimeRange(year + '-' + month + '-' + day);
     }
    else if (new_value === 'one_year'){ 
        var days = 365; 
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate();
    var month = last.getMonth() + 1;
    var year = last.getFullYear();
    setTimeRange(year + '-' + month + '-' + day);
     }
    else;

  }

  const handleType = (new_value) => {

    setType(new_value);

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
<Button size="small" className={selected === 'last_week' ? classes.selected : classes.button} onClick={() => {handleClick('last_week')}} variant="outlined" color="primary">
        Last week
      </Button>
      </Grid>
      <Grid item>
<Button size="small" className={selected === 'last_month' ? classes.selected : classes.button} onClick={() => {handleClick('last_month')}} variant="outlined" color="primary">
        Last month
      </Button>
      </Grid>
      <Grid item>
<Button size="small" className={selected === 'three_months' ? classes.selected : classes.button} onClick={() => {handleClick('three_months')}} variant="outlined" color="primary">
        3 months
      </Button>
      </Grid>
      <Grid item>
<Button size="small" className={selected === 'six_months' ? classes.selected : classes.button} onClick={() => {handleClick('six_months')}} variant="outlined" color="primary">
        6 months
      </Button>
      </Grid>
      <Grid item>
<Button size="small" className={selected === 'one_year' ? classes.selected : classes.button} onClick={() => {handleClick('one_year')}} variant="outlined" color="primary">
        1 year
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