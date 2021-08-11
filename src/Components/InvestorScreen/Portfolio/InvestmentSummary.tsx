import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChartWrapper from "../../ChartsComponents/ChartWrapper";
import {
  Divider,
  Typography,
  Select,
  Grid,
  Container,
  useMediaQuery,
} from "@material-ui/core";
import {
  ChartCard,
  InfoCard,
  StartupPieChartCard,
} from "../Dashboard/ValuationPage";

const useStyles = makeStyles((theme) => ({
  infoCardTitle: {},
  infoCardValue: {},
  gridItem: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "300px",
    },
  },
}));

const InvestmentSummary = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const matches = useMediaQuery("(max-width:1300px)");
  const handleYearChange = (year: string) => {
    setCurrentYear(year);
  };

  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "2rem" }} container spacing={5}>
        <Grid item xs={12} md={6}>
          <InfoCard
            t1="Current Total Investment Value (₹)"
            v1="₹ 8,00,000.00"
            t2="Total Investment"
            v2="₹ 80,000.00"
            t3="Aggregate Multiple"
            v3="10X"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="IRR ( % )"
            value="25%"
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
                  // backgroundColor: ["rgba(91, 143, 249, .5)"],
                  borderColor: ["#5B8FF9"],
                  borderWidth: 3,
                  pointRadius: 4,
                  pointBorderWidth: 3,
                  pointBackgroundColor: "#fff",
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <StartupPieChartCard
            title={"Startups"}
            value="24"
            filters={["Sectors"]}
            changeHandler={handleYearChange}
            options={{
              plugins: {
                legend: {
                  position: "left",
                },
              },
            }}
            data={{
              labels: ["Fintech", "Saas", "FoodTech"],
              datasets: [
                {
                  axis: "y",
                  type: "doughnut",
                  label: "Valuation (₹)",
                  fill: true,
                  data: [10, 45, 20],
                  backgroundColor: ["red", "#4339F2", "#FFB731", "green"],
                  borderWidth: 3,
                  pointRadius: 4,
                  pointBorderWidth: 3,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default InvestmentSummary;
