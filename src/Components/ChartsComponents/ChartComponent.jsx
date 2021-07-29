import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Chart, registerables } from "chart.js";
import { saveAs } from "file-saver";
import { toSvg, toPng } from "html-to-image";
import annotationPlugin from "chartjs-plugin-annotation";

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
import axios from "axios";
import { globalContext } from "../../AppContext";
import { ContactsTwoTone } from "@material-ui/icons";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { updateCollection } from "../fetch";
import { ChartCard } from "../InvestorScreen/Dashboard/ValuationPage";

Chart.register(annotationPlugin);

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
      width: "100%",
      // display: "flex",
      [theme.breakpoints.down("md")]: {
        minHeight: "400px",
      },
      [theme.breakpoints.down("sm")]: {
        minHeight: "300px",
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
    datePicker: {
      [theme.breakpoints.down("sm")]: {
        marginRight: "auto",
      },
    },
    // dateRangeContainer: {
    //   position: "absolute",
    //   transform: "translateX(-40%)",
    //   [theme.breakpoints.down("sm")]: {
    //     transform: "translateX(0%)",
    //   },
    //   boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.08);",
    //   borderRadius: "1rem",
    //   overflow: "hidden",
    // },
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

const ChartComponent = ({
  title,
  description,
  type,
  data,
  options,
  currentYear,
  setCurrentYear,
  chartControl,
}) => {
  const thisContainer = useRef(null);
  const thisGraph = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);

  const renderChart = (ref) => {
    if (ref.current !== null && data && options) {
      return new Chart(ref.current, {
        type,
        data,
        options: {
          ...options,
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    } else {
    }
  };
  useEffect(() => {
    // console.log("useEffect ran", data);
    const myGraph = renderChart(thisGraph);
    return () => {
      if (myGraph?.destroy) myGraph.destroy();
    };
  }, [options, data, currentYear]);

  // const [dateRange, setDateRange] = React.useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

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
            setShowYearConfig(false);
            setCurrentYear(year);
          }}
          key={i}
        >
          {year}
        </Typography>
      );
    });
  };

  const [showYearConfig, setShowYearConfig] = React.useState(false);

  // const renderRange = (dateRange) => {
  //   const d1 = new Date(dateRange[0].startDate);
  //   const d2 = new Date(dateRange[0].endDate);
  //   return (
  //     new Intl.DateTimeFormat("en-US", { month: "long" }).format(d1) +
  //     " " +
  //     d1.getFullYear() +
  //     " - " +
  //     new Intl.DateTimeFormat("en-US", { month: "long" }).format(d2) +
  //     " " +
  //     d2.getFullYear()
  //   );
  // };

  const appContext = React.useContext(globalContext);

  return (
    <div className={classes.chartContainer}>
      <div ref={thisContainer}>
        <div className={styles.infoContainer}>
          <div className={classes.title}>
            <Typography variant="h4">{title}</Typography>
          </div>
          <div className={classes.datePicker}>
            <Button
              onClick={(e) => {
                setShowYearConfig(!showYearConfig);
              }}
              variant="outlined"
            >
              <Typography variant="body2">{currentYear}</Typography>
            </Button>
            {showYearConfig ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={() => {
                  setShowYearConfig(false);
                }}
              >
                {renderYearOptions()}
              </div>
            ) : (
              <div></div>
            )}
          </div>
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
                  e.target.style.opacity = "0";

                  if (thisContainer.current !== null)
                    toPng(thisContainer.current).then(function (dataUrl) {
                      function dataURItoBlob(dataURI) {
                        // convert base64 to raw binary data held in a string
                        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
                        var byteString = atob(dataURI.split(",")[1]);
                        // separate out the mime component
                        var mimeString = dataURI
                          .split(",")[0]
                          .split(":")[1]
                          .split(";")[0];
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
                          console.log(res);
                          e.target.style.opacity = "1";

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
                              console.log("db updated", res);
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
          <Typography variant="h3">No Data Avaliable for this year</Typography>
        )}
      </div>
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

export default ChartComponent;

// function convertURIToImageData(URI) {
//   return new Promise(function (resolve, reject) {
//     if (URI == null) return reject();
//     var canvas = document.createElement("canvas"),
//       context = canvas.getContext("2d"),
//       image = new Image();
//     image.addEventListener(
//       "load",
//       function () {
//         canvas.width = image.width;
//         canvas.height = image.height;
//         context.drawImage(
//           image,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         resolve(
//           context.getImageData(
//             0,
//             0,
//             canvas.width,
//             canvas.height
//           )
//         );
//       },
//       false
//     );
//     image.src = URI;
//   });
// }

// convertURIToImageData(dataUrl).then(function (imageData) {
//   console.log(imageData);
// });

// <DateRange
//                 startDatePlaceholder={"Start Month"}
//                 endDatePlaceholder={"End Date"}
//                 editableDateInputs={true}
//                 onChange={(item) => {
//
//                   setDateRange([item.selection]);
//                 }}
//                 moveRangeOnFirstSelection={false}
//                 ranges={dateRange}
//                 dateDisplayFormat={"MMM yyyy"}
//               />
