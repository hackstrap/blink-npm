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

const useStyles = makeStyles((theme: Theme) => {
  return {
    page: {
      // width: "100%",
      marginTop: "2rem",
      display: "flex",
      [theme.breakpoints.down("md")]: {
        gap: 20,
      },
    },
  };
});

const MetricsPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
    <div>
      <Grid container spacing={3} className={classes.page}>
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
    </div>
  );
};

export default MetricsPage;
