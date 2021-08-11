import React, { useContext } from "react";
import { globalContext } from "../../AppContext";
import LineChartComponent from "../ChartsComponents/LineChart/LineChart";
import { fetchCollection, updateCollection } from "../fetch";
import { extractChartData } from "./MRRChart";

const chartFields = [
  { Header: "Customer Churn Rate", accessor: "customer_churn_rate" },
];

const CustomerChurnRate = (props) => {
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
        axis: "y",
        type: "line",
        label: "Customer Churn Rate",
        data: [25, 75, 80, 45, 56, 75, 60, 80, 45, 56, 75, 60, 90],
        fill: true,
        // backgroundColor: ["#A3C272"],
        borderColor: ["#F2536D"],
        borderWidth: 2,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          borderWidth: 3,
        },
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
          text: "Amount",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };
  const [chartControl, setChartControl] = React.useState(null);
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );

  const [chartData, setChartData] = React.useState(null);

  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[0] = {
      ...currentData[0],
      data: serverData["customer_churn_rate"],
      label: chartFields[0].Header,
    };
    return currentData;
  };

  const getData = () => {
    fetchCollection(
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
            chart_name: "customer_churn_rate_chart",
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
  }, [currentYear, props]);

  return (
    <div style={{ height: "100%" }}>
      <LineChartComponent
        title="Customer Churn Rate (%)"
        description="Customer churn is the percentage of customers that stopped using your company's product or service during a certain time frame."
        data={chartData}
        options={options}
        type="line"
        backgroundColor={"#F2536D"}
        currentYear={currentYear}
        setCurrentYear={(year) => setCurrentYear(year)}
        chartControl={chartControl}
      />
    </div>
  );
};

export default CustomerChurnRate;
