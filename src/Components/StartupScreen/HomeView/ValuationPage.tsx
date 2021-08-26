import React, { useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChartWrapper from "../../ChartsComponents/ChartWrapper";
import {
  Divider,
  Typography,
  Select,
  Grid,
  Container,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { OptionInterface, ValuationDataInterface } from "../../interfaces";
import { fetchCollection } from "../../fetch";
import { useContext } from "react";
import { globalContext } from "../../../AppContext";
import { useMemo } from "react";
import {
  ChartCard,
  InfoCard,
  ValuationChart,
} from "../../InvestorScreen/Dashboard/ValuationPage";

interface PropsInterface {
  selectedStartup: OptionInterface;
}
const ValuationPage = (props: PropsInterface) => {
  //   const theme = useTheme();
  //   const classes = useStyles(theme);
  const matches = useMediaQuery("(max-width:500px)");

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const handleYearChange = (year: string) => {
    setCurrentYear(year);
  };

  const [valuationData, setValuationData] =
    React.useState<ValuationDataInterface | null>(null);

  const appContext = useContext(globalContext);
  const getValuationData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "valuation",
      undefined,
      appContext?.userInfo?.accessor
    ).then((res) => {
      if (res.data.length) {
        setValuationData(res.data[0]);
      } else {
        setValuationData(null);
      }
    });
  };
  React.useEffect(() => {
    getValuationData();
  }, [props.selectedStartup]);

  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "2rem" }} container spacing={matches ? 2 : 10}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Valuation (Cr.)"
            valueBool={valuationData?.valuation_bool}
            value={
              valuationData?.valuation_data &&
              Object.keys(valuationData?.valuation_data).length
                ? Object.values(valuationData?.valuation_data)[0][
                    Object.values(valuationData?.valuation_data)[0].length - 1
                  ]?.toString()
                : undefined
            }
            currentYear={
              valuationData?.valuation_data &&
              Object.keys(valuationData?.valuation_data).length
                ? Object.keys(valuationData?.valuation_data)[0]?.toString()
                : "2021"
            }
            changeHandler={handleYearChange}
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
                    borderWidth: 5,
                  },
                },
                y: {
                  grid: {
                    borderDashOffset: 2,
                    borderWidth: 5,
                    borderDash: [15],
                  },
                  ticks: {
                    count: 3,
                  },
                },
                y1: {
                  ticks: {
                    count: 0,
                  },
                  position: "right",
                  grid: {
                    borderWidth: 5,
                    display: false,
                  },
                },
              },
            }}
            data={
              valuationData?.valuation_data
                ? {
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        axis: "y",
                        type: "line",
                        label: "Valuation (₹)",
                        fill: true,
                        data:
                          valuationData?.valuation_data &&
                          Object.keys(valuationData?.valuation_data).length
                            ? Object.values(valuationData?.valuation_data)[0]
                            : [],
                        // backgroundColor: ["rgba(91, 143, 249, .5)"],
                        borderColor: ["#5B8FF9"],
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBorderWidth: 3,
                        pointBackgroundColor: "#fff",
                      },
                    ],
                  }
                : undefined
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ValuationChart
            title="Valuation Chart"
            data={
              valuationData?.valuation_chart[0] && {
                labels: ["Transactions Comparable (in Cr)"],
                datasets: [
                  {
                    type: "bar",
                    label: "Transactions Comparable",
                    backgroundColor: "rgba(240, 140, 121, 1.0)",
                    borderColor: "rgba(140, 140, 140, 0.0)",
                    data: [
                      valuationData?.valuation_chart[0].min,
                      valuationData?.valuation_chart[0].max,
                    ],
                    barPercentage: 0.2,
                  },
                ],
              }
            }
            // matches ? chartDataMobile : chartData
            description="Business valuation determines the economic value of a business"
            options={
              valuationData?.valuation_chart[0]
                ? {
                    indexAxis: "y",
                    layout: {
                      padding: 5,
                    },
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          usePointStyle: true,
                        },
                      },
                      autocolors: false,
                      annotation: {
                        annotations: {
                          line1: {
                            type: "line",
                            xMin:
                              (valuationData?.valuation_chart[0].max -
                                valuationData?.valuation_chart[0].min) /
                              2,
                            xMax:
                              (valuationData?.valuation_chart[0].max -
                                valuationData?.valuation_chart[0].min) /
                              2,
                            borderColor: "#000",
                            borderWidth: 2,
                            // borderDashOffset: 2,
                            borderDash: [6],
                          },
                        },
                      },
                    },
                    tooltips: {
                      mode: "index",
                      intersect: false,
                      displayColors: false,
                    },
                    title: {
                      display: true,
                      text: "Chart.js stackable with Min/Avg/Max",
                    },
                    scales: {
                      y: {
                        // position: "left",
                        stacked: true,
                        ticks: {
                          count: 2,
                        },
                        display: false,
                      },
                      x: {
                        stacked: false,

                        ticks: {
                          count: 4,
                        },
                      },
                    },
                  }
                : {}
            }
            currentYear={currentYear}
            changeHandler={handleYearChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default ValuationPage;

const chartData = {
  labels: ["Transactions Comparable (in Cr)"],
  datasets: [
    {
      type: "bar",
      label: "Transactions Comparable",
      backgroundColor: "rgba(240, 140, 121, 1.0)",
      borderColor: "rgba(140, 140, 140, 0.0)",
      data: [
        [10, 25],
        [0, 0],
        [40, 40],
      ],
      barPercentage: 0.2,
    },
  ],
};

const chartDataMobile = {
  labels: ["Transactions Comparable (in Cr)"],
  datasets: [
    {
      type: "bar",
      label: "",
      backgroundColor: "rgba(240, 140, 121, 1.0)",
      borderColor: "rgba(140, 140, 140, 0.0)",
      data: [
        [10, 25],
        [-40, -40],
        [40, 40],
      ],
      barPercentage: 0.2,
    },
  ],
};

const chartOptions = {
  indexAxis: "y",
  layout: {
    padding: 5,
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
    autocolors: false,
    annotation: {
      annotations: {
        line1: {
          type: "line",
          xMin: "20",
          xMax: "20",
          borderColor: "#000",
          borderWidth: 2,
          // borderDashOffset: 2,
          borderDash: [6],
        },
      },
    },
  },
  tooltips: {
    mode: "index",
    intersect: false,
    displayColors: false,
  },
  title: {
    display: true,
    text: "Chart.js stackable with Min/Avg/Max",
  },
  scales: {
    y: {
      // position: "left",
      stacked: true,
      ticks: {
        count: 2,
      },
      display: false,
    },
    x: {
      stacked: false,

      ticks: {
        count: 4,
      },
    },
  },
};
