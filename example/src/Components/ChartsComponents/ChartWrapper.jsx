import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Chart, registerables } from "chart.js";
import { saveAs } from "file-saver";
import { toSvg, toPng } from "html-to-image";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(...registerables);

Chart.register(annotationPlugin);

const ChartWrapper = ({ type, data, options, gradient, backgroundColor }) => {
  const thisGraph = useRef(null);

  const renderChart = (ref) => {
    if (ref.current !== null && options && data) {
      if (gradient) {
        const ctx = thisGraph.current.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 120, 0, 0);
        gradient.addColorStop(1, backgroundColor + "bb");
        gradient.addColorStop(0, backgroundColor + "00");
        return new Chart(thisGraph.current, {
          type,
          data,
          options: {
            ...options,
            backgroundColor: gradient,
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      } else {
        return new Chart(thisGraph.current, {
          type,
          data,
          options: {
            ...options,
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      }
    }
  };

  useEffect(() => {
    const myGraph = renderChart(thisGraph);
    return () => {
      if (myGraph?.destroy) myGraph.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={thisGraph}></canvas>
    </div>
  );
};

export default ChartWrapper;
