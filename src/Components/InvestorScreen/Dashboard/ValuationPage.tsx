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
import { OptionInterface } from "../../interfaces";
import { fetchCollection } from "../../fetch";
import { useContext } from "react";
import { globalContext } from "../../../AppContext";
import { useMemo } from "react";

interface ChartCardInterface {
  title: string;
  value: string;
  options: object;
  data: any;
  currentYear: string;
  changeHandler: Function;
}

interface PropsInterface {
  selectedStartup: OptionInterface;
}

interface InfoCardPropsInterface {
  t1: string;
  v1: string;
  t2: string;
  v2: string;
  t3: string;
  v3: string;
}

interface ValuationChartInterface {
  title: string;
  description?: string;
  data: object;
  options: object;
  currentYear: string;
  changeHandler: Function;
}

interface StartupPieInterface {
  title: string;
  value: string;
  options: object;
  data: object;
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
  },
  chartCardTitle: {
    fontWeight: "bold",
  },
  yearSelect: {
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
          {`  ${val}`}
        </MenuItem>
      );
    });
  }, []);
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
          variant="h3"
          className={classes.chartCardValue}
          style={
            matches
              ? { marginTop: "10%", marginBottom: "10%" }
              : { marginTop: "30%" }
          }
        >
          {value}
        </Typography>
      </div>
      <Divider
        orientation={matches ? "horizontal" : "vertical"}
        style={matches ? { marginBottom: "10%" } : { marginBottom: 0 }}
      />
      <div style={{ display: "flex" }}>
        <ChartWrapper
          type={"pie"}
          data={data}
          options={options}
          gradient={false}
          backgroundColor={""}
        />
        <div>
          <Select
            variant="outlined"
            className={classes.yearSelect}
            value={state}
            onChange={(e) =>
              setState(typeof e.target.value === "string" ? e.target.value : "")
            }
          >
            {renderFilters()}
          </Select>
        </div>
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
  let { t1, v1, t2, v2, t3, v3 } = props;
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
      <Typography
        color="primary"
        variant="h3"
        className={classes.chartCardValue}
      >
        {v1}
      </Typography>
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
            {v2}
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
            {v3}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const ChartCard = (props: ChartCardInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { title, value, options, data, currentYear, changeHandler } = props;
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
          {value}
        </Typography>
      </div>
      <Divider
        orientation={matches ? "horizontal" : "vertical"}
        style={matches ? { marginBottom: "10%" } : { marginBottom: 0 }}
      />
      <div className={classes.chartInfoRight}>
        <div style={{ display: "flex" }}>
          <Select
            className={classes.yearSelect}
            value={currentYear}
            onChange={(e) => changeHandler(e.target.value)}
            variant="outlined"
          >
            {renderYearOptions(changeHandler)}
          </Select>
        </div>

        <ChartWrapper
          type={"line"}
          data={data}
          options={options}
          gradient={true}
          backgroundColor={data.datasets[0].borderColor}
        />
      </div>
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
        <Select
          className={classes.yearSelect}
          value={currentYear}
          onChange={(e) => changeHandler(e.target.value)}
          variant="outlined"
        >
          {renderYearOptions(changeHandler)}
        </Select>
      </div>
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
          <InfoCard
            t1="Current Investment Value (₹)"
            v1="₹ 60,000.00"
            t2="Total Money Invested"
            v2="₹ 30,000.00"
            t3="Multiple"
            v3="2X"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard
            t1="Investment Time"
            v1="2 Months, 4 Days"
            t2="In Days"
            v2="65 Days"
            t3="In Years"
            v3="0.178"
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
                  // backgroundColor: ["rgba(184, 219, 129, .5)"],
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
