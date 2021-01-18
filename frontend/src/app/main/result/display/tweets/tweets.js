import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TweetsTable from './table';
import CircularProgress from '@material-ui/core/CircularProgress';

const Tweets = ({ tweets }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
        
      },
      header: {
          display: 'block'
      },
      table: {
          width: '%100',
          backgroundColor: '#FFFFFF',
          borderRadius: '3px',
    border: '1px solid rgba(0,40,100,.12)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
    marginTop: 21,
    marginBottom: 21
      },
      filters: {
        width: '%100',
  marginTop: 21,
  marginBottom: 21
    },
    info: {
      backgroundColor: '#DAE5F5',
      width: '%100',
      borderRadius: '3px',
    border: '1px solid rgba(0,40,100,.12)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
    },
    loading: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>     
<Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        className={classes.header}
      >
<Grid item style={{marginTop: 21, marginBottom: 21}}>
<Typography style={{ color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif', }} variant="h6">
              Tweets
            </Typography>
</Grid>
<Grid item  xs={12}>
  <div className={classes.info}>
  <div><strong>Most recent 100</strong> tweets are displayed from the last 7 days.</div>
  </div>
</Grid>
<Grid item  className={classes.table}>
  
{tweets && tweets.length > 0 ? <TweetsTable rows={tweets}/> : 
<Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.loading}
            >
              <Grid item>
              <CircularProgress />
              </Grid>
            </Grid>
}

</Grid>
      </Grid>
    </div>
  );
};

export default Tweets;