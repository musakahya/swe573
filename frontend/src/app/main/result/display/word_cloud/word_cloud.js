import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WordCloudChart from './chart';
import { Link, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const WordCloud = ({ words }) => {

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
    marginBottom: 21
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
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    }
  }));

  const classes = useStyles();

  const [wordCount, setWordCount] = useState({});
  const [wordsArr, setWordsArr] = useState();

  let location = useLocation();

  useEffect(() => {
    let obj = {};
    words.map((word) => {
        if(!word.includes(location.search.split('?q=')[1])) obj[word] = (obj[word] || 0) + 1 ;   
    })
    setWordCount(obj);
    
}, [words])

useEffect(() => {
    if(wordCount !== {}){
    let arr = [];
    for(let i = 0; i < Object.keys(wordCount).length; i++){
        arr.push({text: Object.keys(wordCount)[i], value: wordCount[Object.keys(wordCount)[i]]})
    }
    let ordered = arr.sort(function(a, b) {
      return b.value - a.value;
  });
  setWordsArr(ordered.slice(0, 100));
}
}, [wordCount])


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
              Word Cloud
            </Typography>
</Grid>
<Grid item  xs={12}>
  <div className={classes.info}>
  <div><strong>Most used </strong> words are displayed in a word cloud format based on the following criteria.</div><br/>
  <li>Words that do not contribute to the meaning are eliminated.</li>
  <li>{`The search term, ${location.search.split('?q=')[1]}, is not included.`}</li>
  <li>Tweets from only last 7 days are included.</li>
  </div>
</Grid>
<Grid item  className={classes.table}>
  
{wordsArr && wordsArr.length > 0 ? <WordCloudChart words={wordsArr} /> : 
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
    </div>
  );
};

export default WordCloud;