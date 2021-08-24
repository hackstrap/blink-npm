import React, { useContext, useState } from "react";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Select,
  Snackbar,
  Tabs,
  Tab,
  Box,
  AppBar,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import SettingsView from "./SettingsView/SettingsView";
import Portfolio from "./Portfolio/Portfolio";
import Dashboard from "./Dashboard/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import { globalContext } from "../../AppContext";
import { OptionInterface } from "../interfaces";
import { fetchInvestorInfo, fetchInvestorInfoUnity } from "../fetch";
import { EqualizerRounded, PieChartRounded } from "@material-ui/icons";
import styles from "./index.module.css";
import PageNotAvaliable from "../PageNotAvaliable";

const useStyles = makeStyles({
  screen: {
    width: "100%",
    height: "100%",
    // padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // navigationBtnContainer: {
  //   paddingTop: "1rem",
  //   paddingBottom: "1rem",
  //   borderRadius: 20,
  //   display: "flex",
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   background: "white",
  //   gap: "2rem",
  //   marginTop: "1.5rem",
  //   color: "#777",
  //   boxShadow: "none",
  //   "& .MuiTab-textColorPrimary": {
  //     color: "gray !important",
  //   },
  //   "& .MuiTab-textColorPrimary.Mui-selected": {
  //     color: "#0066eb !important",
  //   },
  // },
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const InvestorScreen = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentView, setCurrentView] = useState("portfolio");
  const [investorInfo, setInvestorInfo] =
    React.useState<null | OptionInterface>(null);

  const appContext = useContext(globalContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [startupOptions, setStartupOptions] = React.useState<
    OptionInterface[] | null
  >(null);

  const renderCurrentView = (view: string | undefined) => {
    switch (view) {
      case "settings":
        return appContext?.userInfo ? (
          <SettingsView investorInfo={appContext?.userInfo} />
        ) : (
          <div></div>
        );
      case "portfolio":
        return appContext?.userInfo ? <Portfolio /> : <div></div>;
      default:
        return (
          <Dashboard
            startupOptions={startupOptions ? startupOptions : []}
            setStartupOptions={(value: OptionInterface[]) =>
              setStartupOptions(value)
            }
          />
        );
    }
  };

  const getStartupList = () => {
    fetchInvestorInfoUnity(
      appContext?.apiRoute,
      appContext?.token,
      "investor_startups",
      undefined,
      appContext?.userInfo?.accessor
    )
      .then((res) => {
        if (!Array.isArray(res?.data)) {
          let updatedList = Object.values(res.data).map((s: any) => {
            return {
              Header: s.startup_name,
              accessor: s.startup_id,
            };
          });
          setStartupOptions(updatedList);
        } else {
          setStartupOptions(null);
        }
      })
      .catch((err) => {
        setStartupOptions(null);
      });
  };

  React.useEffect(() => {
    // set the navigation bar value on initial load
    getStartupList();
    switch (appContext?.currentView) {
      case "dashboard":
        setValue(1);
        break;
      default:
        setValue(0);
        break;
    }
  }, []);

  React.useEffect(() => {
    switch (value) {
      case 1:
        appContext?.setCurrentView("dashboard");
        break;
      // case 2:
      //   appContext?.setCurrentView("settings");
      //   break;
      default:
        appContext?.setCurrentView("portfolio");
        break;
    }
  }, [value]);
  // const startupOptions = [

  // ];

  const renderOptions = (options: OptionInterface[]) => {
    return options.map((item) => {
      return <option value={item.accessor}>{item.Header}</option>;
    });
  };
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
      <div>
        <AppBar position="static" className={styles.navigationBtnContainer}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Portfolio"
              icon={<PieChartRounded style={{ color: "inherit" }} />}
              className={value === 0 ? styles.active : styles.inactive}
              {...a11yProps(0)}
            />
            <Tab
              label="Dashboard"
              icon={<EqualizerRounded style={{ color: "inherit" }} />}
              className={value === 1 ? styles.active : styles.inactive}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
      </div>
      {startupOptions ? (
        renderCurrentView(appContext?.currentView)
      ) : (
        <Container style={{ marginTop: "3rem" }}>
          <PageNotAvaliable />
        </Container>
      )}
    </Container>
  );
};

export default InvestorScreen;
