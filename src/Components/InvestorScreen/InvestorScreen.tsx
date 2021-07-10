import React, { useContext, useState } from "react";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Select,
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
import { OptionInterface } from "../interfaces";
import { fetchCollection, fetchInvestorInfo } from "../fetch";

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
  navContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export const extractStartupsInvested = (data: any[]) => {
  let idArray: string[] = [];
  data.forEach((item) => {
    if (!idArray.includes(item?.startup_id)) idArray.push(item.startup_id);
  });
  return idArray.map((item) => {
    return {
      Header: item,
      accessor: item,
    };
  });
};

const InvestorScreen = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentView, setCurrentView] = useState("portfolio");
  const [investorInfo, setInvestorInfo] =
    React.useState<null | OptionInterface>(null);

  const appContext = useContext(globalContext);

  const [startupOptions, setStartupOptions] = React.useState<OptionInterface[]>(
    [
      {
        Header: "Startup 1",
        accessor: "startup-1slug",
      },
      {
        Header: "Startup 2",
        accessor: "startup-2slug",
      },
    ]
  );

  const renderCurrentView = (view: string | undefined) => {
    switch (view) {
      case "settings":
        return (
          <SettingsView
            investorInfo={{ Header: "investor 1", accessor: "investor-1slug" }}
          />
        );
      // case "portfolio":
      //   return <Portfolio />;
      default:
        return (
          <Dashboard
            startupOptions={startupOptions}
            setStartupOptions={(value: OptionInterface[]) =>
              setStartupOptions(value)
            }
          />
        );
    }
  };

  React.useEffect(() => {
    appContext?.setCurrentView("dashboard");
    appContext?.setCurrentPage("metrics");
    fetchInvestorInfo("investment", "", "investor-1slug").then((res) => {
      let options = extractStartupsInvested(res.data);
      setStartupOptions(options);
    });
  }, []);

  // const startupOptions = [

  // ];

  const renderOptions = (options: OptionInterface[]) => {
    return options.map((item) => {
      return <option value={item.accessor}>{item.Header}</option>;
    });
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
