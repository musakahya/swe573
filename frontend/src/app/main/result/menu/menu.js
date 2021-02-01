import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ loading }) => {
  useEffect(() => { }, []);

  const useStyles = makeStyles((theme) => ({
    header: {
      paddingTop: theme.spacing(3),

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
    }
  }));

  let location = useLocation();

  const classes = useStyles();

  const [selected, setSelected] = React.useState('tweets');

  const handleClick = (new_value) => {
    setSelected(new_value);
  }

  return (
    <div >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{ flexWrap: "nowrap" }}
        spacing={3}
        className={classes.header}
      >
        <Grid item xs={12} className={classes.header}>
          <Typography style={{
            color: '#495057',
            fontFamily: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
          }} variant="h6">
            Displaying results for <i><strong>{location.search.split("?q=")[1]}</strong></i>
          </Typography>
        </Grid>
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
              <Button className={selected === 'tweets' ? classes.selected : classes.button} onClick={() => { handleClick('tweets') }} variant="outlined" color="primary" component={Link} to={`/app/result/tweets/${location.search}`}>
                Tweets
      </Button>
            </Grid>
            <Grid item>
              <Button disabled={loading} className={selected === 'hashtags' ? classes.selected : classes.button} onClick={() => { handleClick('hashtags') }} variant="outlined" color="primary" component={Link} to={`/app/result/hashtags/${location.search}`}>
                Hashtags
      </Button>
            </Grid>
            <Grid item>
              <Button disabled={loading} className={selected === 'mentions' ? classes.selected : classes.button} onClick={() => { handleClick('mentions') }} variant="outlined" color="primary" component={Link} to={`/app/result/people/${location.search}`}>
                Mentions
      </Button>
            </Grid>
            <Grid item>
              <Button disabled={loading} className={selected === 'sentiments' ? classes.selected : classes.button} onClick={() => { handleClick('sentiments') }} variant="outlined" color="primary" component={Link} to={`/app/result/sentiments/${location.search}`}>
                Sentiments
      </Button>
            </Grid>
            <Grid item>
              <Button disabled={loading} className={selected === 'word_cloud' ? classes.selected : classes.button} onClick={() => { handleClick('word_cloud') }} variant="outlined" color="primary" component={Link} to={`/app/result/wordcloud/${location.search}`}>
                Word Cloud
      </Button>
            </Grid>
            <Grid item>
              <Button disabled={loading} className={selected === 'cooccurrence' ? classes.selected : classes.button} onClick={() => { handleClick('cooccurrence') }} variant="outlined" color="primary" component={Link} to={`/app/result/cooccurrence/${location.search}`}>
                Co-occurrence Graph (Bigram)
      </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Menu;