import React, { useState, useContext } from "react";
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
import TablesView from "./TablesView/TablesView";
import HomeView from "./HomeView/HomeView";
import { globalContext } from "../../AppContext";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  screen: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navigationBtnContainer: {
    padding: "1.5rem",
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "white",
    gap: "2rem",
    marginTop: "1.5rem",
  },

  description: {
    // color: (theme) => theme.palette.grey[600],
    textAlign: "center",
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
export interface State extends SnackbarOrigin {
  open: boolean;
}

const StartupScreen = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentView, setCurrentView] = useState("tables");
  const appContext = useContext(globalContext);

  const renderCurrentView = (view: string | undefined) => {
    switch (view) {
      case "settings":
        return <SettingsView />;
      case "tables":
        return <TablesView />;
      default:
        return <HomeView />;
    }
  };

  React.useEffect(() => {
    appContext?.setCurrentView("home");
    appContext?.setCurrentPage("metrics");
  }, []);

  return (
    <Container maxWidth="lg" className={classes.screen}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={appContext?.snackbarState.open}
        onClose={() =>
          appContext?.setSnackbarState({
            open: false,
            message: "",
          })
        }
        message={appContext?.snackbarState.message}
        key={"top" + "right"}
      />
      <div className={classes.navigationBtnContainer}>
        <Button
          onClick={() => {
            appContext?.setCurrentView("home");
            appContext?.setCurrentPage("metrics");
          }}
        >
          <HomeOutlinedIcon />
        </Button>
        <Button
          onClick={() => {
            appContext?.setCurrentView("tables");
            appContext?.setCurrentPage("revenue");
          }}
        >
          <ViewCompactOutlinedIcon />
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

      {renderCurrentView(appContext?.currentView)}
    </Container>
  );
};

export default StartupScreen;
