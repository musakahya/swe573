import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import axios from 'axios';
import UserContext from 'shared_resources/context/user_context';

const Tweets = lazy(() => import('./tweets/tweets'));
const Hashtags = lazy(() => import('./hashtags/hashtags'));
const People = lazy(() => import('./people/people'));
const WordCloud = lazy(() => import('./word_cloud/word_cloud'));
const Sentiments = lazy(() => import('./sentiments/sentiments'));
const Cooccurrence = lazy(() => import('./cooccurrence/cooccurrence'));

const Display = ({ setLoading }) => {

  let location = useLocation();

  const useStyles = makeStyles((theme) => ({
    root: {

    },
  }));

  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  const [tweets, setTweets] = useState();
  const [words, setWords] = useState();

  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  useEffect(() => {
    axios.get(`/api/search/${location.search}/?u=${user.username}`, { withCredentials: true }
    )
      .then((res) => {
        setTweets(res.data.response);
        setWords(res.data.words);
        setLoading(false);
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
            <Tweets tweets={tweets} setTweets={setTweets} setWords={setWords} setLoading={setLoading} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
          <Route path="/app/result/hashtags">
            <Hashtags tweets={tweets} setTweets={setTweets} setWords={setWords} setLoading={setLoading} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
          <Route path="/app/result/people">
            <People tweets={tweets} setTweets={setTweets} setWords={setWords} setLoading={setLoading} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
          <Route path="/app/result/wordcloud">
            <WordCloud words={words} tweets={tweets} setTweets={setTweets} setWords={setWords} setLoading={setLoading} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
          <Route path="/app/result/sentiments">
            <Sentiments tweets={tweets} startDate={startDate} endDate={endDate} setTweets={setTweets} setWords={setWords} setLoading={setLoading} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
          <Route path="/app/result/cooccurrence">
            <Cooccurrence tweets={tweets} words={words} startDate={startDate} endDate={endDate} setTweets={setTweets} setWords={setWords} setLoading={setLoading} setStartDate={setStartDate} setEndDate={setEndDate} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default Display;