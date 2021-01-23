import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HashtagsChart from './chart';
import HashtagsTable from './table';
import CircularProgress from '@material-ui/core/CircularProgress';

const Hashtags = ({ tweets }) => {

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
        marginBottom: 21,
    },
    chart: {
      width: '%100',
      backgroundColor: '#FFFFFF',
      borderRadius: '3px',
      border: '1px solid rgba(0,40,100,.12)',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
      marginTop: 21,
      marginBottom: 21,
      padding: theme.spacing(2)
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

  const [hashtags, setHashtags] = useState();

  useEffect(() => {
      let h = [];
      let obj = {};
      tweets.map((tweet) => {
          if(tweet.entities.hashtags.length > 0){
              for(let i = 0; i < tweet.entities.hashtags.length; i++){
                h.push(tweet.entities.hashtags[i].text);
                obj[tweet.entities.hashtags[i].text] = (obj[tweet.entities.hashtags[i].text] || 0) + 1 ;   
              }
          }
      })
      var sortable = [];
      for (var o in obj) {
        sortable.push([o, obj[o]]);
      }
      sortable.sort(function(a, b) {
        return b[1] - a[1] ;
    });
      setHashtags(sortable);
  }, [tweets])

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
              Hashtags
            </Typography>
</Grid>
<Grid item  xs={12}>
  <div className={classes.info}>
  <div><strong>Most popular</strong> hashtags are displayed from <strong>{tweets ? tweets.length : 0} </strong> tweets.</div>
  </div>
</Grid>
<Grid item  className={classes.chart}>
  
{hashtags && hashtags.length > 0 ? <HashtagsChart hashtags={hashtags}/> :
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
<Grid item xs={12} className={classes.table}>
  {hashtags ? <HashtagsTable rows={hashtags}/> : 
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

export default Hashtags;