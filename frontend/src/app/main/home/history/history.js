/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-filename-extension */
import React, {
  Component, useState, useEffect, useContext,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';
import UserContext from 'shared_resources/context/user_context';
import HistoryTable from './history_table';
import ColoredLinearProgress from 'shared_resources/components/linear_progress/linear_progress';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    borderRadius: '3px',
    border: '1px solid rgba(0,40,100,.12)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
    maxHeight: window.innerHeight - 580,
    minHeight: 450,
    // minHeight: window.innerHeight - 590,
    overflowY: 'auto',
    marginTop: theme.spacing(4)
  },
  content: {
    maxWidth: '100%',
    padding: theme.spacing(0),
  },
  button_see_all: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),

  },
  title: {
    color: '#495057',
    fontFamily : 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
    fontSize: '18px'
  },
  colorPrimary: {
    background: 'green',
  },
  barColorPrimary: {
    background: 'green',
  },
  table: {
    minHeight: 200,
  },
  card_header: {
    backgroundColor: '#FFFFFF'
  }
}));

const History = ({ rows, setRows}) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState('loading');

  var rowdata;

  useEffect(() => {

    axios.get('/api/history/',
    {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    withCredentials: true}
    )
    .then((res) => {
      console.log(res);
      rowdata = res.data;
      if (rowdata.length > 0) {
        setLoading('completed');
        setRows(rowdata);
      } else setLoading('empty');
    })
    .catch((err) => {
      console.log(err);
      setRows([]);
      setLoading('empty');
    })
  }, []);

  return (
    <div>
      <Card elevation={0} className={classes.root}>
        <CardHeader

          title="My Search History"
          titleTypographyProps={{

            className: classes.title,
          }}
          className={classes.card_header}
        />

        
        <Divider />
        <CardContent className={classes.content}>
          {loading === 'completed' ? (
            <HistoryTable rows={rows} />
          ) : loading === 'empty' ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.table}
            >
              <Grid item>
                <Typography>No data</Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.table}
            >
              <Grid item>
              <CircularProgress />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;