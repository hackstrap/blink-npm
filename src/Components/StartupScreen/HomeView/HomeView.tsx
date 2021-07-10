import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import MetricsPage from "./MetricsPage/MetricsPage";
import NotesPage from "../TablesView/NotesPage/NotesPage";
import { globalContext } from "../../../AppContext";

const useStyles = makeStyles((theme: Theme) => {
  return {
    screen: {
      width: "100%",
      height: "100%",
      // padding: "2rem",
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
      width: "100%",
    },
    viewSelectionContainer: {
      margin: "auto",
      marginTop: "4rem",
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

const HomeView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("metrics");
  const appContext = useContext(globalContext);

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "notes":
        return (
          <NotesPage
            selectedStartup={{ Header: "Startup 1", accessor: "startup-1slug" }}
          />
        );
      default:
        return (
          <MetricsPage
            selectedStartup={{ Header: "Startup 1", accessor: "startup-1slug" }}
          />
        );
    }
  };
  return (
    <div className={classes.screen}>
      <div className={classes.introductionContainer}>
        <Typography variant="h2" align="center">
          Welcome to Your Analytics Dashboard
        </Typography>
        <Typography align="center" variant="subtitle2">
          Analytics will help you with key insights from your data and you can
          share the charts with your team or investors.
        </Typography>
      </div>
      <div className={classes.viewContainer}>
        <div className={classes.viewSelectionContainer}>
          <ButtonGroup>
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
                appContext?.currentPage !== "metrics"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("notes")}
            >
              Notes
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </div>
  );
};

export default HomeView;
