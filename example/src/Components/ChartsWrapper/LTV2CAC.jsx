import React, { useContext } from "react";
import { globalContext } from "../../AppContext";
import { currencyFormatter } from "../../utility/currencyFormatter";
import { formatPercentValue } from "../../utility/formatPercentValue";
import ChartComponent from "../ChartsComponents/ChartComponent";
import {
  fetchCollection,
  fetchCollectionUnity,
  updateCollection,
} from "../fetch";
import { extractChartData } from "./MRRChart";

const chartFields = [
  { Header: "LTV", accessor: "customer_lifetime_value" },
  { Header: "CAC", accessor: "customer_acquisition_cost" },
  { Header: "LTV/CAC", accessor: "ltv_to_cac_ratio" },
];

const LTV2CAC = (props) => {
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
        yAxisID: "y1",
        type: "line",
        label: "My Second Dataset",
        data: [25, 75, 80, 45, 56, 75, 60, 80, 45, 56, 75, 60, 90],
        fill: false,
        backgroundColor: ["#F7A452"],
        borderColor: ["#F7A452"],
        borderWidth: 2.5,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
      },
      {
        yAxisID: "y",
        label: "My First Dataset",
        data: [25, 25, 75, 80, 45, 56, 75, 60, 75, 80, 45, 56, 75, 60],
        fill: false,
        backgroundColor: ["#9D53F2"],
        borderColor: ["#9D53F2"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        stack: "stack0",
        categoryPercentage: 0.5,
      },
      {
        yAxisID: "y",
        label: "My Third Data set",
        data: [25, 60, 75, 30, 45, 56, 35, 60, 75, 30, 45, 26, 75, 20],
        fill: false,
        backgroundColor: ["#3290ED"],
        borderColor: ["#3290ED"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        stack: "stack1",
        categoryPercentage: 0.5,
      },
    ],
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
          count: 4,
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
        // stacked: true,

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
          font: {
            size: 12,
          },
        },
        display: true,
        title: {
          display: true,
          text: "LTV : CAC Ratio",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y1: {
        ticks: {
          callback: function (value, index) {
            return formatPercentValue(value);
          },
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
          text: "LTV/CAC Ratio",
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

  const [chartData, setChartData] = React.useState(null);
  const [chartControl, setChartControl] = React.useState(null);

  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[0] = {
      ...currentData[0],
      data: serverData["customer_lifetime_value"],
      label: chartFields[0].Header,
    };
    currentData[1] = {
      ...currentData[1],
      data: serverData["customer_acquisition_cost"],
      label: chartFields[1].Header,
    };
    currentData[2] = {
      ...currentData[2],
      data: serverData["ltv_to_cac_ratio"],
      label: chartFields[2].Header,
    };
    return currentData;
  };

  const getData = () => {
    fetchCollectionUnity(
      appContext?.apiRoute,
      appContext?.token,
      "users",
      currentYear,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const serverData = extractChartData(res.data, chartFields);
        if (res.data.length) {
          data = {
            ...data,
            datasets: getDatasets(data.datasets, serverData),
            chart_name: "ltv_to_cac_chart",
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
  }, [currentYear, props]);

  return (
    <div ref={chartRef} style={{ height: "100%" }}>
      <ChartComponent
        title="LTV : CAC Ratio"
        description="The Customer Lifetime Value to Customer Acquisition Cost (LTV : CAC) ratio measures the relationship between the lifetime value of a customer, and the cost of acquiring that customer. "
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

export default LTV2CAC;
