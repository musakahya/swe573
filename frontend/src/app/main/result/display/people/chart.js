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
  FlexibleWidthXYPlot,
  HorizontalBarSeries,
  FlexibleHeightXYPlot
  } from 'react-vis';

const PeopleChart = ({ people }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
        
      },
  }));

  const classes = useStyles();

  const [chartData, setChartData] = useState();

  useEffect(() => {
      if(people){
      let data = [];
      for(let i = 0; i < Object.keys(people).length; i++){
        data.push({x: Object.keys(people)[i], y: Object.values(people)[i]})
      }
      setChartData(data);
    }
  }, [people])

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

export default PeopleChart;