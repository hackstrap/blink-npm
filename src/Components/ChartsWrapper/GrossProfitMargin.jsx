import React, { useContext } from "react";
import { globalContext } from "../../AppContext";
import LineChartComponent from "../ChartsComponents/LineChart/LineChart";
import { fetchCollection, updateCollection } from "../fetch";
import { extractChartData } from "./MRRChart";

const chartFields = [
  { Header: "Gross Profit Margin", accessor: "gross_profit_margin" },
];

const GrossProfitMargin = (props) => {
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
        label: "Gross Profit Margin",
        data: [25, 75, 80, 45, 56, 75, 60, 80, 45, 56, 75, 60, 90],
        fill: true,
        // backgroundColor: ["#A3C272"],
        borderColor: ["#A3C272"],
        borderWidth: 3,
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
          text: "Gross Profit Margin %",
          color: "#000",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );

  const [chartData, setChartData] = React.useState(null);
  const [chartControl, setChartControl] = React.useState(null);
  const getDatasets = (dataset, serverData) => {
    let currentData = [...dataset];
    currentData[0] = {
      ...currentData[0],
      data: serverData["gross_profit_margin"],
      label: chartFields[0].Header,
    };
    return currentData;
  };
  const getData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "revenue",
      currentYear,
      props.selectedStartup.accessor
    ).then((res) => {
      const serverData = extractChartData(res.data, chartFields);
      if (res.data.length) {
        data = {
          ...data,
          datasets: getDatasets(data.datasets, serverData),
        };
        // console.log(data, serverData);
        setChartData(data);
      } else {
        setChartData(null);
      }
    });
  };
  React.useEffect(() => {
    getData();
    if (props.chartInfo) {
      setChartControl({
        showToInvestor: props.chartInfo?.investor_view,
        // showToggleBtn : props.chartInfo?.investor_view ? true
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
    <div>
      <LineChartComponent
        title="Gross Profit Margin %"
        description="Gross profit margin is a measure of profitability that shows the percentage of revenue that exceeds the cost of goods sold (COGS)."
        data={chartData}
        options={options}
        type="line"
        backgroundColor={"#A3C272"}
        currentYear={currentYear}
        setCurrentYear={(year) => setCurrentYear(year)}
        chartControl={chartControl}
      />
    </div>
  );
};

export default GrossProfitMargin;
