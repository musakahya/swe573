import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PeopleChart from './chart';
import PeopleTable from './table';

const People = ({ tweets }) => {

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
  }));

  const classes = useStyles();

  const [people, setPeople] = useState();

  useEffect(() => {
      let h = [];
      let obj = {};
      tweets.map((tweet) => {
          console.log(tweet.entities);
          if(tweet.entities.user_mentions.length > 0){
              for(let i = 0; i < tweet.entities.user_mentions.length; i++){
                console.log(tweet.entities.user_mentions[i]);
                h.push(tweet.entities.user_mentions[i].name);
                obj[tweet.entities.user_mentions[i].name] = (obj[tweet.entities.user_mentions[i].name] || 0) + 1 ;   
              }
          }
      })
      setPeople(obj);
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
              People
            </Typography>
</Grid>
<Grid item  xs={12}>
  <div className={classes.info}>
  <div><strong>Most frequently</strong> mentioned people are displayed from the last 7 days.</div>
  </div>
</Grid>
<Grid item xs={12} >
<Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        className={classes.header}
      >
        <Grid item xs={12} className={classes.chart}>
<PeopleChart people={people}/>
</Grid>
<Grid item xs={12} className={classes.table}>
  {people ? <PeopleTable rows={people}/> : null}
  </Grid>
</Grid>
</Grid>
      </Grid>
    </div>
  );
};

export default People;