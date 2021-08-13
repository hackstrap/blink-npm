import React, { useContext, useState } from 'react'
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
  AppBar
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ViewCompactOutlinedIcon from '@material-ui/icons/ViewCompactOutlined'
import SettingsView from './SettingsView/SettingsView'
import Portfolio from './Portfolio/Portfolio'
import Dashboard from './Dashboard/Dashboard'
import AppsIcon from '@material-ui/icons/Apps'
import { globalContext } from '../../AppContext'
import { OptionInterface } from '../interfaces'
import { fetchInvestorInfo } from '../fetch'
import { EqualizerRounded, PieChartRounded } from '@material-ui/icons'

const useStyles = makeStyles(
  {
    screen: {
      width: '100%',
      height: '100%',
      // padding: "2rem",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    navigationBtnContainer: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      background: 'white',
      gap: '2rem',
      marginTop: '1.5rem',
      color: '#777',
      boxShadow: 'none',
      '& .MuiTab-textColorPrimary': {
        color: 'gray'
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#0066eb'
      }
    },
    introductionContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      marginTop: '4rem'
    },
    description: {
      // color: (theme) => theme.palette.grey[600],
    },
    viewContainer: {
      display: 'flex',
      width: '100%'
    },
    viewSelectionContainer: {
      margin: 'auto',
      marginTop: '4rem'
    },
    btnStyle: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      fontSize: '1.2rem'
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center'
    }
  },
  { index: 1 }
)

export const extractStartupsInvested = (data: any[]) => {
  let idArray: string[] = []
  data.forEach((item) => {
    if (!idArray.includes(item?.startup_id)) idArray.push(item.startup_id)
  })
  return idArray.map((item) => {
    return {
      Header: item,
      accessor: item
    }
  })
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
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
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  }
}

const InvestorScreen = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  // const [currentView, setCurrentView] = useState("portfolio");
  const [investorInfo, setInvestorInfo] =
    React.useState<null | OptionInterface>(null)

  const appContext = useContext(globalContext)
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const [startupOptions, setStartupOptions] = React.useState<OptionInterface[]>(
    [
      {
        Header: 'Startup 1',
        accessor: 'startup-1slug'
      },
      {
        Header: 'Startup 2',
        accessor: 'startup-2slug'
      }
    ]
  )

  const renderCurrentView = (view: string | undefined) => {
    switch (view) {
      case 'settings':
        return appContext?.userInfo ? (
          <SettingsView investorInfo={appContext?.userInfo} />
        ) : (
          <div></div>
        )
      case 'portfolio':
        return appContext?.userInfo ? <Portfolio /> : <div></div>
      default:
        return (
          <Dashboard
            startupOptions={startupOptions}
            setStartupOptions={(value: OptionInterface[]) =>
              setStartupOptions(value)
            }
          />
        )
    }
  }

  React.useEffect(() => {
    // set the navigation bar value on initial load
    switch (appContext?.currentView) {
      case 'dashboard':
        setValue(1)
        break
      default:
        setValue(0)
        break
    }
  }, [])

  React.useEffect(() => {
    switch (value) {
      case 1:
        appContext?.setCurrentView('dashboard')
        break
      // case 2:
      //   appContext?.setCurrentView("settings");
      //   break;
      default:
        appContext?.setCurrentView('portfolio')
        break
    }
  }, [value])
  // const startupOptions = [

  // ];

  const renderOptions = (options: OptionInterface[]) => {
    return options.map((item) => {
      return <option value={item.accessor}>{item.Header}</option>
    })
  }
  return (
    <Container maxWidth='lg' className={classes.screen}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={appContext?.snackbarState.open}
        onClose={() =>
          appContext?.setSnackbarState({
            open: false,
            message: ''
          })
        }
        message={appContext?.snackbarState.message}
        key={'top' + 'right'}
      />
      <div>
        <AppBar position='static' className={classes.navigationBtnContainer}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='on'
            indicatorColor='primary'
            textColor='primary'
            aria-label='scrollable force tabs example'
          >
            <Tab
              label='Portfolio'
              icon={<PieChartRounded />}
              {...a11yProps(0)}
            />
            <Tab
              label='Dashboard'
              icon={<EqualizerRounded />}
              {...a11yProps(1)}
            />
            {/* <Tab
              label="Settings"
              icon={<SettingsRounded />}
              {...a11yProps(2)}
            /> */}
          </Tabs>
        </AppBar>
      </div>
      {renderCurrentView(appContext?.currentView)}
    </Container>
  )
}

export default InvestorScreen
