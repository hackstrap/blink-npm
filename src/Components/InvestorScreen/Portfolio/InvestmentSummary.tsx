import React, { useContext, useState } from "react";
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
import { globalContext } from "../../../AppContext";
import { fetchInvestorInfoUnity } from "../../fetch";
import { InvestmentSummaryInterface } from "../../interfaces";
import PageNotAvaliable from "../../PageNotAvaliable";
import AnalyticsIsBuilding from "../../ChartsComponents/AnalyticsIsBuilding";
import NoData from "../../NoData";

const useStyles = makeStyles((theme) => ({
  infoCardTitle: {},
  infoCardValue: {},
}));

const InvestmentSummary = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [currentYear, setCurrentYear] = React.useState(
    // new Date().getFullYear().toString()
    "2020"
  );
  const matches = useMediaQuery("(max-width:1300px)");
  const handleYearChange = (year: string) => {
    setCurrentYear(year);
  };
  const [summaryData, setSummaryData] =
    useState<InvestmentSummaryInterface | null>(null);

  const appContext = useContext(globalContext);

  const getData = () => {
    fetchInvestorInfoUnity(
      appContext?.apiRoute,
      appContext?.token,
      "investment_summary",
      currentYear,
      appContext?.userInfo?.accessor
    ).then((res) => {
      if (res.data !== []) {
        setSummaryData(res.data);
      } else {
        setSummaryData(null);
      }
    });
  };

  const getIrrChartData = (summaryData: InvestmentSummaryInterface | null) => {
    return summaryData && summaryData?.agg_net_irr_data[parseInt(currentYear)]
      ? summaryData?.agg_net_irr_data[parseInt(currentYear)]
      : null;
  };

  React.useEffect(() => {
    getData();
  }, [currentYear]);

  return (
    <Container maxWidth="lg">
      {!summaryData?.current_total_investment_value ? (
        <div
          style={{ textAlign: "center", display: "flex", marginTop: "3rem" }}
        >
          <Typography
            style={{ display: "flex", margin: "auto", alignItems: "center" }}
          >
            {`* Data Will be visible on the next valuation update.`}
          </Typography>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {summaryData ? (
        <Grid style={{ marginTop: "2rem" }} container spacing={5}>
          <Grid item xs={12} md={6}>
            <InfoCard
              t1="Current Total Investment Value (???)"
              v1={
                summaryData?.current_total_investment_value
                // summaryData && summaryData?.current_total_investment_value
                //   ? `${summaryData?.current_total_investment_value}`
                //   : undefined
              }
              v1bool={summaryData?.current_total_investment_value_bool}
              t2="Total Investment"
              v2={
                summaryData && summaryData?.total_investment
                  ? `${summaryData?.total_investment}`
                  : undefined
              }
              t3="Aggregate Multiple"
              v3={summaryData?.aggregate_multiple}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              t1="Total Transactions"
              v1={summaryData?.total_transactions?.all_transactions}
              // v1bool={summaryData?.current_total_investment_value_bool}
              t2="Last 3 months"
              v2={summaryData?.total_transactions?.last_three_months}
              t3="This Year"
              v3={summaryData?.total_transactions?.this_year}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard
              title="IRR ( % )"
              value={
                summaryData &&
                summaryData?.agg_net_irr_data[parseInt(currentYear)]
                  ? `${
                      summaryData?.agg_net_irr_data[parseInt(currentYear)][
                        summaryData?.agg_net_irr_data[parseInt(currentYear)]
                          .length - 1
                      ]
                    }`
                  : undefined
              }
              valueBool={summaryData?.agg_net_irr_bool}
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
              data={
                getIrrChartData(summaryData)
                  ? {
                      labels: ["Q1", "Q2", "Q3", "Q4"],
                      datasets: [
                        {
                          axis: "y",
                          type: "line",
                          label: "Valuation (???)",
                          fill: true,
                          data: getIrrChartData(summaryData),
                          // backgroundColor: ["rgba(91, 143, 249, .5)"],
                          borderColor: ["#5B8FF9"],
                          borderWidth: 3,
                          pointRadius: 4,
                          pointBorderWidth: 3,
                          pointBackgroundColor: "#fff",
                        },
                      ],
                    }
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StartupPieChartCard
              title={"Startups"}
              value={
                summaryData?.total_startups
                  ? summaryData?.total_startups.toString()
                  : "0"
              }
              filters={summaryData?.startups_by.map((s) => s.filter)}
              changeHandler={handleYearChange}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
              data={summaryData?.startups_by}
            />
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          {" "}
          <PageNotAvaliable />
        </div>
      )}
    </Container>
  );
};
export default InvestmentSummary;
