import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Chart, registerables } from "chart.js";
import { saveAs } from "file-saver";
import { toSvg, toPng } from "html-to-image";
import {
  Typography,
  Button,
  Box,
  Container,
  makeStyles,
  useTheme,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { DateRange } from "react-date-range";
Chart.register(...registerables);

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginRight: "auto",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      marginBottom: "0.5rem",
    },
    canvas: {
      // minHeight: "400px",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        minHeight: "400px",
      },
    },
    chartContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05);",
      borderRadius: "20px",
      backgroundColor: "white",
      [theme.breakpoints.down("md")]: {
        padding: 16,
        paddingTop: 32,
        paddingBottom: 32,
      },
      [theme.breakpoints.up("lg")]: {
        padding: 32,
      },
    },
    dateRangeContainer: {
      position: "absolute",
      transform: "translateX(-40%)",
      [theme.breakpoints.down("sm")]: {
        transform: "translateX(0%)",
      },
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.08);",
      borderRadius: "1rem",
      overflow: "hidden",
    },
    datePicker: {
      [theme.breakpoints.down("sm")]: {
        marginRight: "auto",
      },
    },
    toggleContainer: {
      marginTop: "16px",
      background: "#F9F9FB",
      padding: "5px",
      borderRadius: "0.5rem",
      marginLeft: "auto",
      fontSize: "0.7rem",
      fontWeight: "semibold",
      display: "flex",
      alignItems: "center",
    },
  };
});
const LineChartComponent = ({
  title,
  description,
  type,
  data,
  options,
  backgroundColor,
  currentYear,
  setCurrentYear,
  chartControl,
}) => {
  const thisContainer = useRef(null);
  const thisGraph = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const renderChart = () => {
    if (thisGraph.current !== null && options) {
      const ctx = thisGraph.current.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 300, 0, 0);
      gradient.addColorStop(1, backgroundColor + "77");
      gradient.addColorStop(0, backgroundColor + "00");
      return new Chart(thisGraph.current, {
        type,
        data,
        options: {
          ...options,
          backgroundColor: gradient,
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    }
  };

  useEffect(() => {
    let myGraph = renderChart();
    return () => {
      if (myGraph?.destroy) myGraph.destroy();
    };
  }, [currentYear, thisGraph.current, data]);

  // const [dateRange, setDateRange] = React.useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: 'selection'
  //   }
  // ])

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // const renderRange = (dateRange) => {
  //   const d1 = new Date(dateRange[0].startDate)
  //   const d2 = new Date(dateRange[0].endDate)
  //   return (
  //     new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d1) +
  //     ' ' +
  //     d1.getFullYear() +
  //     ' - ' +
  //     new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d2) +
  //     ' ' +
  //     d2.getFullYear()
  //   )
  // }

  const renderYearOptions = () => {
    let years = [];
    for (
      let i = new Date().getFullYear();
      i > parseInt(currentYear) - 200;
      i--
    ) {
      years = [...years, i.toString()];
    }
    return years.map((year, i) => {
      return (
        <Typography
          onClick={() => {
            setShowDatePicker(false);
            setCurrentYear(year);
          }}
          key={i}
        >
          {year}
        </Typography>
      );
    });
  };

  return (
    <div className={classes.chartContainer} ref={thisContainer}>
      <div className={styles.infoContainer}>
        <div className={classes.title}>
          <Typography variant="h4">{title}</Typography>
        </div>
        <div className={classes.datePicker}>
          <Button
            onClick={(e) => {
              setShowDatePicker(!showDatePicker);
            }}
            variant="outlined"
          >
            <Typography variant="body2">{currentYear}</Typography>
          </Button>
          {showDatePicker ? (
            <div
              className={styles.columnConfigBox}
              onMouseLeave={() => {
                setShowDatePicker(false);
              }}
            >
              {renderYearOptions()}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <Button
            onClick={(e) => {
              if (thisContainer.current !== null)
                toPng(thisContainer.current).then(function (dataUrl) {
                  saveAs(dataUrl, "blink-chart.png");
                });
            }}
          >
            <GetAppOutlinedIcon />
          </Button>
        </div>
      </div>
      <Typography variant="body2" className={styles.graphDescription}>
        {description}
      </Typography>
      {data ? (
        <div className={styles.tableContainer}>
          <canvas className={classes.canvas} ref={thisGraph}></canvas>
        </div>
      ) : (
        <Typography variant="h3">No Data Avaliable for this year</Typography>
      )}
      {chartControl ? (
        <div className={classes.toggleContainer}>
          <Switch
            size="small"
            color="primary"
            defaultChecked={chartControl.showToInvestor}
            onChange={() => {
              chartControl.updateShowToInvestor(!chartControl.showToInvestor);
            }}
          />
          <span>Investor View</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LineChartComponent;

{
  /* <DateRange
startDatePlaceholder={'Start Month'}
endDatePlaceholder={'End Date'}
editableDateInputs={true}
onChange={(item) => {
  console.log(item)
  console.log(dateRange)
  setDateRange([item.selection])
}}
moveRangeOnFirstSelection={false}
ranges={dateRange}
dateDisplayFormat={'MMM yyyy'}
/> */
}
