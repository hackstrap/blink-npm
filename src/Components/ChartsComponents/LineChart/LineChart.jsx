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
  CircularProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { DateRange } from "react-date-range";
import { globalContext } from "../../../AppContext";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import axios from "axios";
import { KeyDownIcon } from "../../StartupScreen/TablesView/NotesPage/NotesComponent/NotesComponent";
import { Bars } from "@agney/react-loading";
// import ChartPlaceholder from "../../ChartPlaceholder";
Chart.register(...registerables);

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginRight: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "1rem",
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
    dropDownBtn: {
      display: "flex",
      "&:focus": {
        border: "1px solid #0066eb",
        boxShadow: "0 0 1.5pt 1.5pt #78b3ff78",
      },
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

  const appContext = React.useContext(globalContext);
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
      i > parseInt(currentYear) - 100;
      i--
    ) {
      years = [...years, i.toString()];
    }
    return years.map((year, i) => {
      return (
        <MenuItem value={year} key={i}>
          {year}
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.chartContainer} ref={thisContainer}>
      <div className={styles.infoContainer}>
        <div className={classes.title}>
          <Typography variant="h4">{title}</Typography>
        </div>
        <Select
          value={currentYear}
          onChange={(e) => {
            setCurrentYear(e.target.value);
          }}
          variant="outlined"
          className={styles.dropdownButton}
        >
          {renderYearOptions()}
        </Select>
        <div>
          {appContext?.currentScreen === "startupScreen" ? (
            <button
              style={{
                border: "none",
                background: "white",
                marginLeft: "15px",
              }}
              // variant="outlined"
              onClick={(e) => {
                if (thisContainer.current !== null)
                  toPng(thisContainer.current).then(function (dataUrl) {
                    let blob = dataURItoBlob(dataUrl);
                    const file = new File([blob], `${title}.png`, {
                      type: "image/png",
                    });
                    const formData = new FormData();
                    formData.append(`file`, file);
                    axios({
                      method: "post",
                      url: `${appContext.apiRoute}blink/media/upload`,
                      data: formData,
                    })
                      .then((res) => {
                        let location = res.data.uploaded.location;
                        axios({
                          method: "put",
                          url: `${appContext.apiRoute}v1/charts?startup_id=${data.startup_id}`,
                          data: [
                            {
                              ...data.chart_info,
                              chart_image: location,
                            },
                          ],
                          headers: {
                            Authorization: appContext.token,
                          },
                        })
                          .then((res) => {
                            appContext.setSnackbarState({
                              open: true,
                              message: "Chart Image Saved to Cloud",
                            });
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  });
              }}
            >
              <CloudUploadOutlinedIcon />
            </button>
          ) : (
            <div></div>
          )}
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
        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div>
            <div style={{ maxWidth: "50px", margin: "auto", color: "#808080" }}>
              <Bars />
            </div>
            <Typography
              variant="subtitle2"
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                color: "#808080",
              }}
            >
              Charts will be visible when Startup updates data.
            </Typography>
          </div>
        </div>
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

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);
  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}
