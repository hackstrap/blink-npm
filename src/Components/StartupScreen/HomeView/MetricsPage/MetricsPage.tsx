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
import TotalRevenueChart from "../../../ChartsWrapper/TotalRevenueChart";
import MRRChart from "../../../ChartsWrapper/MRRChart";
import GrossProfitMargin from "../../../ChartsWrapper/GrossProfitMargin";
import CustomerChurnRate from "../../../ChartsWrapper/CustomerChurnRate";
import LTV2CAC from "../../../ChartsWrapper/LTV2CAC";
import MonthlyActiveUsers from "../../../ChartsWrapper/MonthlyActiveUsers";
import { OptionInterface } from "../../../interfaces";
import { fetchCollection } from "../../../fetch";

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
interface PropsInterface {
  selectedStartup: OptionInterface;
}

const MetricsPage = (props: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [chartInfo, setChartInfo] =
    React.useState<null | {
      [key: string]: {
        [key: string]: string | number | boolean;
      };
    }>(null);

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

  const extractData = (data: any[]) => {
    let obj = {};
    data.forEach((item) => {
      obj = {
        ...obj,
        [item.chart_name]: {
          ...item,
        },
      };
    });
    return obj;
  };

  React.useEffect(() => {
    fetchCollection("charts", undefined, props.selectedStartup.accessor).then(
      (res) => {
        const chartData = extractData(res.data);
        setChartInfo(chartData);
      }
    );
  }, []);
  return (
    <div>
      {/* {renderCharts(chartsConfig)} */}
      <Grid container spacing={3} className={classes.page}>
        {chartInfo?.total_revenue_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <TotalRevenueChart
              chartInfo={chartInfo?.total_revenue_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
        {chartInfo?.monthly_recurring_revenue_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <MRRChart
              chartInfo={chartInfo?.monthly_recurring_revenue_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
        {chartInfo?.gross_profit_margin_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <GrossProfitMargin
              chartInfo={chartInfo?.gross_profit_margin_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
        {chartInfo?.customer_churn_rate_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <CustomerChurnRate
              chartInfo={chartInfo?.customer_churn_rate_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
        {chartInfo?.monthly_active_users_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <MonthlyActiveUsers
              chartInfo={chartInfo?.monthly_active_users_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
        {chartInfo?.ltv_to_cac_chart?.show_chart ? (
          <Grid item lg={6} xs={12}>
            <LTV2CAC
              chartInfo={chartInfo?.ltv_to_cac_chart}
              selectedStartup={props.selectedStartup}
            />
          </Grid>
        ) : (
          <div></div>
        )}
      </Grid>
    </div>
  );
};

export default MetricsPage;
