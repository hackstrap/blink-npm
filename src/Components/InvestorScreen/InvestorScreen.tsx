import React, { useContext, useState } from "react";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import SettingsView from "./SettingsView/SettingsView";
import Portfolio from "./Portfolio/Portfolio";
import Dashboard from "./Dashboard/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import AppContext, { globalContext } from "../../AppContext";

const useStyles = makeStyles({
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
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "white",
    gap: "2rem",
    marginTop: "1.5rem",
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
  btnStyle: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    fontSize: "1.2rem",
  },
});

const InvestorScreen = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentView, setCurrentView] = useState("portfolio");
  const appContext = useContext(globalContext);

  const renderCurrentView = (view: string | undefined) => {
    switch (view) {
      case "settings":
        return <SettingsView />;
      // case "portfolio":
      //   return <Portfolio />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container maxWidth="lg" className={classes.screen}>
      <div className={classes.navigationBtnContainer}>
        {/* <Button onClick={() => setCurrentView("portfolio")}>
          <HomeOutlinedIcon />
        </Button> */}
        <Button
          onClick={() => {
            appContext?.setCurrentView("dashboard");
            appContext?.setCurrentPage("metrics");
          }}
        >
          <AppsIcon />
        </Button>
        <Button
          onClick={() => {
            appContext?.setCurrentView("settings");
            appContext?.setCurrentPage("profile");
          }}
        >
          <SettingsOutlinedIcon />
        </Button>
      </div>
      <div className={classes.introductionContainer}>
        <Typography variant="h2">
          Welcome to Your Analytics Dashboard
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
          Analytics will help you with key insights from your data and you can
          share the charts with your team or investors.
        </Typography>
      </div>
      {renderCurrentView(appContext?.currentView)}
    </Container>
  );
};

export default InvestorScreen;
