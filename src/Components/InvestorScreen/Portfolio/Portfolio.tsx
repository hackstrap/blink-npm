import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

// import MetricsPage from './MetricsPage/MetricsPage'
// import NotesPage from './NotesPage/NotesPage'
import { globalContext } from "../../../AppContext";
import { OptionInterface } from "../../interfaces";
import InvestmentSummary from "./InvestmentSummary";

const useStyles = makeStyles((theme: Theme) => {
  return {
    screen: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    navigationBtnContainer: {
      padding: "2rem",
      borderRadius: 10,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      background: "white",
      gap: "2rem",
    },
    introductionContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
      marginTop: "4rem",
    },
    description: {
      // color: (theme) => theme.palette.grey[600],
    },
    viewContainer: {
      // display: "flex",
      width: "100%",
    },
    viewSelectionContainer: {
      display: "flex",
      margin: "auto",
      marginTop: "4rem",
    },
    btnStyle: {
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      fontSize: "1.2rem",
    },
    startupSelect: {
      marginLeft: "auto",
      backgroundColor: "#fff",
    },
    btnGrp: {
      margin: "auto",
    },
    btnStyleActive: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    btnStyleInactive: {
      backgroundColor: "white",
      color: "#000",
    },
  };
});

const Portfolio = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("metrics");
  // const [selectedStartup, setSelectedStartup] = React.useState(
  //   props.startupOptions[0]
  // );
  const appContext = useContext(globalContext);
  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "investmentOverview":
        return <div>Page 2</div>;
      default:
        return <InvestmentSummary />;
    }
  };

  // const renderStartupOptions = (optionArray: OptionInterface[]) => {
  //   return optionArray.map((option: OptionInterface) => {
  //     return (
  //       <option
  //         onClick={() => {
  //           setSelectedStartup(option);
  //         }}
  //         value={option.accessor}
  //       >
  //         {option.Header}
  //       </option>
  //     );
  //   });
  // };
  return (
    <Container maxWidth="xl" className={classes.screen}>
      <div className={classes.viewContainer}>
        <div className={classes.viewSelectionContainer}>
          <ButtonGroup className={classes.btnGrp}>
            <Button
              variant="contained"
              className={
                appContext?.currentPage !== "investmentOverview"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("investmentSummary")}
            >
              Investment Summary
            </Button>
            {/* <Button
              variant="contained"
              className={
                appContext?.currentPage !== "metrics"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("notes")}
            >
              Notes
            </Button> */}
          </ButtonGroup>
        </div>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </Container>
  );
};

export default Portfolio;

// import React, { useState } from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import {
//   colors,
//   Theme,
//   Container,
//   Typography,
//   Button,
//   ButtonGroup,
//   Grid,
//   Divider,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@material-ui/core";
// import ChartComponent from "../../ChartsComponents/ChartComponent";
// import ChartWrapper from "../../ChartsComponents/ChartWrapper";

// const useStyles = makeStyles({
//   view: {
//     width: "100%",
//     // height: "100%",
//     // padding: "2rem",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   navigationBtnContainer: {
//     padding: "2rem",
//     borderRadius: 10,
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     background: "white",
//     gap: "2rem",
//   },
//   introductionContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "1.5rem",
//     marginTop: "4rem",
//   },
//   description: {
//     // color: (theme) => theme.palette.grey[600],
//   },
//   viewContainer: {
//     // display: "flex",
//     width: "100%",
//   },
//   viewSelectionContainer: {
//     margin: "auto",
//     marginTop: "4rem",
//   },
//   btnStyle: {
//     paddingLeft: "1.5rem",
//     paddingRight: "1.5rem",
//     fontSize: "1.2rem",
//   },
//   summaryContainer: {
//     width: "100%",
//     boxShadow: "2px 2px 9px #bbb",
//     borderRadius: "0.5rem",
//     padding: "64px",
//     paddingTop: "48px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     backgroundColor: "white",
//     marginTop: "64px",
//   },
//   infoContainer: {
//     display: "flex",
//     alignItems: "center",
//     position: "relative",
//     width: "100%",
//     paddingBottom: "1.5rem",
//     marginBottom: "1.5rem",
//     borderBottom: "1px solid #EEEEEE",
//   },
//   chartContainer: {
//     width: "100%",
//     borderLeft: "1px solid #EEEEEE",
//     paddingLeft: "1.5rem",
//   },
//   tableHeading: {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     marginRight: "auto",
//   },
//   columnConfigBtn: {
//     display: "flex",
//     width: "141px",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: "15px",
//     borderRadius: " 0.5rem",
//     boxShadow: "2px 2px 9px #bbb",
//     position: "absolute",
//     zIndex: 20,
//     backgroundColor: "white",
//   },
//   columnConfigBox: {
//     padding: "12px",
//     borderRadius: "4px",
//     border: " 1px solid gray",
//     backgroundColor: "white",
//   },
//   chartInfo: {
//     marginBottom: "3rem",
//   },
//   divider: {
//     width: "100%",
//     backgroundColor: "#777",
//     heigth: "2px",
//   },
//   chartInfoHeader: {
//     marginBottom: "1rem",
//   },
//   investmentInfoBox: {
//     borderBottom: "1px solid #EEEEEE",
//   },
//   chartDescription: {
//     padding: "12px",
//     background: "rgba(50, 144, 237, 0.05)",
//     borderRadius: "10.5px",
//     marginLeft: "1rem",
//     marginTop: "1rem",
//   },
// });

// const data = {
//   labels: [
//     "Jan",
//     "Feb",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
//   datasets: [
//     {
//       axis: "y",
//       label: "My First Dataset",
//       data: [25, 25, 75, 80, 45, 56, 75, 60, 75, 80, 45, 56, 75, 60],
//       fill: false,
//       backgroundColor: ["#0066EB"],
//       borderColor: ["#0066EB"],
//       borderWidth: 1,
//       pointRadius: 4,
//       pointBorderWidth: 3,
//       pointBackgroundColor: "#fff",
//       maxBarThickness: 20,
//     },
//   ],
// };

// const options = {
//   layout: {
//     padding: 20,
//   },
//   scales: {
//     x: {
//       ticks: {
//         font: {
//           size: 12,
//         },
//       },
//       grid: {
//         display: false,
//         borderWidth: 3,
//       },
//       display: true,
//       title: {
//         display: true,
//         text: "Value",
//         color: "#000",
//         font: {
//           size: 12,
//           weight: "bold",
//         },
//       },
//     },
//     y: {
//       grid: {
//         borderDashOffset: 2,
//         borderWidth: 5,
//         borderDash: [15],
//       },
//       ticks: {
//         font: {
//           size: 12,
//         },
//       },
//       display: true,
//       title: {
//         display: true,
//         text: "Value",
//         color: "#000",
//         font: {
//           size: 12,
//           weight: "bold",
//         },
//       },
//     },
//     y1: {
//       ticks: {
//         font: {
//           size: 12,
//         },
//       },
//       grid: {
//         display: false,
//         borderWidth: 5,
//       },
//       position: "right",
//       display: true,
//       title: {
//         display: true,
//         text: "Value",
//         color: "#000",
//         font: {
//           size: 12,
//           weight: "bold",
//         },
//       },
//     },
//   },
// };

// const Portfolio = () => {
//   const theme = useTheme();
//   const classes = useStyles(theme);
//   const [currentPage, setCurrentPage] = useState("expenses");
//   const [showYearConfig, setShowYearConfig] = useState(false);
//   const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
//   const [currentYear, setCurrentYear] = useState("");

//   const renderCurrencyOptions = () => {
//     let currencyList = ["USD", "INR"];
//     return currencyList.map((c, i) => {
//       return <div key={i}>{c}</div>;
//     });
//   };

//   const renderYearOptions = (years: string[]) => {
//     return years.map((year, i) => {
//       return (
//         <div
//           onClick={() => {
//             setShowYearConfig(false);
//             setCurrentYear(year);
//           }}
//           key={i}
//         >
//           {year}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={classes.viewContainer}>
//       {/* {renderCurrentPage(currentPage)} */}
//       <div className={classes.summaryContainer}>
//         <div className={classes.infoContainer}>
//           <div className={classes.tableHeading}>Revenue Data</div>
//           <div>
//             <FormControl variant="outlined">
//               <Select
//                 labelId="demo-simple-select-outlined-label"
//                 id="demo-simple-select-outlined"
//                 value={2021}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={2020}>2020</MenuItem>
//                 <MenuItem value={2021}>2021</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//           <div>
//             <FormControl variant="outlined">
//               <Select
//                 labelId="demo-simple-select-outlined-label"
//                 id="demo-simple-select-outlined"
//                 value={"INR"}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={"INR"}>INR</MenuItem>
//                 <MenuItem value={"USD"}>USD</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </div>
//         <Grid container>
//           <Grid item xs={3}>
//             <Box
//               height="100%"
//               display="flex"
//               flexDirection="column"
//               alignItems="flex-start"
//               marginLeft="1.5rem"
//               // justifyContent="space-around"
//             >
//               <Box
//                 marginBottom={12}
//                 marginTop={12}
//                 className={classes.investmentInfoBox}
//               >
//                 <Typography variant="h4" className={classes.chartInfoHeader}>
//                   Total Invested
//                 </Typography>
//                 <Typography
//                   variant="h1"
//                   color="primary"
//                   className={classes.chartInfo}
//                 >
//                   $20,000,000.
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography variant="h4" className={classes.chartInfoHeader}>
//                   Companies
//                 </Typography>
//                 <Typography
//                   variant="h1"
//                   color="primary"
//                   className={classes.chartInfo}
//                 >
//                   20
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={9} className={classes.chartContainer}>
//             <div className={classes.chartDescription}>
//               Capital amount deployed over time
//             </div>
//             <ChartWrapper data={data} options={options} type="bar" />
//           </Grid>
//         </Grid>
//         {/* <div ></div> */}
//       </div>
//     </div>
//   );
// };

// export default Portfolio;
