import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Search from './search/search';
import History from './history/history';

const Home = (props) => {
  useEffect(() => { }, []);

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

  const [rows, setRows] = useState([]);

  return (
    <div className={classes.paper}>

      <Search historyData={rows}/>

      <History rows={rows} setRows={setRows}/>

    </div>
  );
};

export default Home;