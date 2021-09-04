import React, { Props, ReactNode, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import ChartComponent from "../../ChartsComponents/ChartComponent";
import TotalRevenueChart from "../../ChartsWrapper/TotalRevenueChart";
import MRRChart from "../../ChartsWrapper/MRRChart";
import GrossProfitMargin from "../../ChartsWrapper/GrossProfitMargin";
import CustomerChurnRate from "../../ChartsWrapper/CustomerChurnRate";
import LTV2CAC from "../../ChartsWrapper/LTV2CAC";
import MonthlyActiveUsers from "../../ChartsWrapper/MonthlyActiveUsers";
import { OptionInterface } from "../../interfaces";
import { fetchCollection } from "../../fetch";
import { globalContext } from "../../../AppContext";
import PageNotAvaliable from "../../PageNotAvaliable";
import InvestorParticipation from "../../ChartsWrapper/Startups/Tyke/InvestorParticipation";
import InvestorAmountChart from "../../ChartsWrapper/Startups/Tyke/InvestorAmount";
import TotalRegisteredUsers from "../../ChartsWrapper/TotalRegisteredUsers";

const useStyles = makeStyles({
  page: {
    marginTop: "2rem",
  },
});

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const MetricsPage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const theme = useTheme();
  const classes = useStyles();
  const [chartInfo, setChartInfo] = React.useState<null | {
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

  // const renderCharts = (
  //   config: { Header: string | ReactNode; accessor: string }[]
  // ) => {
  //   return config.map((chart) => {
  //     return (
  //       <Grid item lg={6} xs={12}>
  //         <TotalRevenueChart />
  //       </Grid>
  //     );
  //   });
  // };

  const extractData = (data: any[]) => {
    let obj = {};
    if (data.length) {
      data.forEach((item) => {
        obj = {
          ...obj,
          [item.chart_name]: {
            ...item,
          },
        };
      });
      return obj;
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "charts",
      undefined,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const chartData = extractData(res.data);
        setChartInfo(chartData);
      })
      .catch((err) => console.log(err));
  }, [props.selectedStartup]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* {renderCharts(chartsConfig)} */}

      {chartInfo ? (
        <Grid container spacing={3} className={classes.page}>
          {chartInfo?.total_revenue_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <TotalRevenueChart
                // chartInfo={chartInfo?.total_revenue_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.monthly_recurring_revenue_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <MRRChart
                // chartInfo={chartInfo?.monthly_recurring_revenue_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.gross_profit_margin_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <GrossProfitMargin
                // chartInfo={chartInfo?.gross_profit_margin_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.customer_churn_rate_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <CustomerChurnRate
                // chartInfo={chartInfo?.customer_churn_rate_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.monthly_active_users_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <MonthlyActiveUsers
                // chartInfo={chartInfo?.monthly_active_users_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.ltv_to_cac_chart?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <LTV2CAC
                // chartInfo={chartInfo?.ltv_to_cac_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.avg_investor_participation_per_campaign_chart
            ?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <InvestorParticipation
                chartInfo={
                  chartInfo?.avg_investor_participation_per_campaign_chart
                }
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
          {chartInfo?.avg_investor_investment_amount_per_campaign_chart
            ?.investor_view ? (
            <Grid item lg={6} xs={12}>
              <InvestorAmountChart
                chartInfo={
                  chartInfo?.avg_investor_investment_amount_per_campaign_chart
                }
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}

          {chartInfo?.total_registered_users_chart?.show_chart ? (
            <Grid item lg={6} xs={12}>
              <TotalRegisteredUsers
                chartInfo={chartInfo?.total_registered_users_chart}
                selectedStartup={props.selectedStartup}
              />
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      ) : (
        <div style={{ marginTop: "2.5rem", width: "100%", height: "100%" }}>
          <PageNotAvaliable />
        </div>
      )}
    </div>
  );
};

export default MetricsPage;
