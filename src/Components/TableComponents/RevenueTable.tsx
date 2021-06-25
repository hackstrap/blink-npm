import React, { useState, useReducer, ReactNode, useMemo } from 'react'
import Table, { TableConfig, TableUIConfig } from '../../Table'
import styles from './commonTableStyle.module.css'
import {
  Button,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useTheme,
  withStyles
} from '@material-ui/core'
interface YearDataInterface {
  [key: string]: (string | number)[][]
}

interface TableDataInterface {
  currency?: string
  fields: string[]
  data: YearDataInterface
}

interface TablePropsInterface {
  data: TableDataInterface
  changeHandler: (data: any) => void
}
interface ActionInterface {
  type: string
  payload?: any
}

interface RevenueTableRowInterface {
  [key: string]: string | number | ReactNode
}

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}

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
    },
    boldText: {
      fontSize: '1rem',
      fontWeight: 'bold'
    }
  }
})

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth

const RevenueTable = ({ data, changeHandler }: TablePropsInterface) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [currentYear, setCurrentYear] = useState('')
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
  // const [tableConfig, setTableConfig] = useState<TableUIConfig>({
  //   columns: [],
  // });

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
    let currentState = { ...state }
    changeHandler({ state, action })
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

  const calculateTotalrevenue = (data: any[]) => {
    let total = 0
    data.forEach((d: number, i: number) => {
      if (i > 1) total += d
    })
    return total
  }

  // const init = () => {
  //   const initYear = monthsArray.map(month=>{
  //     let arr = []
  //     for(let i=0;i<=4;i++){
  //       if(i===0) arr.push(month)
  //       else arr.push(0)
  //     }
  //     return arr
  //   })
  //   return {
  //     currency : 'INR',
  //     fields : ['', 'totalRevenue','mmr','newMmr','churn'],
  //     data:{
  //       [(new Date).getFullYear()] : initYear
  //     }
  //   }
  // }

  const init = (data: TableDataInterface) => data

  const [state, dispatch] = useReducer(reducer, data, init)

  // React.useEffect(() => {
  //   changeHandler(state);
  // }, [state]);

  React.useEffect(() => {
    if (data !== null) {
      setCurrentYear(Object.keys(data.data)[0])
    }
  }, [])

  // const HtmlTooltip = withStyles((theme: Theme) => ({
  //   tooltip: {
  //     // backgroundColor: "#f5f5f9",
  //     // color: "rgba(0, 0, 0, 0.87)",
  //     // maxWidth: 220,
  //     // fontSize: theme.typography.pxToRem(12),
  //     // border: "1px solid #dadde9",
  //   },
  // }))(Tooltip);

  const tooltipArray = [
    {
      heading: 'Total Revenue',
      description: (
        <div>
          <p>
            Total revenue is the full amount of total sales of goods and
            services.
          </p>
        </div>
      )
    },
    {
      heading: 'Monthly Recurring Revenue (MRR)',
      description: (
        <div>
          <p>
            Monthly Recurring Revenue (MRR) is the predictable total revenue
            generated by your business from all the active subscriptions in a
            particular month.
          </p>
        </div>
      )
    },
    {
      heading: 'New MRR',
      description: (
        <div>
          <p>
            New MRR is monthly recurring revenue that comes from new customers.
          </p>
        </div>
      )
    },
    {
      heading: 'Non-Recurring Revenue',
      description: (
        <div>
          <p>
            Non-recurring revenue is made up of one-off payments that may or may
            not happen again.
          </p>
        </div>
      )
    },

    {
      heading: 'First Month of Financial year',
      description: (
        <div>
          <p>
            For reporting, you can specify any month as the start of your
            financial year (also called your financial reporting year or
            accounting year).
          </p>
        </div>
      )
    },
    {
      heading: 'Accounting Method',
      description: (
        <div>
          <p>
            Choose Accrual to report income when you bill a customer; choose
            Cash to report income when you receive payment from a customer.
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

  const generateTableData = (state: TableDataInterface) => {
    if (state.data[currentYear]) {
      let thisData = { ...state }
      let currentData: RevenueTableRowInterface[] = []
      let loop1 = thisData.fields.length
      let loop2 = thisData.data[currentYear].length

      // Data is passed in the tables row wise
      for (let i = 0; i < loop1 - 1; i++) {
        // Add data for first column
        currentData[i] = {
          ...currentData[i],
          dataRow: (
            // <div className={styles.boldText}>{thisData.fields[i + 1]}</div>
            <Tooltip
              title={renderToolTip({
                heading: tooltipArray[i].heading,
                description: tooltipArray[i].description
              })}
              placement='right'
              arrow
            >
              <Typography className={classes.boldText}>
                {thisData.fields[i + 1]}
              </Typography>
            </Tooltip>
          )
        }
        // Add data for each month
        for (let j = 0; j < 12; j++) {
          if (thisData.data[currentYear][j]) {
            // Checking for total revenue
            if (i === 0) {
              currentData[i] = {
                ...currentData[i],
                [monthsArray[j]]: (
                  <Typography>
                    {calculateTotalrevenue(thisData.data[currentYear][j])}
                  </Typography>
                )
              }
            } else {
              currentData[i] = {
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
    console.log(currentYear)
    if (currentYear.length !== 0) {
      const currentData = [...state.data[currentYear]]
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
            Header: (
              <Typography className={styles.boldText}>
                {capitalizeFirstLetter(`${monthData[0]}`)}
              </Typography>
            ),
            accessor: `${monthData[0]}`
          })
        }
      })
      return tableConfig
    } else {
      return { columns: [{ Header: '', accessor: '' }] }
    }
  }

  const tableData = useMemo(
    () => generateTableData(state),
    [state, currentYear]
  )
  const tableConfig = useMemo(
    () => generateTableConfig(state, monthsArray),
    [state.data[currentYear], currentYear]
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

  const [showColumnConfig, setShowColumnConfig] = useState(false)
  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false)
  const [showYearConfig, setShowYearConfig] = useState(false)

  const renderCurrencyOptions = () => {
    let currencyList = ['USD', 'INR']
    return currencyList.map((c, i) => {
      return <Typography key={i}>{c}</Typography>
    })
  }

  const renderYearOptions = (years: string[]) => {
    return years.map((year, i) => {
      return (
        <Typography
          onClick={() => {
            setShowYearConfig(false)
            setCurrentYear(year)
          }}
          key={i}
        >
          {year}
        </Typography>
      )
    })
  }

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant='h4'>Revenue Data</Typography>
        {saveChangesBtn ? (
          <Button
            variant='outlined'
            onClick={() => {
              changeHandler(state)
              setSaveChangesBtn(false)
            }}
          >
            Save Changes
          </Button>
        ) : (
          <div></div>
        )}

        <div className={classes.btnGroup}>
          <div>
            <Button
              onClick={(e) => {
                setShowColumnConfig(!showColumnConfig)
              }}
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
          <div>
            <Button
              onClick={(e) => {
                setShowCurrencyConfig(!showCurrencyConfig)
              }}
              variant='outlined'
            >
              {`Currency: ${state.currency}`}
            </Button>
            {showCurrencyConfig ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={(e) => setShowCurrencyConfig(false)}
              >
                {renderCurrencyOptions()}
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

export default RevenueTable
