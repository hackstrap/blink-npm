import React from "react";
import LineChartComponent from "../../ChartsComponents/LineChart/LineChart";

const CustomerChurnRate = () => {
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
      },
    },
  };
  return (
    <div>
      <LineChartComponent
        title="Customer Churn Rate (%)"
        description="Customer churn is the percentage of customers that stopped using your company's product or service during a certain time frame."
        data={data}
        options={options}
        type="line"
        backgroundColor={"#F2536D"}
      />
    </div>
  );
};

export default CustomerChurnRate;
