import React from "react";
import LineChartComponent from "../../ChartsComponents/LineChart/LineChart";

const GrossProfitMargin = () => {
  const data = {
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
      },
    },
  };
  return (
    <div>
      <LineChartComponent
        title="Gross Profit Margin %"
        description="Gross profit margin is a measure of profitability that shows the percentage of revenue that exceeds the cost of goods sold (COGS)."
        data={data}
        options={options}
        type="line"
        backgroundColor={"#A3C272"}
      />
    </div>
  );
};

export default GrossProfitMargin;
