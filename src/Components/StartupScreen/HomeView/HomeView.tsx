import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Select,
  capitalize,
} from "@material-ui/core";

import MetricsPage from "./MetricsPage";
import NotesPage from "../TablesView/NotesPage/NotesPage";
import { globalContext } from "../../../AppContext";
import ValuationPage from "./ValuationPage";
import { KeyDownIcon } from "../TablesView/NotesPage/NotesComponent/NotesComponent";

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
    menuStyle: {
      root: {
        "&:focus": {
          backgroundColor: theme.palette.primary.main,
          "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
            color: theme.palette.common.white,
          },
        },
      },
    },
  };
});

export const checkSelection = (
  option: string | undefined,
  array: string[],
  defaultValue: string
) => {
  // This function checks if currentPage is avaliable on currentView
  if (option && array.includes(option)) {
    let arr = option.split(" ");
    arr = arr.map((w) => capitalize(w));
    return arr.join(" ");
  } else {
    return defaultValue;
  }
};

const HomeView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("metrics");
  const appContext = useContext(globalContext);

  console.log(appContext?.currentPage);

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "notes":
        return appContext?.userInfo ? (
          <NotesPage selectedStartup={appContext.userInfo} preview={true} />
        ) : (
          <div></div>
        );
      case "valuation":
        return appContext?.userInfo ? (
          <ValuationPage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        );
      default:
        return appContext?.userInfo ? (
          <MetricsPage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
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
        <div>
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
        </div>

        {/* <Typography variant="h3" style={{ marginLeft: "auto" }}>
          {appContext?.userInfo?.Header}
        </Typography> */}
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </div>
  );
};

export default HomeView;
