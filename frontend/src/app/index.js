import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Topbar from './topbar/topbar';
import Main from './main/index';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

const AppIndex = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Main />
    </div>
  );
};

export default AppIndex;
