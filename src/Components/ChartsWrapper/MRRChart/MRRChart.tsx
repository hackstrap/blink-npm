import React from "react";
import ChartComponent from "../../ChartsComponents/ChartComponent";
const MRRChart = () => {
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
      {
        axis: "y",
        label: "My Third Data set",
        data: [25, 60, 75, 30, 45, 56, 35, 60, 75, 30, 45, 26, 75, 20],
        fill: false,
        backgroundColor: ["#96C0FF"],
        borderColor: ["#96C0FF"],
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
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
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
        stacked: true,
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
        title="Monthly Recurring Revenue"
        description="Monthly Recurring Revenue, commonly abbreviated as “MRR” is all of your recurring revenue normalized into a monthly amount."
        data={data}
        options={options}
        type="bar"
      />
    </div>
  );
};

export default MRRChart;
