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
} from "@material-ui/core";
import ProfileSettings from "./ProfileSettings";
import DashboardPage from "./DashboardPage";
import ContactsPage from "./ContactsPage";
import DatabasePage from "./DatabasePage";
import { globalContext } from "../../../AppContext";
import { checkSelection } from "../HomeView/HomeView";

const useStyles = makeStyles((theme: Theme) => {
  return {
    screen: {
      width: "100%",
      height: "100%",
      // padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1.5rem",
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
      alignItems: "center",
      width: "100%",
      marginTop: "2.5rem",
      marginBottom: "1rem",
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
    dropDownBtn: {
      border: "1px solid gray",
      background: "white",
      // padding: "15px",
      // display: "flex",
      "&:focus": {
        border: "1px solid #0066eb",
        boxShadow: "0 0 1.5pt 1.5pt #78b3ff78",
      },
    },
  };
});

const SettingsView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("profile");
  const appContext = useContext(globalContext);

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      default:
        return appContext?.userInfo ? (
          <ProfileSettings selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        );
    }
  };
  return (
    <Container maxWidth="lg" className={classes.screen}>
      <div className={classes.introductionContainer}>
        <Typography variant="h2" align="center">
          Welcome to Your Settings page
        </Typography>
        <Typography align="center" variant="subtitle2">
          Manage your settings here.
        </Typography>
      </div>
      <div className={classes.viewContainer}>
        <div>
          <Select
            className={classes.dropDownBtn}
            variant="outlined"
            value={checkSelection(
              appContext?.currentPage,
              ["profile"],
              "Profile"
            )}
          >
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage("profile");
              }}
              value={"Profile"}
            >
              Profile
            </MenuItem>
          </Select>
        </div>

        <Typography variant="h3" style={{ marginLeft: "auto" }}>
          {appContext?.userInfo?.Header}
        </Typography>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </Container>
  );
};

export default SettingsView;
