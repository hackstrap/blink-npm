import React, { useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChartWrapper from "../../ChartsComponents/ChartWrapper";
import {
  Divider,
  Typography,
  Select,
  Grid,
  Container,
  MenuItem,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  OptionInterface,
  PortfolioDataInterface,
  ValuationDataInterface,
} from "../../interfaces";
import {
  fetchCollection,
  fetchCollectionUnity,
  fetchInvestedStartupSummary,
  fetchInvestorInfo,
} from "../../fetch";
import { useContext } from "react";
import { globalContext } from "../../../AppContext";
import { useMemo } from "react";
import AnalyticsIsBuilding from "../../ChartsComponents/AnalyticsIsBuilding";
import { useState } from "react";
import { ReactNode } from "react";
import { BallTriangle } from "@agney/react-loading";
import NoData from "../../NoData";
import { ArrowDownward, ArrowUpward, Timer3 } from "@material-ui/icons";

interface ChartCardInterface {
  title: string;
  value?: string;
  options: object;
  data: any;
  currentYear: string;
  changeHandler: Function;
  valueBool?: boolean;
}

interface PropsInterface {
  selectedStartup: OptionInterface;
}

interface InfoCardPropsInterface {
  t1: string | undefined;
  v1?: number | string | undefined;
  t2: string | undefined;
  v2?: number | string | undefined;
  t3: string | undefined;
  v3?: number | string | undefined;
  v1bool?: boolean;
}

interface ValuationChartInterface {
  title: string;
  description?: string;
  data: object | undefined;
  options: object;
  currentYear: string;
  changeHandler: Function;
}

interface StartupPieInterface {
  title: string;
  value: string;
  options: object;
  data:
    | {
        data: number[];
        filter: string;
        labels: string[];
      }[]
    | undefined;
  filters: string[];
  changeHandler: Function;
}

const useStyles = makeStyles((theme) => ({
  chartCardBox: {
    height: "100%",
    width: "100%",
    display: "flex",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05);",
    borderRadius: "20px",
    backgroundColor: "white",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      padding: 24,
      paddingTop: 32,
      paddingBottom: 32,
    },
    [theme.breakpoints.up("lg")]: {
      padding: 32,
    },
  },
  chartInfoLeft: {
    display: "flex",
    flexDirection: "column",
  },
  chartInfoRight: {
    display: "flex",
    flexDirection: "column",
  },
  chartCardValue: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  chartCardTitle: {
    fontWeight: "bold",
  },
  yearSelect: {
    borderRadius: "10px",
    backgroundColor: "white",
    marginLeft: "auto",
    // outline: "none",
    // "&:focus": {
    //   border: "1px solid #0066eb",
    //   boxShadow: "0 0 1.5pt 1.5pt #78b3ff78",
    // },
    // "& .MuiSelect-select:focus": {
    //   backgroundColor: "white",
    // },
    border: "1px solid #777",
    padding: "5px 14px",
    fontWeight: "bold",
  },
  yearSelectCustom: {
    borderRadius: "10px",
    backgroundColor: "white",
    marginLeft: "auto",
    outline: "none",
    "&:focus": {
      border: "1px solid #0066eb",
      boxShadow: "0 0 1.5pt 1.5pt #78b3ff78",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "white",
    },
  },
  infoCardTitle: {},
  infoCardValue: {},
  gridItem: {
    height: "100%",
  },
  graphDescription: {
    background: "rgba(50, 144, 237, 0.05)",
    borderRadius: "10.5px",
    padding: " 12px",
    marginBottom: "1rem",
  },
}));

export const StartupPieChartCard = (props: StartupPieInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { title, value, options, data, filters, changeHandler } = props;
  let [state, setState] = React.useState(filters[0]);
  const matches = useMediaQuery("(max-width:1300px)");
  const renderFilters = useCallback(() => {
    return filters.map((val, i) => {
      return (
        <MenuItem key={i} value={val}>
          {` ${val}`}
        </MenuItem>
      );
    });
  }, []);

  let chartData = {};
  data?.forEach((s) => {
    if (s.filter === state) {
      chartData = {
        labels: s.labels.map((label, i) => {
          return label + " " + "(" + s.data[i] + "%" + ")";
        }),
        datasets: [
          {
            axis: "y",
            type: "doughnut",
            label: "Valuation (₹)",
            fill: true,
            data: s.data,
            backgroundColor: [
              "#4339F2",
              "#2D8EFF",
              "#FFB731",
              "#9D53F2",
              "#26ABA4",
              "#F2536D",
              "#4ED4CD",
            ],
            borderWidth: 3,
            pointRadius: 4,
            pointBorderWidth: 3,
          },
        ],
      };
    }
  });

  return (
    <div
      className={classes.chartCardBox}
      style={matches ? { flexDirection: "column" } : { flexDirection: "row" }}
    >
      <div className={classes.chartInfoLeft}>
        <Typography variant="h4" className={classes.chartCardTitle}>
          {title}
        </Typography>
        <Typography
          color="primary"
          variant="h2"
          className={classes.chartCardValue}
          style={
            matches
              ? { marginTop: "10%", marginBottom: "10%", fontSize: "32px" }
              : { marginTop: "30%", fontSize: "32px" }
          }
        >
          {value ? value : <NoData />}
        </Typography>
      </div>
      {/* <Divider
        orientation={matches ? "horizontal" : "vertical"}
        style={matches ? { marginBottom: "10%" } : { marginBottom: 0 }}
      /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Select
          variant="outlined"
          className={classes.yearSelectCustom}
          value={state}
          onChange={(e) =>
            setState(typeof e.target.value === "string" ? e.target.value : "")
          }
        >
          {renderFilters()}
        </Select>

        {data ? (
          <div style={{ marginTop: "1rem", maxHeight: "250px" }}>
            <ChartWrapper
              type={"pie"}
              data={chartData}
              options={options}
              gradient={false}
              backgroundColor={""}
            />
          </div>
        ) : (
          <AnalyticsIsBuilding />
        )}
      </div>
    </div>
  );
};

const renderYearOptions = (handleClick: Function) => {
  let years: string[] = [];
  let date = new Date().getFullYear();
  for (let i = date; i > date - 200; i--) {
    years = [...years, i.toString()];
  }
  return years.map((year, i) => {
    return (
      <MenuItem key={i} value={year}>
        {`  ${year}`}
      </MenuItem>
    );
  });
};

export const InfoCard = (props: InfoCardPropsInterface) => {
  let { t1, v1, t2, v2, t3, v3, v1bool } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.chartCardBox} style={{ flexDirection: "column" }}>
      <Typography
        variant="h4"
        className={classes.chartCardTitle}
        style={{ marginBottom: "0.5rem" }}
      >
        {t1}
      </Typography>
      {typeof v1bool === "boolean" ? (
        <Typography
          color="primary"
          variant="h3"
          className={classes.chartCardValue}
        >
          {v1 !== null && v1 !== undefined ? (
            v1bool ? (
              <React.Fragment>
                <span style={{ marginRight: "15px" }}>{v1}</span>
                <ArrowUpward style={{ color: "#53BB53" }} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span style={{ marginRight: "15px" }}>{v1}</span>
                <ArrowDownward style={{ color: "F34848" }} />
              </React.Fragment>
            )
          ) : (
            <NoData />
          )}
        </Typography>
      ) : (
        <Typography
          color="primary"
          variant="h3"
          className={classes.chartCardValue}
        >
          {v1 !== null && v1 !== undefined ? v1 : <NoData />}
        </Typography>
      )}

      <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "2.5rem" }}>
          <Typography
            className={classes.infoCardTitle}
            style={{ marginBottom: "0.5rem" }}
          >
            {t2}
          </Typography>
          <Typography
            color="primary"
            variant="h3"
            className={classes.infoCardValue}
          >
            {v2 !== null && v2 !== undefined ? v2 : <NoData />}
          </Typography>
        </div>
        <div>
          <Typography
            className={classes.infoCardTitle}
            style={{ marginBottom: "0.5rem" }}
          >
            {t3}
          </Typography>
          <Typography
            color="primary"
            variant="h3"
            className={classes.infoCardValue}
          >
            {v3 !== null && v3 !== undefined ? v3 : <NoData />}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const ChartCard = (props: ChartCardInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { title, value, options, data, currentYear, changeHandler, valueBool } =
    props;
  const matches = useMediaQuery("(max-width:1300px)");
  return (
    <div
      className={classes.chartCardBox}
      style={matches ? { flexDirection: "column" } : { flexDirection: "row" }}
    >
      <div className={classes.chartInfoLeft}>
        <Typography variant="h4" className={classes.chartCardTitle}>
          {title}
        </Typography>
        {typeof valueBool === "boolean" ? (
          <Typography
            color="primary"
            variant="h3"
            className={classes.chartCardValue}
            style={
              matches
                ? { marginTop: "10%", marginBottom: "10%" }
                : { marginTop: "30%" }
            }
          >
            {data && value !== null && value !== undefined ? (
              valueBool ? (
                <React.Fragment>
                  <span style={{ marginRight: "15px" }}>{value}</span>{" "}
                  <ArrowUpward style={{ color: "#53BB53" }} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span style={{ marginRight: "15px" }}>{value}</span>{" "}
                  <ArrowDownward style={{ color: "F34848" }} />
                </React.Fragment>
              )
            ) : (
              <NoData />
            )}
          </Typography>
        ) : (
          <Typography
            color="primary"
            variant="h3"
            className={classes.chartCardValue}
            style={
              matches
                ? { marginTop: "10%", marginBottom: "10%" }
                : { marginTop: "30%" }
            }
          >
            {data && value !== null && value !== undefined ? value : <NoData />}
          </Typography>
        )}
      </div>

      {data && value ? (
        <React.Fragment>
          <Divider
            orientation={matches ? "horizontal" : "vertical"}
            style={matches ? { marginBottom: "10%" } : { marginBottom: 0 }}
          />
          <div className={classes.chartInfoRight}>
            <div style={{ display: "flex" }}>
              {/* <Select
                className={classes.yearSelect}
                value={currentYear}
                onChange={(e) => changeHandler(e.target.value)}
                variant="outlined"
              >
                {renderYearOptions(changeHandler)}
              </Select> */}
              <Typography className={classes.yearSelect}>
                {currentYear}
              </Typography>
            </div>
            <ChartWrapper
              type={"line"}
              data={data}
              options={options}
              gradient={true}
              backgroundColor={data.datasets[0].borderColor}
            />
          </div>
        </React.Fragment>
      ) : (
        <AnalyticsIsBuilding />
      )}
    </div>
  );
};

export const ValuationChart = (props: ValuationChartInterface) => {
  let { title, data, description, options, changeHandler, currentYear } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div
      className={classes.chartCardBox}
      style={{ flexDirection: "column", height: "100%" }}
    >
      <div style={{ display: "flex", width: "100%", marginBottom: "1rem" }}>
        <Typography variant="h4" className={classes.chartCardTitle}>
          {title}
        </Typography>
        <Typography className={classes.yearSelect}>{currentYear}</Typography>
      </div>
      {data ? (
        <React.Fragment>
          <Typography variant="body2" className={classes.graphDescription}>
            {description}
          </Typography>
          <div style={{ width: "100%", display: "flex", marginTop: "3rem" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <ChartWrapper
                type="line"
                data={data}
                options={options}
                gradient={true}
                backgroundColor={"#5B8FF9"}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <AnalyticsIsBuilding />
      )}
    </div>
  );
};

const ValuationPage = (props: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const matches = useMediaQuery("(max-width:500px)");

  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const handleYearChange = (year: string) => {
    setCurrentYear(year);
  };

  const [valuationData, setValuationData] =
    useState<ValuationDataInterface | null>(null);
  const [portfolioData, setPortfolioData] =
    useState<PortfolioDataInterface | null>(null);

  const appContext = useContext(globalContext);

  const getValuationData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "valuation",
      undefined,
      props.selectedStartup.accessor
    ).then((res) => {
      if (res.data.length) {
        setValuationData(res.data[0]);
      } else {
        setValuationData(null);
      }
    });
  };

  const getInvestedStartupInfo = () => {
    fetchInvestedStartupSummary(
      appContext?.apiRoute,
      appContext?.token,
      "startup_summary",
      appContext?.userInfo?.accessor,
      props.selectedStartup.accessor
    ).then((res) => {
      if (res.data) {
        setPortfolioData(res.data);
      } else {
        setPortfolioData(null);
      }
    });
  };
  React.useEffect(() => {
    getValuationData();
  }, [props.selectedStartup, currentYear]);

  React.useEffect(() => {
    getInvestedStartupInfo();
  }, [props.selectedStartup]);

  console.log(valuationData, portfolioData);

  return (
    <Container maxWidth="lg">
      {!valuationData && portfolioData ? (
        <div style={{ textAlign: "center", display: "flex" }}>
          <Typography
            style={{ display: "flex", margin: "auto", alignItems: "center" }}
          >
            <div style={{ marginRight: "15px" }}>
              <NoData />
            </div>
            {`Data Will be visible on the next valuation update.`}
          </Typography>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <Grid style={{ marginTop: "2rem" }} container spacing={matches ? 2 : 10}>
        <Grid item xs={12} md={6}>
          <InfoCard
            t1="Current Investment Value (₹)"
            v1={portfolioData?.current_investment_value}
            v1bool={portfolioData?.current_investment_value_bool}
            t2="Total Money Invested"
            v2={portfolioData?.total_money_invested?.toString()}
            t3="Multiple"
            v3={portfolioData?.startup_multiple?.toString()}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard
            t1="Investment Time"
            v1={
              portfolioData?.investment_time
                ? portfolioData?.investment_time?.in_year_month_day[0] +
                  " Years " +
                  portfolioData?.investment_time?.in_year_month_day[1] +
                  " Months "
                : undefined
            }
            t2="In Days"
            v2={portfolioData?.investment_time?.in_days.toString()}
            t3="Total Transactions"
            v3={portfolioData?.investment_time?.startup_total_number_of_transactions.toString()}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard
            title={"IRR (%)"}
            valueBool={portfolioData?.startup_net_irr_bool}
            value={
              portfolioData?.startup_net_irr_data &&
              Object.keys(portfolioData?.startup_net_irr_data).length
                ? Object.values(portfolioData?.startup_net_irr_data)[0][
                    -1
                  ]?.toString()
                : undefined
            }
            currentYear={
              portfolioData?.startup_net_irr_data &&
              Object.keys(portfolioData?.startup_net_irr_data).length
                ? Object.keys(
                    portfolioData?.startup_net_irr_data
                  )[0]?.toString()
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
              portfolioData?.startup_net_irr_data
                ? {
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        axis: "y",
                        type: "line",
                        label: "Valuation (₹)",
                        fill: true,
                        data:
                          portfolioData?.startup_net_irr_data &&
                          Object.keys(portfolioData?.startup_net_irr_data)
                            .length
                            ? Object.values(
                                portfolioData?.startup_net_irr_data
                              )[0]
                            : [],
                        // backgroundColor: ["rgba(184, 219, 129, .5)"],
                        borderColor: ["#A3C272"],
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
                        label: "Valuation (₹Cr.) ",
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
                    label: "Transactions Comparable (in Cr)",
                    backgroundColor: "#5222D0",
                    borderColor: "#5222D0",
                    height: 15,
                    data: [
                      [
                        valuationData?.valuation_chart[0].min,
                        valuationData?.valuation_chart[0].max,
                      ],
                    ],
                    barPercentage: 0.4,
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
                              valuationData?.valuation_data &&
                              Object.keys(valuationData?.valuation_data).length
                                ? Object.values(
                                    valuationData?.valuation_data
                                  )[0][
                                    Object.values(
                                      valuationData?.valuation_data
                                    )[0].length - 1
                                  ]?.toString()
                                : 0,
                            xMax:
                              valuationData?.valuation_data &&
                              Object.keys(valuationData?.valuation_data).length
                                ? Object.values(
                                    valuationData?.valuation_data
                                  )[0][
                                    Object.values(
                                      valuationData?.valuation_data
                                    )[0].length - 1
                                  ]?.toString()
                                : 0,
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
