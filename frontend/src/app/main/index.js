/* eslint-disable react/jsx-filename-extension */
import React, {
  lazy, Suspense,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Home = lazy(() => import('./home/index'));
const Result = lazy(() => import('./result/index'));

function Main() {

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      backgroundColor: '#FFFFFF',
    },
  }));

  const classes = useStyles();

  return (

    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/app/home">
              <Home />
            </Route>

            <Route path="/app/result">

              <Result />

            </Route>
          </Switch>
        </main>
      </Suspense>
    </div>
  );
}

export default Main;
