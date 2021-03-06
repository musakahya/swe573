import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { Graph } from "react-d3-graph";
import TodayIcon from '@material-ui/icons/Today';
import NotesIcon from '@material-ui/icons/Notes';
import TweetsFilters from '../tweets/filters';

const Cooccurrence = ({ tweets, words, setTweets, setWords, setLoading, startDate, endDate, setStartDate, setEndDate }) => {

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
      padding: theme.spacing(2),
      height: 600
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
    }
  }));

  const classes = useStyles();

  const [bigram, setBigram] = React.useState();
  const [nodesBigram, setNodesBigram] = React.useState();

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/cooccurrence/',
      headers: {},
      data: {
        tweets: tweets.map((tweet) => tweet.text),
      },
      withCredentials: true
    })
      .then((res) => {
        let bigram_data = res.data.bigram;
        let bigram_data_dict = []
        for (let l = 0; l < bigram_data.length; l++) {
          bigram_data_dict.push({ source: bigram_data[l][0][0], target: bigram_data[l][0][1] })
        }
        let bigram_nodes = [];
        let bigram_nodes_dict = [];
        for (let i = 0; i < bigram_data.length; i++) {
          for (let j = 0; j < bigram_data[i].length; j++) {
            for (let k = 0; k < bigram_data[i][j].length; k++) {
              if (bigram_nodes.indexOf(bigram_data[i][j][k] === -1)) {
                bigram_nodes.push(bigram_data[i][j][k]);
                bigram_nodes_dict.push({ id: bigram_data[i][j][k] })
              }
            }
          }
        }
        setNodesBigram(bigram_nodes_dict);
        setBigram(bigram_data_dict);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [tweets])

  const data = {
    nodes: nodesBigram,
    links: bigram
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    height: 600,
    width: 1600,
    initialZoom: 0.7,
    d3: {
      gravity: -100
    },
    node: {
      color: "lightgreen",
      size: 200,
      fontSize: 20,
      highlightFontSize: 30,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

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
        <Grid item style={{ marginTop: 21, marginBottom: 21 }}>
          <Typography style={{
            color: '#495057',
            fontFamily: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
          }} variant="h6">
            Co-occurrence Graph
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.info}
          >
            <Grid item xs={6} >
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <NotesIcon />
                    </Grid>
                    <Grid item>
                      <b>Notes</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ paddingLeft: 23 }}>
                  <div >
                    <div >
                      {startDate !== undefined && endDate !== undefined ?
                        <li><strong>Displaying: relationship between words coming from most frequently used 50 bigrams from {tweets ? tweets.length : 0} tweets sent between {startDate} and {endDate}.</strong></li>
                        :
                        <li><strong>Displaying: relationship between words coming from most frequently used 50 bigrams from the most recent {tweets ? tweets.length : 0} tweets.</strong></li>
                      }
                      <li>Use the right-hand side panel to change the time interval.</li>
                      <li>Maximum number of tweets that can be included at a time for any selected time interval is 2500.</li>
                    </div>
                  </div>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={6} style={{ borderLeft: '1px solid grey' }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-end"
                style={{ paddingLeft: 30, paddingTop: 5 }}
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <TodayIcon />
                        </Grid>
                        <Grid item>
                          <b>Change Time Interval</b>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TweetsFilters setTweets={setTweets} setWords={setWords} setLoading={setLoading} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.chart}>
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
          />
        </Grid>
        <Grid item xs={12} className={classes.table}>

        </Grid>
      </Grid>
    </div>
  );
};

export default Cooccurrence;