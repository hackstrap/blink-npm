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
      margin: "auto",
      backgroundColor: "#fff",
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
        <option
          onClick={() => {
            setSelectedStartup(option);
          }}
          value={option.accessor}
        >
          {option.Header}
        </option>
      );
    });
  };
  return (
    <div className={classes.screen}>
      <div className={classes.viewContainer}>
        <div className={classes.viewSelectionContainer}>
          <ButtonGroup className={classes.btnGrp}>
            <Button
              variant="contained"
              className={
                appContext?.currentPage === "metrics"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("metrics")}
            >
              Metrics
            </Button>
            <Button
              variant="contained"
              className={
                appContext?.currentPage === "notes"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("notes")}
            >
              Notes
            </Button>
            <Button
              variant="contained"
              className={
                appContext?.currentPage === "valuation"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("valuation")}
            >
              Valuation
            </Button>
          </ButtonGroup>
        </div>
        <Select
          variant="outlined"
          className={classes.startupSelect}
          defaultValue={selectedStartup.accessor}
        >
          {renderStartupOptions(props.startupOptions)}
        </Select>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </div>
  );
};

export default Dashboard;
