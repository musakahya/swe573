import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './menu/menu';
import Display from './display/display';
import {
  useLocation
} from "react-router-dom";

const Result = (props) => {

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: '100%',
      backgroundColor: '#F5F7FB',
      flexWrap: 'wrap',
      '& > *': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>

      <Menu />
      <Display />

    </div>
  );
};

export default Result;