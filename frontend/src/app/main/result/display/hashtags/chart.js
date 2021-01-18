import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries,
    FlexibleXYPlot,
    HorizontalBarSeries,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
  } from 'react-vis';

const HashtagsChart = ({ hashtags }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
        
      },
  }));

  const classes = useStyles();

  const [chartData, setChartData] = useState();

  useEffect(() => {
      if(hashtags){
      let data = [];
      for(let i = 0; i < hashtags.length && i < 10; i++){
        data.push({x: hashtags[i][0], y: hashtags[i][1]})
      }
      setChartData(data);
    }
  }, [hashtags])

  const BarSeries = VerticalBarSeries;

  return (
    <div className={classes.root}>     
    <FlexibleWidthXYPlot xType="ordinal" height={250} xDistance={100} color="#d1f3fd">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries data={chartData} />
        </FlexibleWidthXYPlot>
    </div>
  );
};

export default HashtagsChart;