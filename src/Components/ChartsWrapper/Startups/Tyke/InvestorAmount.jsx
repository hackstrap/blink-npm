import React, { ReactNode, RefObject, useContext } from "react";
import { globalContext } from "../../../../AppContext";
import { currencyFormatter } from "../../../../utility/currencyFormatter";
import ChartComponent from "../../../ChartsComponents/ChartComponent";
import {
  fetchCollection,
  fetchCollectionUnity,
  updateCollection,
} from "../../../fetch";

const chartFields = [
  {
    Header: "Total Revenue Change %",
    accessor: "total_revenue_gr",
  },
  {
    Header: "Total Revenue",
    accessor: "total_revenue",
  },
];

const InvestorAmountChart = (props) => {
  const appContext = useContext(globalContext);
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
        yAxisID: "y",
        label: "My First Dataset",
        data: [25, 25, 75, 80, 45, 56, 75, 60, 75, 80, 45, 56, 75, 60],
        fill: false,
        backgroundColor: ["#FFB600"],
        borderColor: ["#FFB600"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        barPercentage: 0.5,
      },
    ],
  };
  const [options, setOptions] = React.useState({
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 25,
        },
      },
    },
    scales: {
      x: {
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
        grid: {
          borderDashOffset: 2,
          borderWidth: 5,
          borderDash: [15],
        },
        ticks: {
          callback: function (value, index) {
            return currencyFormatter(value);
          },
          count: 4,
          // stepSize: 20,
          font: {
            size: 12,
          },
        },
        display: true,
        title: {
          display: true,
          text: "Avg Investor Investment Amount per Campaign",
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
          count: 4,
          // stepSize: 10,
        },
        grid: {
          display: false,
          borderWidth: 5,
        },
        position: "right",
        display: false,
        title: {
          display: true,
          text: "",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  });

  // const toJson = (data:object) => {
  //   return JSON.stringify(data)
  // }

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );

  const chartRef = React.useRef(null);

  const [chartControl, setChartControl] = React.useState(null);

  const [chartData, setChartData] = React.useState(null);
  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[1] = {
      ...currentData[1],
      data: serverData["total_revenue"],
      label: chartFields[1].Header,
    };
    currentData[0] = {
      ...currentData[0],
      data: serverData["total_revenue"],
      label: chartFields[0].Header,
    };
    // currentData[2] = {
    //   ...currentData[2],
    //   data: serverData["total_new_mrr"],
    //   label: chartsField[1].Header,
    // };
    return currentData;
  };

  const getData = () => {
    fetchCollectionUnity(
      appContext?.apiRoute,
      appContext?.token,
      "product",
      currentYear,
      props.selectedStartup.accessor
    )
      .then((res) => {
        // const serverData = extractChartData(res.data, chartFields);
        if (res.data.length) {
          data = {
            ...data,
            datasets: [
              {
                ...data.datasets[0],
                data: res?.data[0]?.dataset[4],
                label: res?.data[0]?.labels[4],
              },
            ],
            chart_name: res?.data[0]?.labels[4],
            startup_id: props.selectedStartup.accessor,
            chart_info: props.chartInfo,
          };
          setChartData(data);
        } else {
          setChartData(null);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
    if (
      chartRef?.current?.clientWidth !== undefined &&
      chartRef?.current?.clientWidth < 500
    ) {
      setOptions({
        ...options,
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
          ...options.scales,
          y: {
            ...options.scales.y,
            title: {
              display: false,
            },
          },
          y1: {
            ...options.scales.y,
            position: "right",
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
            appContext?.apiRoute,
            appContext?.token,
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
  }, [currentYear, props.selectedStartup]);
  return (
    <div ref={chartRef} style={{ height: "100%" }}>
      <ChartComponent
        title="Avg Investor Investment Amount per Campaign"
        description="Average investor Investment Amount per campaign is the average amount investors have invested per campaign."
        options={options}
        data={chartData}
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

export default InvestorAmountChart;
