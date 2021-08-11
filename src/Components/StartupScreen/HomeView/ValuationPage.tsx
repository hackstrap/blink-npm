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
import { OptionInterface } from "../../interfaces";
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

  const appContext = useContext(globalContext);

  const getData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "valuation",
      currentYear,
      props.selectedStartup.accessor
    );
  };
  React.useEffect(() => {}, [props]);

  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "2rem" }} container spacing={matches ? 2 : 10}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title={"Valuation "}
            value="₹ 6 Cr"
            currentYear={currentYear}
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
            data={{
              labels: ["Q1", "Q2", "Q3", "Q4"],
              datasets: [
                {
                  axis: "y",
                  type: "line",
                  label: "Valuation (₹)",
                  fill: true,
                  data: [10, 45, 20, 30],
                  backgroundColor: ["rgba(184, 219, 129, .5)"],
                  borderColor: ["#A3C272"],
                  borderWidth: 3,
                  pointRadius: 4,
                  pointBorderWidth: 3,
                  pointBackgroundColor: "#fff",
                },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ValuationChart
            title="Valuation Chart"
            data={matches ? chartDataMobile : chartData}
            description="Business valuation determines the economic value of a business"
            options={chartOptions}
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
