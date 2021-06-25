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

import NotesPage from "./NotesPage/NotesPage";
import RevenuePage from "./RevenuePage/RevenuePage";
import ExpensesPage from "./ExpensesPage/ExpensesPage";
import EmployeePage from "./EmployeePage/EmployeePage";
import { globalContext } from "../../../AppContext";

const useStyles = makeStyles((theme: Theme) => {
  return {
    view: {
      width: "100%",
      // height: "100%",
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
    viewContainer: {
      display: "flex",
      width: "100%",
    },
    viewSelectionContainer: {
      margin: "auto",
      marginTop: "4rem",
      // overflow: "auto",
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

const TablesView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentPage, setCurrentPage] = useState("revenue");
  const appContext = useContext(globalContext);

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case "revenue":
        return <RevenuePage />;
      case "expenses":
        return <ExpensesPage />;
      case "employee":
        return <EmployeePage />;
      default:
        return <NotesPage />;
    }
  };
  return (
    <div className={classes.view}>
      <div className={classes.viewContainer}>
        <div className={classes.viewSelectionContainer}>
          <ButtonGroup>
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
                appContext?.currentPage === "revenue"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("revenue")}
            >
              Revenue
            </Button>
            <Button
              variant="contained"
              className={
                appContext?.currentPage === "expenses"
                  ? classes.btnStyleActive
                  : classes.btnStyleInactive
              }
              onClick={() => appContext?.setCurrentPage("expenses")}
            >
              Expenses
            </Button>
            {/* <Button
            variant="contained"
            className={appContext?.currentPage === "employee" ? classes.btnStyleActive : classes.btnStyleInactive}
            onClick={() => appContext?.setCurrentPage("employee")}
          >
            Employee
          </Button> */}
          </ButtonGroup>
        </div>
      </div>
      {renderCurrentPage(appContext?.currentPage)}
    </div>
  );
};

export default TablesView;
