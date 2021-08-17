import React, { useContext } from "react";
import { Container, AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import SettingsView from "./SettingsView/SettingsView";
import TablesView from "./TablesView/TablesView";
import HomeView from "./HomeView/HomeView";
import { globalContext } from "../../AppContext";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { EqualizerRounded, SettingsRounded } from "@material-ui/icons";
import styles from "./index.module.css";
const useStyles = makeStyles({
  screen: {
    width: "100%",
    height: "100%",
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
  // },

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

const StartupScreen = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentView, setCurrentView] = useState("tables");
  const appContext = useContext(globalContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
    // set the navigation bar value on initial load
    switch (appContext?.currentView) {
      case "tables":
        setValue(1);
        break;
      case "settings":
        setValue(2);
        break;
      default:
        setValue(0);
        break;
    }
  }, []);

  React.useEffect(() => {
    switch (value) {
      case 1:
        appContext?.setCurrentView("tables");
        break;
      case 2:
        appContext?.setCurrentView("settings");
        break;
      default:
        appContext?.setCurrentView("home");
        break;
    }
  }, [value]);

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
              label="Dashboard"
              icon={<EqualizerRounded style={{ color: "inherit" }} />}
              className={value === 0 ? styles.active : styles.inactive}
              {...a11yProps(0)}
            />
            <Tab
              label="Tables"
              icon={<ViewCompactOutlinedIcon style={{ color: "inherit" }} />}
              className={value === 1 ? styles.active : styles.inactive}
              {...a11yProps(1)}
            />
            <Tab
              label="Settings"
              icon={<SettingsRounded style={{ color: "inherit" }} />}
              className={value === 2 ? styles.active : styles.inactive}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
      </div>

      {renderCurrentView(appContext?.currentView)}
    </Container>
  );
};

export default StartupScreen;
