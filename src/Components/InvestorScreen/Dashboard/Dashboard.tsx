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

import MetricsPage from "./MetricsPage";
import NotesPage from "./NotesPage";
import { globalContext } from "../../../AppContext";
import { OptionInterface } from "../../interfaces";
import ValuationPage from "./ValuationPage";
import { checkSelection } from "../../StartupScreen/HomeView/HomeView";

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
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginTop: "2.5rem",
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
      width: "300px",
      "& .MuiSelect-select:focus": {
        backgroundColor: "white",
      },
    },
    btnGrp: {
      margin: "auto",
      marginBottom: "2rem",
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
    dropDownBtn: {
      border: "1px solid #808080",
      background: "white",
      // padding: "15px",
      // display: "flex",
      "&:focus": {
        border: "1px solid #0066eb",
        boxShadow: "0 0 1.5pt 1.5pt #78b3ff78",
      },
      "& .MuiSelect-select:focus": {
        backgroundColor: "white",
      },
    },
  };
});

interface PropsInterface {
  startupOptions: OptionInterface[];
  setStartupOptions: Function;
}

const Dashboard = (props: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("metrics");
  const [selectedStartup, setSelectedStartup] = React.useState(
    props.startupOptions[0]
  );
  const appContext = useContext(globalContext);
  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "notes":
        return <NotesPage selectedStartup={selectedStartup} />;
      case "valuation":
        return <ValuationPage selectedStartup={selectedStartup} />;
      default:
        return <MetricsPage selectedStartup={selectedStartup} />;
    }
  };

  const renderStartupOptions = (optionArray: OptionInterface[]) => {
    return optionArray.map((option: OptionInterface) => {
      return (
        <MenuItem
          onClick={() => {
            setSelectedStartup(option);
          }}
          value={option.accessor}
        >
          {option.Header}
        </MenuItem>
      );
    });
  };
  return (
    <div className={classes.screen}>
      <div className={classes.introductionContainer}>
        <Typography variant="h2" align="center">
          Welcome to Startup Analytics Dashboard
        </Typography>
        <Typography align="center" variant="subtitle2">
          Find Startup related Metrics and other Updates here.
        </Typography>
      </div>
      <div className={classes.viewContainer}>
        <div style={{ display: "flex" }}>
          <Select
            className={classes.dropDownBtn}
            variant="outlined"
            value={checkSelection(
              appContext?.currentPage,
              ["metrics", "notes", "valuation"],
              "Metrics"
            )}
          >
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage("metrics");
              }}
              value={"Metrics"}
            >
              Metrics
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage("notes");
              }}
              value={"Notes"}
            >
              Notes
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage("valuation");
              }}
              value={"Valuation"}
            >
              Valuation
            </MenuItem>
          </Select>
          <Select
            variant="outlined"
            className={classes.startupSelect}
            defaultValue={selectedStartup.accessor}
          >
            {renderStartupOptions(props.startupOptions)}
          </Select>
        </div>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </div>
  );
};

export default Dashboard;
