import React, {
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useReducer,
  ReactElement
} from 'react'
import Table, { TableConfig, TableUIConfig } from '../../Table'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import styles from './commonTableStyle.module.css'

import {
  // TableDataInterface,
  ActionInterface,
  // TablePropsInterface,
  OptionInterface
} from '../interfaces'
import {
  Button,
  makeStyles,
  Select,
  Theme,
  Typography,
  useTheme
} from '@material-ui/core'

interface TablePropsInterface {
  data: TableDataInterface
  changeHandler: Function
  // options: {
  //   [key: string]: OptionInterface[];
  // };
}

const employeeTableFields = [
  {
    Header: 'Name',
    accessor: 'employee_name'
  },
  {
    Header: 'Department',
    accessor: 'department'
  },
  {
    Header: 'Role Type',
    accessor: 'role_type'
  },
  {
    Header: 'Role Name',
    accessor: 'role_name'
  },
  {
    Header: 'CXO',
    accessor: 'cxo'
  },
  {
    Header: 'Annual Salary',
    accessor: 'annual_salary'
  },
  {
    Header: 'Start Date',
    accessor: 'start_date'
  },
  {
    Header: 'End Date',
    accessor: 'end_data'
  }
  // {
  //   Header: "id",
  //   accessor: "_id",
  // },
]

export interface TableDataInterface {
  currency?: string
  fields: OptionInterface[]
  data: (string | number)[][]
}

interface EmployeeTableRowInterface {
  [key: string]: string | number | ReactNode | JSX.Element
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

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}

const formatDate = (date: string | number) => {
  console.log(date)
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth

const EmployeeTable = ({ data, changeHandler }: TablePropsInterface) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const init = (data: TableDataInterface) => data
  const [saveChangesBtn, setSaveChangesBtn] = useState(false)

  const updateData = (
    data: (string | number)[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => {
    setSaveChangesBtn(true)
    let currentData = [...data]
    currentData[rowIndex][columnIndex] = value
    return currentData
  }

  const addRow = (data: (string | number)[][]) => {
    setSaveChangesBtn(true)
    let currentData = [...data]
    currentData.push([])
    return currentData
  }

  const reducer = (
    state: TableDataInterface,
    action: ActionInterface
  ): TableDataInterface => {
    console.log('reducer called', action)
    let currentState = { ...state }
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...currentState,
          data: updateData(
            currentState.data,
            action.payload.rowIndex,
            action.payload.columnIndex,
            action.payload.value
          )
        }
      case 'ADD_ROW':
        return {
          ...currentState,
          data: addRow(currentState.data)
        }
    }
    return state
  }

  const checkIfObject = (value: any) => {
    if (typeof value === 'object') return ''
    return value
  }

  const checkIfOptionValue = (
    value: string | number | { Header: string; accessor: string }
  ) => {
    if (typeof value === 'string') return undefined
    else if (typeof value === 'number') return undefined
    else return value
  }
  const [state, dispatch] = useReducer(reducer, data, init)

  const departmentOptions = [
    'Choose',
    'General Management',
    'Administration',
    'Operations',
    'Human Resource',
    'Purchase',
    'Engineering',
    'Finance',
    'Sales',
    'Marketing',
    'Product',
    'Customer Support',
    'Legal'
  ]
  const roleTypeOptions = [
    'Choose',
    'Contract',
    'Part-time',
    'Full-time',
    'Internship',
    'Apprenticeship',
    'Freelance'
  ]
  const booleanOption = ['Choose', 'true', 'false']
  const renderTableOptions = (num: number) => {
    if (num === 1) {
      return departmentOptions.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        )
      })
    }
    if (num === 2) {
      return roleTypeOptions.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        )
      })
    }
    if (num === 4) {
      return booleanOption.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        )
      })
    }
  }

  const getDateString = (str: string | number) => {
    if (typeof str === 'string') {
      return str.split('T')[0]
    }
  }

  const passRequiredElement = (
    i: number,
    j: number,
    thisData: TableDataInterface,
    currentData: EmployeeTableRowInterface[]
  ): ReactElement | ReactNode | string | number => {
    switch (j) {
      case 1:
      case 2:
      case 4:
        return (
          <Typography style={{ display: 'flex', width: '100%' }}>
            <select
              className={styles.selectInput}
              value={thisData.data[i][j]}
              onChange={(e) => {
                dispatch({
                  type: 'UPDATE_DATA',
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: e.target.value
                  }
                })
              }}
            >
              {renderTableOptions(j)}
            </select>
          </Typography>
        )
      case 6:
      case 7:
        return thisData.data[i][j] ? (
          <Typography>
            <input
              type='date'
              onChange={(e) => {
                let d = new Date(e.target.value)
                dispatch({
                  type: 'UPDATE_DATA',
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: d.toISOString()
                  }
                })
              }}
              className={styles.selectInput}
              value={getDateString(thisData.data[i][j])}
            />
          </Typography>
        ) : (
          <Typography
            onClick={() => {
              dispatch({
                type: 'UPDATE_DATA',
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: new Date().toISOString()
                }
              })
            }}
          >
            Add Date
          </Typography>
        )
      case 5:
        return (
          <input
            className={styles.editableInput}
            type='number'
            value={thisData.data[i][j] !== undefined ? thisData.data[i][j] : 0}
            title={
              thisData.data[i][j] !== undefined ? `${thisData.data[i][j]}` : '0'
            }
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DATA',
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: e.target.value
                }
              })
            }}
            key={`row${i}column${j}`}
          />
        )
      default:
        return (
          <input
            className={styles.editableInput}
            // type="number"
            value={
              thisData.data[i][j] !== undefined
                ? thisData.data[i][j]
                : 'No Data'
            }
            title={
              thisData.data[i][j] !== undefined
                ? `${thisData.data[i][j]}`
                : 'No Data  '
            }
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DATA',
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: e.target.value
                }
              })
            }}
            key={`row${i}column${j}`}
          />
        )
    }
  }

  const generateTableData = (state: TableDataInterface) => {
    const thisData = { ...state }
    const currentData: EmployeeTableRowInterface[] = []
    if (state.data) {
      // 1st loop is for iterating over rows
      let loop1 = thisData.data.length
      // 2nd loop is for iterating over columns
      let loop2 = thisData.fields.length
      for (let i = 0; i < loop1; i++) {
        for (let j = 0; j < loop2; j++) {
          currentData[i] = {
            ...currentData[i],
            [thisData.fields[j].accessor]: passRequiredElement(
              i,
              j,
              thisData,
              currentData
            )
          }
        }
      }
    }
    return currentData
  }

  // thisData.data[currentYear][i][j]

  const tableData = useMemo(() => generateTableData(state), [state])
  // const tableConfig = useMemo(
  //   () => generateTableConfig(state, monthsArray),
  //   []
  // );

  const tableConfig: TableUIConfig = {
    columns: employeeTableFields
  }

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant='h4'>Employee</Typography>
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
          <Button
            variant='outlined'
            onClick={() => {
              dispatch({
                type: 'ADD_ROW'
              })
            }}
          >
            Add Row
          </Button>
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

export default EmployeeTable
