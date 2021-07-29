import React, { useContext } from "react";
import { globalContext } from "../../AppContext";
import ChartComponent from "../ChartsComponents/ChartComponent";
import { fetchCollection, updateCollection } from "../fetch";
import { extractChartData } from "./MRRChart";

const chartFields = [
  {
    Header: "Monthly Active User Change %",
    accessor: "total_monthly_active_users_gr",
  },
  { Header: "Monthly Active Users", accessor: "total_monthly_active_users" },
];

const MonthlyActiveUsers = (props) => {
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
        backgroundColor: ["#667C89"],
        borderColor: ["#667C89"],
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
          padding: 10,
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
          count: 4,
          font: {
            size: 12,
          },
        },
        display: true,
        title: {
          display: true,
          text: "Monthly Active Users",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y1: {
        ticks: {
          count: 4,
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
          text: "MAU Growth Rate %",
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
  const [chartData, setChartData] = React.useState(null);
  const [chartControl, setChartControl] = React.useState(null);
  const chartRef = React.useRef(null);

  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[1] = {
      ...currentData[1],
      data: serverData["total_monthly_active_users_gr"],
      label: chartFields[1].Header,
    };
    currentData[1] = {
      ...currentData[1],
      data: serverData["total_monthly_active_users"],
      label: chartFields[1].Header,
    };
    return currentData;
  };

  const getData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "users",
      currentYear,
      props?.selectedStartup?.accessor
    )
      .then((res) => {
        const serverData = extractChartData(res.data, chartFields);
        if (res.data.length) {
          console.log(res.data);
          data = {
            ...data,
            datasets: getDatasets(data.datasets, serverData),
            chart_name: "monthly_active_users_chart",
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
          y1: {
            ...options.scales.y1,
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
  }, [currentYear, props]);

  return (
    <div ref={chartRef}>
      <ChartComponent
        title="Monthly Active Users (MAU)"
        description="MAU stands for monthly active user, it’s the number of users that have done something meaningful in your product in the last 30 days/calendar month."
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

export default MonthlyActiveUsers;
