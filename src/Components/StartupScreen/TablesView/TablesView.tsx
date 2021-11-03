import React, { useContext, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  ButtonGroup,
  capitalize,
  Select,
  MenuItem
} from '@material-ui/core'

import NotesPage from './NotesPage/NotesPage'
import RevenuePage from './RevenuePage'
import ExpensesPage from './ExpensesPage'
import EmployeePage from './EmployeePage'
import { globalContext } from '../../../AppContext'
import { checkSelection } from '../HomeView/HomeView'
import ProductPage from './ProductPage'
import ValuationPage from './ValuationPage'

const useStyles = makeStyles((theme: Theme) => {
  return {
    view: {
      width: '100%',
      // height: "100%",
      // padding: "2rem",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    navigationBtnContainer: {
      padding: '2rem',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      background: 'white',
      gap: '2rem'
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
      alignItems: 'center',
      width: '100%',
      marginTop: '2.5rem',
      marginBottom: '1rem'
    },
    viewSelectionContainer: {
      margin: 'auto',
      marginTop: '4rem'
      // overflow: "auto",
    },
    btnStyleActive: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    btnStyleInactive: {
      backgroundColor: 'white',
      color: '#000'
    },
    dropDownBtn: {
      border: '1px solid #808080',
      background: 'white',
      // padding: "15px",
      // display: "flex",
      '&:focus': {
        border: '1px solid #0066eb',
        boxShadow: '0 0 1.5pt 1.5pt #78b3ff78'
      }
    }
  }
})

const TablesView = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  // const [currentPage, setCurrentPage] = useState("revenue");
  const appContext = useContext(globalContext)

  const renderCurrentPage = (page: string | undefined) => {
    switch (page) {
      case 'revenue':
        return appContext?.userInfo ? (
          <RevenuePage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        )
      case 'expenses':
        return appContext?.userInfo ? (
          <ExpensesPage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        )
      case 'employee':
        return appContext?.userInfo ? (
          <EmployeePage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        )
      case 'product':
        return appContext?.userInfo ? (
          <ProductPage selectedStartup={appContext.userInfo} />
        ) : (
          <div></div>
        )
      case 'valuation':
        return appContext?.userInfo ? <ValuationPage /> : <div></div>
      default:
        return appContext?.userInfo ? (
          <NotesPage selectedStartup={appContext.userInfo} preview={false} />
        ) : (
          <div></div>
        )
    }
  }
  return (
    <div className={classes.view}>
      <div className={classes.introductionContainer}>
        <Typography variant='h2' align='center'>
          Welcome to Your Tables
        </Typography>
        <Typography align='center' variant='subtitle2'>
          Select the required data table using the dropdown and start entering
          your data.
        </Typography>
      </div>
      <div className={classes.viewContainer}>
        <div>
          <Select
            className={classes.dropDownBtn}
            variant='outlined'
            value={checkSelection(
              appContext?.currentPage,
              [
                'notes',
                'revenue',
                'expenses',
                'employee',
                'product',
                'valuation'
              ],
              'Notes'
            )}
          >
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('notes')
              }}
              value={'Notes'}
            >
              Notes
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('revenue')
              }}
              value={'Revenue'}
            >
              Revenue
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('expenses')
              }}
              value={'Expenses'}
            >
              Expenses
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('employee')
              }}
              value={'Employee'}
            >
              Employee
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('product')
              }}
              value={'Product'}
            >
              Product
            </MenuItem>
            <MenuItem
              onClick={() => {
                appContext?.setCurrentPage('valuation')
              }}
              value={'Valuation'}
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
  )
}

export default TablesView
