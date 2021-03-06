import React, { useContext } from "react";
import { globalContext } from "../../AppContext";
import { currencyFormatter } from "../../utility/currencyFormatter";
import { formatPercentValue } from "../../utility/formatPercentValue";
import ChartComponent from "../ChartsComponents/ChartComponent";
import LineChartComponent from "../ChartsComponents/LineChart/LineChart";
import {
  fetchCollection,
  fetchCollectionUnity,
  updateCollection,
} from "../fetch";
import { extractChartData } from "./MRRChart";

const chartFields = [
  {
    Header: "Total Registered Users Change (%)",
    accessor: "total_registered_users_gr",
  },
  {
    Header: "Total Registered Users",
    accessor: "total_registered_users",
  },
];

const TotalRegisteredUsers = (props) => {
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
        label: "Total registered users change (%)",
        data: [25, 75, 80, 45, 56, 75, 60, 80, 45, 56, 75, 60, 90],
        fill: false,
        backgroundColor: ["#000"],
        borderColor: ["#000"],
        borderWidth: 2.5,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
      },
      {
        yAxisID: "y",
        label: "Total Registered Users",
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
          text: "Total Registered Users",
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
          count: 4,
          // stepSize: 10,
        },
        grid: {
          display: false,
          borderWidth: 5,
        },
        position: "right",
        display: true,
        title: {
          display: true,
          text: "Total registered users change (%)",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  });
  const [chartControl, setChartControl] = React.useState(null);
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );

  const [chartData, setChartData] = React.useState(null);

  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[1] = {
      ...currentData[1],
      data: serverData["total_registered_users"],
      label: chartFields[1].Header,
    };
    currentData[0] = {
      ...currentData[0],
      data: serverData["total_registered_users_gr"],
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
            chart_name: "total_registered_users",
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
    <div style={{ height: "100%" }}>
      <ChartComponent
        title="Total Registered Users"
        description="Registered Users are users who have registered on the website or app by providing basic contact information and other details."
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

export default TotalRegisteredUsers;
