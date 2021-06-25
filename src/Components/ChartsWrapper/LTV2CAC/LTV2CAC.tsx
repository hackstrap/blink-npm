import React from "react";
import ChartComponent from "../../ChartsComponents/ChartComponent";
const LTV2CAC = () => {
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
        backgroundColor: ["#F7A452"],
        borderColor: ["#F7A452"],
        borderWidth: 1,
        pointRadius: 4,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
      },
      {
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

  const [options, setOptions] = React.useState<any>({
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
          count: 4,
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
      //   y1: {
      //     ticks: {
      //       font: {
      //         size: 12,
      //       },
      //     },
      //     grid: {
      //       display: false,
      //       borderWidth: 5,
      //     },
      //     position: "right",
      //     display: true,
      //     title: {
      //       display: true,
      //       text: "Value",
      //       color: "#000",
      //       font: {
      //         size: 12,
      //         weight: "bold",
      //       },
      //     },
      //   },
    },
  });

  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  }, []);

  return (
    <div ref={chartRef}>
      <ChartComponent
        title="LTV : CAC Ratio"
        description="The Customer Lifetime Value to Customer Acquisition Cost (LTV : CAC) ratio measures the relationship between the lifetime value of a customer, and the cost of acquiring that customer. "
        data={data}
        options={options}
        type="bar"
      />
    </div>
  );
};

export default LTV2CAC;
