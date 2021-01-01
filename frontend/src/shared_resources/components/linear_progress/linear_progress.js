import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return <LinearProgress {...this.props} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />;
  }
}

const styles = (props) => ({
  colorPrimary: {
    backgroundColor: '#FFFFFF',
  },
  barColorPrimary: {
    backgroundColor: '#00EF00',
  },
});

export default withStyles(styles)(ColoredLinearProgress);