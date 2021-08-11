import logo from './logo.svg'
import React, {
  ReactNode,
  useReducer,
  useEffect,
  useState,
  useMemo,
  useContext
} from 'react'
// import 'react-date-range/dist/styles.css' // main css file
// import 'react-date-range/dist/theme/default.css' // theme css file
import clsx from 'clsx'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles'
import { globalContext } from './AppContext'
// import { defaultTheme } from "./theme.ts";
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PieChartIcon from '@material-ui/icons/PieChart'

import StartupScreen from './Components/StartupScreen/StartupScreen'
import InvestorScreen from './Components/InvestorScreen/InvestorScreen'
import { Button, Container, Hidden } from '@material-ui/core'
import './App.css'
const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      background: '#F5F5F5',
      minHeight: '100vh',
      width: '100%'
    },
    mobileNavbar: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'white'
    },
    drawerContainer: {
      position: 'absolute'
    },
    appContainer: {
      width: '100%',
      // paddingLeft: "72px",
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0px'
      }
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerMobile: {
      // padding: "16px",
      width: drawerWidth - 20
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      backgroundColor: 'white'
    },
    drawerClose: {
      backgroundColor: 'white',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    }
  })
)

export default function App() {
  const appContext = useContext(globalContext)
  const theme = useTheme()
  const classes = useStyles(theme)
  const [sidebar, setSidebar] = React.useState(false)
  const [sidebarMobile, setSidebarMobile] = React.useState(false)
  // const [currentScreen, setCurrentScreen] = useState("startupScreen");

  const renderCurrentScreen = (screen: string | undefined) => {
    switch (screen) {
      case 'investorScreen':
        return <InvestorScreen />
      default:
        return <StartupScreen />
    }
  }

  const handleDrawerOpen = () => {
    setSidebar(true)
  }

  const handleDrawerClose = () => {
    setSidebar(false)
  }

  React.useEffect(() => {
    appContext?.setCurrentView('homeView')
    appContext?.setCurrentPage('metrics')
  }, [])

  const renderSidebarContent = (index: number) => {
    switch (index) {
      case 0:
        return sidebar ? (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: sidebar
            })}
          >
            <MenuIcon />
          </IconButton>
        )
      case 1:
        return <TrendingUpIcon />
      default:
        return <PieChartIcon />
    }
  }

  return (
    <div className={classes.root}>
      {/* <Hidden mdUp implementation="css">
        <Toolbar className={classes.mobileNavbar}>
          <IconButton
            edge="start"
            onClick={(e) => setSidebarMobile(!sidebarMobile)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Blink</Typography>
        </Toolbar>

        <Drawer anchor={"left"} open={sidebarMobile}>
          <List className={classes.drawerMobile}>
            <ListItem>
              <IconButton
                onClick={(e) => setSidebarMobile(!sidebarMobile)}
                className={clsx(classes.menuButton, {
                  [classes.hide]: sidebar,
                })}
              >
                <ChevronLeftIcon />
              </IconButton>
            </ListItem>
            <ListItem
              onClick={(e) => appContext?.setCurrentScreen("startupScreen")}
            >
              <TrendingUpIcon
                className={clsx(classes.menuButton, {
                  [classes.hide]: sidebar,
                })}
              />{" "}
              <ListItemText primary={"startupScreen"} />
            </ListItem>
            <ListItem
              onClick={(e) => appContext?.setCurrentScreen("investorScreen")}
            >
              <PieChartIcon
                className={clsx(classes.menuButton, {
                  [classes.hide]: sidebar,
                })}
              />{" "}
              <ListItemText primary={"investorScreen"} />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <div className={classes.drawerContainer}>
          <Drawer
            variant="permanent"
            className={clsx(classes, {
              [classes.drawerOpen]: sidebar,
              [classes.drawerClose]: !sidebar,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: sidebar,
                [classes.drawerClose]: !sidebar,
              }),
            }}
          >
            <List>
              {["", "startupScreen", "investorScreen"].map((text, index) => {
                return (
                  <ListItem
                    button
                    key={text}
                    onClick={() => {
                      appContext?.setCurrentScreen(text);
                    }}
                  >
                    <ListItemIcon>{renderSidebarContent(index)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </div>
      </Hidden> */}
      <div className={classes.appContainer}>
        {renderCurrentScreen(appContext?.currentScreen)}
      </div>
    </div>
  )
}

// import Table from "./Table";
// import { tableConfig } from "./tableUiConfig";
// import companyData from "./CompanyData.json";
// import flattenObject from "./utility/flattenObject";
// import ReactTable from "./ReactTable";
// import {
//   MonthDataInterface,
//   RevenueDataInterface,
//   testData,
//   expensesData,
//   employeeData,
//   teamTable,
//   investorTableData,
//   usersTableData,
//   investorDetailsTableData,
//   teamTableOptions,
//   employeeTableOptions,
// } from "./testData";
// import RevenueTable from "./Components/RevenueTable/RevenueTable";
// import ExpensesTable from "./Components/ExpensesTable/ExpensesTable";
// import DropdownComponent from "./Components/DropdownComponent/DropdownComponent";
// import EmployeeTable from "./Components/EmployeeTable/EmployeeTable";
// import TeamTable from "./Components/Teamtable/TeamTable";
// import InvestorTable from "./Components/InvestorTable/InvestorTable";
// import UsersTable from "./Components/UsersTable/UsersTable";
// import InvestorDetailsTable from "./Components/InvestorDetailsTable/InvestorDetailsTable";
// import BarGraphComponent from "./Components/BarGraphComponent/BarGraphComponent";

// const handleChange = (value: { Header: string; accessor: string } | null) => {
//   console.log(value);
// };

{
  /* <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <ExpensesTable
          data={expensesData}
          changeHandler={(val) => {
            // console.log(val);
            return val;
          }}
        />
      </div>

      <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <TeamTable
          data={teamTable}
          changeHandler={() => {}}
          options={teamTableOptions}
        />
      </div>
      <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <InvestorTable
          data={investorTableData}
          changeHandler={() => {}}
          options={teamTableOptions}
        />
      </div>
      <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <UsersTable data={usersTableData} changeHandler={() => {}} />
      </div>

      <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <InvestorDetailsTable
          data={investorDetailsTableData}
          changeHandler={() => {}}
        />
      </div>

      <div style={{ width: "900px", margin: "auto", marginBottom: "32px" }}>
        <EmployeeTable
          data={employeeData}
          changeHandler={() => {}}
          options={employeeTableOptions}
        />
      </div> */
}

{
  /* <div style={{ width: "250px" }}>
        <DropdownComponent
          options={[
            { Header: "Option 1", accessor: "option1" },
            { Header: "Option 2", accessor: "option2" },
          ]}
          changeHandler={handleChange}
        />
      </div> */
}

//   <div style={{ width: "50%", margin: "auto" }}>
//   <BarGraphComponent
//     title={"Revenue"}
//     description={"Hello"}
//     config={{}}
//   />
// </div>
