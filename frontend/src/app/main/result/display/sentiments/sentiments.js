import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RadialChart, FlexibleXYPlot } from 'react-vis'
import SentimentTable from './table';
import CircularProgress from '@material-ui/core/CircularProgress';

const Sentiments = ({ tweets }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(10),
    },
    header: {
        display: 'block'
    },
    table: {
        width: '%100',

  
  marginTop: theme.spacing(3),
    },
    section: {
        borderRadius: '3px',
        border: '1px solid rgba(0,40,100,.12)',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
        backgroundColor: '#FFFFFF',
    },
    section_left: {
        borderRadius: '3px',
        border: '1px solid rgba(0,40,100,.12)',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
        backgroundColor: '#FFFFFF',
        marginRight: theme.spacing(2),
        paddingLeft: theme.spacing(4)
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

  let location = useLocation();

  const [neg, setNeg] = useState([]);
  const [neut, setNeut] = useState([]);
  const [pos, setPos] = useState([]);

  useEffect(() => {
      axios({
        method: 'post',
        url: '/api/sentiment/',
        headers: {}, 
        data: {
          tweets: tweets.map((tweet) => tweet.text), // This is the body part
        }
      })
        .then((res) => {
            setNeg(res.data.neg);
            setNeut(res.data.neut);
            setPos(res.data.pos);
        })
        .catch((err) => {
            console.log(err);
        })
}, [])

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
              Sentiments
            </Typography>
</Grid>
<Grid item  xs={12}>
  <div className={classes.info}>
  <div>Tweets are grouped into three sentiment categories: positive, neutral and negative. Polarity value ranges between 1 (positive) and -1 (negative).</div>
  </div>
</Grid>
<Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        className={classes.table}
      >
<Grid item xs={5} className={classes.section_left}>
 {pos.length > 0 ? 
 <RadialChart
 data={[{angle: pos.length, label: `Positive (${Math.round(pos.length/(pos.length+neg.length+neut.length)*100)}%)`}, {angle: neg.length, label: `Negative (${Math.round(neg.length/(pos.length+neg.length+neut.length)*100)}%)`}, {angle: neut.length, label: `Neutral: (${Math.round(neut.length/(pos.length+neg.length+neut.length)*100)}%)`}]}
width={650}
height={500}
showLabels={true}
labelsAboveChildren={true}
/>  
 : 
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
<Grid  item xs={7} className={classes.section}>
{pos.length > 0 ? 
<SentimentTable rows={pos.concat(neut).concat(neg)}/> 
: 
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
      </Grid>
    </div>
  );
};

export default Sentiments;