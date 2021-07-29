import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChartWrapper from "../../ChartsComponents/ChartWrapper";
import {
  Divider,
  Typography,
  Select,
  Grid,
  Container,
} from "@material-ui/core";
import { ChartCard, InfoCard } from "../Dashboard/ValuationPage";

const useStyles = makeStyles((theme) => ({
  infoCardTitle: {},
  infoCardValue: {},
  gridItem: {
    height: "100%",
  },
}));

const InvestmentSummary = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const handleYearChange = (year: string) => {
    setCurrentYear(year);
  };

  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "2rem" }} container spacing={5}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="IRR %"
            value="$1,000,000"
            options={{
              scales: {
                x: {
                  grid: {
                    display: false,
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
              },
            }}
            labels={["Q1", "Q2", "Q3", "Q4"]}
            data={[10, 45, 20, 30]}
            currentYear={currentYear}
            changeHandler={handleYearChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard
            t1="IRR"
            v1="$1,000,000"
            t2="IRR"
            v2="$1,000,000"
            t3=""
            v3=""
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default InvestmentSummary;
