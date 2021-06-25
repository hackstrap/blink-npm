import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Chart, registerables } from "chart.js";
import { saveAs } from "file-saver";
import { toSvg, toPng } from "html-to-image";
Chart.register(...registerables);

const ChartWrapper = ({ type, data, options }) => {
  const thisGraph = useRef(null);

  const renderChart = (ref) => {
    if (ref.current !== null && data && options) {
      return new Chart(ref.current, {
        type,
        data,
        options,
      });
    }
  };

  useEffect(() => {
    const myGraph = renderChart(thisGraph);
    return () => {
      if (myGraph?.destroy) myGraph.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={thisGraph}></canvas>
    </div>
  );
};

export default ChartWrapper;
