import { ChartData } from "chart.js";
import React from "react";
import ChartComponent from "../ChartsComponents/ChartComponent";
import { fetchCollection, updateCollection } from "../fetch";
import { StdObject, OptionInterface } from "../interfaces";

export const extractChartData = (data, fields) => {
  // console.log(data);
  const obj = {};
  data.forEach((doc) => {
    fields.forEach((field) => {
      if (doc.hasOwnProperty(field.accessor)) {
        if (!obj[field.accessor]) obj[field.accessor] = [];
        obj[field.accessor] =
          doc[field.accessor] !== undefined
            ? [...obj[field.accessor], doc[field.accessor]]
            : [];
      }
    });
  });
  // console.log(data);
  return obj;
};

const chartsField = [
  {
    Header: "Total MRR",
    accessor: "total_mrr",
  },
  {
    Header: "Total New MRR",
    accessor: "total_new_mrr",
  },
  {
    Header: "Total MRR Change %",
    accessor: "total_mrr_gr",
  },
];

const MRRChart = (props) => {
  let data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        axis: "y1",
        type: "line",
        label: "My Second Dataset",
        data: [25, 75, 80, 45, 56, 75, 60, 80, 45, 56, 75, 60, 90],
        fill: false,
        backgroundColor: ["#000"],
        borderColor: ["#000"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
      },
      {
        axis: "y",
        label: "My First Dataset",
        data: [25, 25, 75, 80, 45, 56, 75, 60, 75, 80, 45, 56, 75, 60],
        fill: false,
        backgroundColor: ["#0066EB"],
        borderColor: ["#0066EB"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        barPercentage: 0.5,
      },
      {
        axis: "y",
        label: "My Third Data set",
        data: [25, 60, 75, 30, 45, 56, 35, 60, 75, 30, 45, 26, 75, 20],
        fill: false,
        backgroundColor: ["#96C0FF"],
        borderColor: ["#96C0FF"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        barPercentage: 0.5,
      },
    ],
  };

  const [chartData, setChartData] = React.useState(null);
  const [chartControl, setChartControl] = React.useState(null);
  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[0] = {
      ...currentData[0],
      data: serverData["total_mrr_gr"],
      label: chartsField[2].Header,
    };
    currentData[1] = {
      ...currentData[1],
      data: serverData["total_mrr"],
      label: chartsField[0].Header,
    };
    currentData[2] = {
      ...currentData[2],
      data: serverData["total_new_mrr"],
      label: chartsField[1].Header,
    };
    return currentData;
  };

  const [options, setOptions] = React.useState({
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
          borderWidth: 3,
        },
        display: true,
        // title: {
        //   display: true,
        //   text: "Value",
        //   color: "#000",
        //   font: {
        //     size: 12,
        //     weight: "bold",
        //   },
        // },
      },
      y: {
        stacked: true,
        grid: {
          borderDashOffset: 2,
          borderWidth: 5,
          borderDash: [15],
        },
        ticks: {
          count: 4,
          font: {
            size: 12,
          },
        },
        display: true,
        title: {
          display: true,
          text: "MRR",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y1: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
          borderWidth: 5,
        },
        position: "right",
        display: true,
        title: {
          display: true,
          text: "MRR Change %",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  });

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );

  const chartRef = React.useRef(null);

  const getData = () => {
    fetchCollection(
      "revenue",
      currentYear,
      props.selectedStartup.accessor
    ).then((res) => {
      console.log("data called", res.data);
      const serverData = extractChartData(res.data, chartsField);
      if (res.data.length) {
        data = {
          ...data,
          datasets: getDatasets(data.datasets, serverData),
        };
        setChartData(data);
      } else {
        setChartData(null);
      }
    });
  };
  React.useEffect(() => {
    getData();
    console.log(props.chartInfo);

    if (
      chartRef?.current?.clientWidth !== undefined &&
      chartRef?.current?.clientWidth < 500
    ) {
      setOptions({
        ...options,
        scales: {
          ...options.scales,
          y: {
            ...options.scales.y,
            title: {
              display: false,
            },
          },
        },
      });
    }
    if (props.chartInfo) {
      setChartControl({
        showToInvestor: props.chartInfo?.investor_view,
        updateShowToInvestor: (value) => {
          updateCollection(
            "charts",
            [
              {
                ...props.chartInfo,
                investor_view: value,
              },
            ],
            props.selectedStartup.accessor
          )
            .then((res) => {
              getData();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    }
  }, [currentYear]);

  return (
    <div ref={chartRef} style={{ height: "100%" }}>
      <ChartComponent
        title="Monthly Recurring Revenue"
        description="Monthly Recurring Revenue, commonly abbreviated as “MRR” is all of your recurring revenue normalized into a monthly amount."
        data={chartData}
        options={options}
        type="bar"
        currentYear={currentYear}
        setCurrentYear={(year) => {
          setCurrentYear(year);
        }}
        chartControl={chartControl}
      />
    </div>
  );
};

export default MRRChart;
