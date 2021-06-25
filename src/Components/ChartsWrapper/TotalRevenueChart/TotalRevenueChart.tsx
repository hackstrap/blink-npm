import React, { ReactNode, RefObject } from "react";
import { NullLiteral } from "typescript";
import ChartComponent from "../../ChartsComponents/ChartComponent";

const TotalRevenueChart = () => {
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
    ],
  };
  const [options, setOptions] = React.useState<any>({
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
          count: 4,
          // stepSize: 20,
          font: {
            size: 12,
          },
        },
        display: true,
        title: {
          display: true,
          text: "Value",
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
        display: true,
        title: {
          display: true,
          text: "Value",
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

  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  }, []);
  return (
    <div ref={chartRef}>
      <ChartComponent
        title="Total Revenue"
        description="Total revenue, also known as gross revenue, is your total revenue from recurring (MRR) and non-recurring revenue streams."
        options={options}
        data={data}
        type="bar"
      />
    </div>
  );
};

export default TotalRevenueChart;
