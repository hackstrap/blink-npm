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
interface ChartCardInterface {
  title: string;
  value: string;
  options: object;
  labels: string[];
  data: number[];
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
    fontSize: "2rem",
    fontWeight: "bold",
  },
  chartCardTitle: {
    fontWeight: "bold",
  },
  divider: {
    marginRight: "1rem",
    marginLeft: "1rem",
  },
  yearSelect: {
    borderRadius: "10px",
    padding: "0.5rem",
    backgroundColor: "white",
    marginLeft: "auto",
  },
  infoCardTitle: {},
  infoCardValue: {},
  gridItem: {
    height: "100%",
  },
}));

const renderYearOptions = (handleClick: Function) => {
  let years: string[] = [];
  let date = new Date().getFullYear();
  for (let i = date; i > date - 200; i--) {
    years = [...years, i.toString()];
  }
  return years.map((year, i) => {
    return (
      <option
        key={i}
        value={year}
        onClick={() => {
          handleClick(year);
        }}
      >
        {`  ${year}`}
      </option>
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
        variant="h2"
        className={classes.chartCardValue}
      >
        {v1}
      </Typography>
      <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "2.5rem" }}>
          <Typography
            variant="h4"
            className={classes.infoCardTitle}
            style={{ marginBottom: "0.5rem" }}
          >
            {t1}
          </Typography>
          <Typography
            color="primary"
            variant="h3"
            className={classes.infoCardValue}
          >
            {v1}
          </Typography>
        </div>
        <div>
          <Typography
            variant="h4"
            className={classes.infoCardTitle}
            style={{ marginBottom: "0.5rem" }}
          >
            {t1}
          </Typography>
          <Typography
            color="primary"
            variant="h3"
            className={classes.infoCardValue}
          >
            {v1}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const ChartCard = (props: ChartCardInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { title, value, options, labels, data } = props;
  return (
    <div className={classes.chartCardBox}>
      <div className={classes.chartInfoLeft}>
        <Typography variant="h4" className={classes.chartCardTitle}>
          {title}
        </Typography>
        <Typography
          color="primary"
          variant="h2"
          className={classes.chartCardValue}
          style={{ marginTop: "30%" }}
        >
          {value}
        </Typography>
      </div>
      <Divider orientation="vertical" className={classes.divider} />
      <div className={classes.chartInfoRight}>
        <div style={{ display: "flex" }}>
          <select className={classes.yearSelect}>
            {renderYearOptions(() => {
              console.log("Hello");
            })}
          </select>
        </div>

        <ChartWrapper
          type={"line"}
          data={{
            labels,
            datasets: [
              {
                axis: "y",
                type: "line",
                label: title,
                data,
                fill: true,
                // backgroundColor: ["#A3C272"],
                borderColor: ["#A3C272"],
                borderWidth: 3,
                pointRadius: 4,
                pointBorderWidth: 3,
                pointBackgroundColor: "#fff",
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

const ValuationChart = (props: ValuationChartInterface) => {
  let { title, data, description, options } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.chartCardBox}>
      <div style={{ display: "flex", width: "100%" }}>
        <Typography variant="h4" className={classes.chartCardTitle}>
          {title}
        </Typography>
        <select className={classes.yearSelect}>
          {renderYearOptions(() => {
            console.log("Hello");
          })}
        </select>
      </div>
    </div>
  );
};

const ValuationPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
        <Grid item xs={12} md={6}>
          <ValuationChart
            title="Valuation"
            data={{}}
            description="Valuation"
            options={{}}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default ValuationPage;
