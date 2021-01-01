import React, { useState, useEffect, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
  } from 'react-router-dom';
  import axios from 'axios';

  const Tweets = lazy(() => import('./tweets/tweets'));
  const Hashtags = lazy(() => import('./hashtags/hashtags'));
  const People = lazy(() => import('./people/people'));

const Display = (props) => {
  
  let location = useLocation();

  const useStyles = makeStyles((theme) => ({
    root: {
        
      },
  }));

  const classes = useStyles();

  const [tweets, setTweets] = useState();

  useEffect(() => {
    axios.get(`/api/search/${location.search}`)
    .then((res) => {
        setTweets(res.data.response);
        console.log(res.data.response);
    })
    .catch((err) => {
        console.log(err);
    })
}, []);

  return (
    <div className={classes.root}>     
    <Suspense fallback={<div>Loading...</div>}>         
              <Switch>
                <Route path="/app/result/tweets">
                    <Tweets tweets={tweets}/>
                </Route>
                <Route path="/app/result/hashtags">
                    <Hashtags tweets={tweets}/>
                </Route>
                <Route path="/app/result/people">
                    <People tweets={tweets}/>
                </Route>
              </Switch>
          </Suspense>
    </div>
  );
};

export default Display;