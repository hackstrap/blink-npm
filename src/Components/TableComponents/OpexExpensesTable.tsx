import {
  Button,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useTheme
} from '@material-ui/core'
import React, {
  useState,
  useEffect,
  useReducer,
  ReactNode,
  useMemo
} from 'react'
import Table, { TableConfig, TableUIConfig } from '../../Table'
import styles from './commonTableStyle.module.css'

interface YearDataInterface {
  [key: string]: (string | number)[][]
}
interface OptionInterface {
  Header: string
  accessor: string
}
interface TableDataInterface {
  currency?: string
  fields: OptionInterface[]
  data: YearDataInterface
}

interface TablePropsInterface {
  data: TableDataInterface
  changeHandler: (data: TableDataInterface) => void
}
interface ActionInterface {
  type: string
  payload?: any
}

interface ExpenseTableRowInterface {
  [key: string]: string | number | ReactNode
}

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth

const useStyles = makeStyles((theme: Theme) => {
  return {
    mainTableContainer: {
      width: '100%',
      height: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05);',
      borderRadius: '20px',
      padding: '64px',
      paddingTop: '48px',
      [theme.breakpoints.down('md')]: {
        padding: '15px',
        paddingTop: '32px',
        paddingBottom: '32px'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: 'white'
    },
    infoContainer: {
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        gap: 15,
        flexDirection: 'column',
        alignItems: 'flex-start'
      },
      display: 'flex',
      width: '100%'
    },
    btnGroup: {
      display: 'flex',
      marginLeft: 'auto',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0
      }
    }
  }
})

const OpexExpensesTable = ({ data, changeHandler }: TablePropsInterface) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [currentYear, setCurrentYear] = useState('2020')
  const [showYearConfig, setShowYearConfig] = useState(false)
  const [saveChangesBtn, setSaveChangesBtn] = useState(false)

  const monthsArray = [
    'janurary',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ]

  const addMonth = (year: (string | number)[][], payload: any) => {
    let data = [...year]
    data[payload.index] = [payload.monthName, 0, 0, 0]
    return data
  }

  const removeMonth = (year: (string | number)[][], payload: any) => {
    let data = [...year]
    data[payload.index] = []
    return data
  }

  const tooltipArray = [
    {
      heading: 'Operating Expenses',
      description: (
        <div>
          <p>
            An operating expense is an expense a business incurs through its
            normal business operations. Often abbreviated as OPEX, operating
            expenses include rent, equipment, inventory costs, marketing,
            payroll, insurance, step costs, and funds allocated for research and
            development.
          </p>
        </div>
      )
    },
    {
      heading: 'General & Administrative Expenses',
      description: (
        <div>
          <p>
            General and administrative (G&A) expenses are incurred in the
            day-to-day operations of a business and may not be directly tied to
            a specific function or department within the company.
          </p>
        </div>
      )
    },
    {
      heading: 'Sales & Marketing Expenses',
      description: (
        <div>
          <p>
            Sales and Marketing Expenses means those Internal Expenses and
            External Expenses incurred by a Party that are directly or
            reasonably allocable to sales, promotion, and marketing of a
            Product, etc.
          </p>
        </div>
      )
    },
    {
      heading: 'Research & Development Expenses',
      description: (
        <div>
          <p>
            Research and development (R&D) expenses are associated directly with
            the research and development of a company's goods or services and
            any intellectual property generated in the process. A company
            generally incurs R&D expenses in the process of finding and creating
            new products or services.
          </p>
        </div>
      )
    },
    {
      heading: 'Other Expenses',
      description: (
        <div>
          <p>
            Other expenses are those expenses that non-operating in nature that
            does not have any relation with the main business operations and
            include expenses like interest expense, sale of assets, impairment
            and restructuring costs, etc.
          </p>
        </div>
      )
    }
  ]

  const renderToolTip = (
    data: {
      heading: string
      description: JSX.Element
    } | null
  ) => {
    if (data) {
      return (
        <div>
          <h3>{data.heading}</h3>
          <div>{data.description}</div>
        </div>
      )
    } else {
      return false
    }
  }

  const updateData = (
    data: (string | number)[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => {
    data[columnIndex][rowIndex] = value
    return data
  }

  const reducer = (
    state: TableDataInterface,
    action: ActionInterface
  ): TableDataInterface => {
    console.log('reducer called')
    let currentState = { ...state }
    if (!saveChangesBtn) setSaveChangesBtn(true)
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: updateData(
              currentState.data[currentYear],
              action?.payload?.rowIndex + 1,
              action?.payload?.columnIndex,
              action?.payload?.value
            )
          }
        }
      case 'ADD_MONTH': {
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: addMonth(
              currentState.data[currentYear],
              action.payload
            )
          }
        }
      }
      case 'REMOVE_MONTH': {
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: removeMonth(
              currentState.data[currentYear],
              action.payload
            )
          }
        }
      }

      // let config = { ...tableConfig };
      // config.columns.push({
      //   Header: action.payload,
      //   accessor: action.payload,
      // });
      // setTableConfig(config);
      // console.log("Add month called");
      // return currentState.data[currentYear].push([action.payload]);
    }
    return state
  }

  const init = (data: TableDataInterface) => data

  const [state, dispatch] = useReducer(reducer, data, init)

  const getTableCellData = (
    thisData: TableDataInterface,
    currentData: ExpenseTableRowInterface[],
    i: number,
    j: number
  ) => {
    switch (i) {
      case 0:
        if (thisData.data[currentYear][j][i + 1])
          return {
            ...currentData[i],
            [thisData.data[currentYear][j][0]]:
              thisData.data[currentYear][j][i + 1]
          }
        else
          return {
            ...currentData[i],
            [thisData.data[currentYear][j][0]]: 'No Data'
          }
      default:
        return {
          ...currentData[i],
          [thisData.data[currentYear][j][0]]: (
            <input
              className={styles.editableInput}
              value={
                thisData.data[currentYear][j][i + 1]
                  ? thisData.data[currentYear][j][i + 1]
                  : 0
              }
              title={
                thisData.data[currentYear][j][i + 1]
                  ? `${thisData.data[currentYear][j][i + 1]}`
                  : '0'
              }
              onChange={(e) => {
                dispatch({
                  type: 'UPDATE_DATA',
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: parseInt(e.target.value)
                  }
                })
              }}
              key={`row${i}column${j}`}
            />
          )
          // thisData.data[currentYear][j][i + 1],
        }
    }
  }

  const generateTableData = (state: TableDataInterface) => {
    if (state.data[currentYear]) {
      let thisData = { ...state }
      let currentData: ExpenseTableRowInterface[] = []
      let loop1 = thisData.fields.length
      let loop2 = thisData.data[currentYear].length

      // Data is passed in the tables row wise
      for (let i = 0; i < loop1 - 1; i++) {
        // Add data for first column
        currentData[i] = {
          ...currentData[i],
          dataRow: tooltipArray[i] ? (
            <Tooltip
              title={renderToolTip(tooltipArray[i])}
              arrow
              placement='right'
            >
              <span className={styles.boldText}>
                {thisData.fields[i + 1]?.Header}
              </span>
            </Tooltip>
          ) : (
            <span className={styles.boldText}>
              {thisData.fields[i + 1]?.Header}
            </span>
          )
        }
        // Add data for each month
        for (let j = 0; j < 12; j++) {
          if (thisData.data[currentYear][j]) {
            currentData[i] = getTableCellData(thisData, currentData, i, j)
          } else {
            currentData[i] = {
              ...currentData[i],
              [monthsArray[j]]: ''
            }
          }
        }
      }
      return currentData
    } else {
      return []
    }
  }

  const generateTableConfig = (
    state: TableDataInterface,
    monthsArray: string[]
  ) => {
    console.log('generate table called')
    const currentData = [...state.data[currentYear]]
    console.log(currentData)
    let tableConfig: TableUIConfig = {
      columns: []
    }
    tableConfig.columns.push({
      Header: '',
      accessor: 'dataRow',
      width: assignWidth(8, 8)
    })
    currentData.forEach((monthData) => {
      if (monthData !== undefined && monthData.length > 0) {
        tableConfig.columns.push({
          Header: capitalizeFirstLetter(`${monthData[0]}`),
          accessor: `${monthData[0]}`
        })
      }
    })
    console.log(tableConfig)
    return tableConfig
  }

  const tableData = useMemo(() => generateTableData(state), [state])
  const tableConfig = useMemo(
    () => generateTableConfig(state, monthsArray),
    [state.data[currentYear]]
  )

  const renderMonthsCheckbox = (tableConfig: TableUIConfig) => {
    let checkboxArray: ReactNode[] = []

    monthsArray.forEach((month: string, i: number) => {
      let displayedMonths: (string | number)[] = []
      state.data[currentYear].forEach((arr, i) => {
        if (arr && arr.length > 0) displayedMonths.push(arr[0])
      })
      checkboxArray.push(
        <div key={i}>
          <input
            type='checkbox'
            id={monthsArray[i]}
            defaultChecked={displayedMonths.includes(month)}
            onClick={() => {
              if (!displayedMonths.includes(month)) {
                dispatch({
                  type: 'ADD_MONTH',
                  payload: {
                    monthName: month,
                    index: i
                  }
                })
              } else {
                dispatch({
                  type: 'REMOVE_MONTH',
                  payload: {
                    monthName: month,
                    index: i
                  }
                })
              }
            }}
          />
          <label htmlFor={monthsArray[i]}>{capitalizeFirstLetter(month)}</label>
        </div>
      )
    })
    return checkboxArray
  }

  const renderYearOptions = (years: string[]) => {
    return years.map((year, i) => {
      return <div key={i}>{year}</div>
    })
  }
  const [showColumnConfig, setShowColumnConfig] = useState(false)

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant='h4'>Opex Expenses</Typography>
        {saveChangesBtn ? (
          <button
            className={styles.saveChanges}
            onClick={() => {
              changeHandler(state)
              setSaveChangesBtn(false)
            }}
          >
            Save Changes
          </button>
        ) : (
          <div></div>
        )}
        <div className={classes.btnGroup}>
          <div>
            <Button
              onClick={(e) => {
                setShowColumnConfig(!showColumnConfig)
              }}
              // className={styles.columnConfigBtn}
              variant='outlined'
            >
              Add/Remove Columns
            </Button>
            {showColumnConfig ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={(e) => setShowColumnConfig(false)}
              >
                {renderMonthsCheckbox(tableConfig)}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <Button
              onClick={(e) => {
                setShowYearConfig(!showYearConfig)
              }}
              variant='outlined'
            >
              {`Year: ${currentYear}`}
            </Button>
            {showYearConfig ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={(e) => setShowYearConfig(false)}
              >
                {renderYearOptions(Object.keys(state.data))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div>
          <Table config={tableConfig} data={tableData} />
        </div>
      </div>
    </div>
  )
}

export default OpexExpensesTable
