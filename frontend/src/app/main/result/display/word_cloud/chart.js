import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const callbacks = {
    onWordClick: console.log,
    getWordTooltip: word => `${word.text} (${word.value})`,
  }
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 120],
    fontStyle: "normal",
    fontWeight: "normal",
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  const minSize = [600, 500];
   
  export default function WordCloudChart({ words }) {
    return (
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        words={words}
        minSize={minSize}
      />
    );
  }