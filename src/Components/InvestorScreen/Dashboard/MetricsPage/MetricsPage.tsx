import React, { ReactNode } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import ChartComponent from "../../../ChartsComponents/ChartComponent";
import TotalRevenueChart from "../../../ChartsWrapper/TotalRevenueChart/TotalRevenueChart";
import MRRChart from "../../../ChartsWrapper/MRRChart/MRRChart";
import GrossProfitMargin from "../../../ChartsWrapper/GrossProfitMargin/GrossProfitMargin";
import CustomerChurnRate from "../../../ChartsWrapper/CustomerChurnRate/CustomerChurnRate";
import LTV2CAC from "../../../ChartsWrapper/LTV2CAC/LTV2CAC";
import MonthlyActiveUsers from "../../../ChartsWrapper/MonthlyActiveUsers/MonthlyActiveUsers";

const useStyles = makeStyles({
  page: {
    marginTop: "2rem",
  },
});

const MetricsPage = () => {
  const theme = useTheme();
  const classes = useStyles();

  const chartsConfig = [
    {
      Header: "Hello",
      accessor: "Hello",
    },
    {
      Header: "Hello",
      accessor: "Hello",
    },
    {
      Header: "Hello",
      accessor: "Hello",
    },
  ];

  const renderCharts = (
    config: { Header: string | ReactNode; accessor: string }[]
  ) => {
    return config.map((chart) => {
      return (
        <Grid item lg={6} xs={12}>
          <TotalRevenueChart />
        </Grid>
      );
    });
  };
  return (
    <Grid container spacing={4} className={classes.page}>
      {/* {renderCharts(chartsConfig)} */}
      <Grid item lg={6} xs={12}>
        <TotalRevenueChart />
      </Grid>
      <Grid item lg={6} xs={12}>
        <MRRChart />
      </Grid>
      <Grid item lg={6} xs={12}>
        <GrossProfitMargin />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomerChurnRate />
      </Grid>
      <Grid item lg={6} xs={12}>
        <MonthlyActiveUsers />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LTV2CAC />
      </Grid>
    </Grid>
  );
};

export default MetricsPage;
