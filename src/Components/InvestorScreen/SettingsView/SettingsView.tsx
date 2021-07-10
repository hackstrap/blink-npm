import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  useControlled,
} from "@material-ui/core";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import DashboardPage from "./DashboardPage/DashboardPage";
import ContactsPage from "./ContactsPage/ContactsPage";
import DatabasePage from "./DatabasePage/DatabasePage";
import { globalContext } from "../../../AppContext";
import { OptionInterface } from "../../interfaces";

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

interface PropsInterface {
  investorInfo: OptionInterface;
}

const SettingsView = (props: PropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("profile");
  const appContext = useContext(globalContext);

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "profile":
        return <ProfileSettings investorInfo={props.investorInfo} />;
      default:
        return <div></div>;
      // case "database":
      //   return <DatabasePage />;
      // case "contact":
      //   return <ContactsPage />;
      // case "dashboard":
      //   return <DashboardPage />;
    }
  };
  return (
    <Container maxWidth="lg" className={classes.screen}>
      <div className={classes.viewContainer}>
        <div className={classes.viewSelectionContainer}>
          <ButtonGroup>
            {/* <Button
              variant="contained"
              className={
                appContext?.currentPage === "dashboard"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("dashboard")}
            >
              Dashboards
            </Button>
            <Button
              variant="contained"
              className={
                appContext?.currentPage === "contact"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("contact")}
            >
              Contact
            </Button>
            <Button
              variant="contained"
              size="large"
              className={
                appContext?.currentPage === "database"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("database")}
            >
              Databases
            </Button> */}
            <Button
              variant="contained"
              size="large"
              className={
                appContext?.currentPage === "profile"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("profile")}
            >
              Profile Setting
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </Container>
  );
};

export default SettingsView;
