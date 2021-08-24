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
import styles from '../commonTableStyle.module.css'

type YearDataInterface = (
  | string
  | number
  | { Header: string; accessor: string }
)[][]
interface TableDataInterface {
  fields: { Header: string; accessor: string }[]
  data: YearDataInterface
}

interface OptionsInterface {
  roleType: { Header: string; accessor: string }[]
}

interface TablePropsInterface {
  data: TableDataInterface
  changeHandler: (data: TableDataInterface) => void
  options: OptionsInterface
}

interface ActionInterface {
  type: string
  payload?: any
}

interface TablePropsInterface {
  data: TableDataInterface
  changeHandler: (data: TableDataInterface) => void
}

interface InvestorTableRowInerface {
  [key: string]: string | number | ReactNode | JSX.Element
}

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth

const UserInfoForm = ({ options }: { options: OptionsInterface }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<{
    Header: string
    accessor: string
  } | null>(null)
  return (
    <div className={styles.userInfoFormContainer}>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        value={name}
        placeholder='Enter Name'
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        value={email}
        placeholder='Enter Email'
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='dropdown'>Name</label>
      <DropdownComponent
        options={options.roleType}
        changeHandler={(val) => setPermission(val)}
      />
    </div>
  )
}

const InvestorTable = ({
  data,
  changeHandler,
  options
}: TablePropsInterface) => {
  const init = (data: TableDataInterface) => data

  const updateData = (
    data: (string | number | { Header: string; accessor: string })[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => {
    data[rowIndex][columnIndex] = value
    return data
  }

  const removeUser = (
    data: (string | number | { Header: string; accessor: string })[][],
    rowIndex: number
  ) => {
    let arr = [...data]
    return arr.filter((ele, i) => {
      if (i === rowIndex) return false
      return true
    })
    // console.log(arr);
    // return arr;
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
      case 'REMOVE_USER':
        return {
          ...currentState,
          data: removeUser(currentState.data, action.payload.rowIndex)
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

  const passRequiredElement = (
    i: number,
    j: number,
    thisData: TableDataInterface,
    currentData: InvestorTableRowInerface[]
  ): ReactElement | ReactNode | string | number => {
    switch (j) {
      case 2:
        console.log(typeof thisData.data[i][j])
        return (
          <div style={{ display: 'flex', width: '100%' }}>
            <DropdownComponent
              options={options.roleType}
              changeHandler={(value) => {
                dispatch({
                  type: 'UPDATE_DATA',
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value
                  }
                })
              }}
              defaultValue={checkIfOptionValue(thisData.data[i][j])}
            />
          </div>
        )
      // case 3:
      //   return (
      //     <button
      //       onClick={() => {
      //         dispatch({
      //           type: "REMOVE_USER",
      //           payload: {
      //             rowIndex: i,
      //           },
      //         });
      //       }}
      //     >
      //       Remove User
      //     </button>
      //   );
      default:
        return (
          <input
            className={styles.editableInput}
            value={
              thisData.data[i][j] ? checkIfObject(thisData.data[i][j]) : ''
            }
            title={thisData.data[i][j] ? `${thisData.data[i][j]}` : '0'}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_DATA',
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: checkIfObject(e.target.value)
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
    const currentData: InvestorTableRowInerface[] = []
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
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
        width: assignWidth(10, 5)
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: assignWidth(10, 5)
      },
      {
        Header: 'Permissions',
        accessor: 'permissions',
        width: assignWidth(10, 0)
      }
    ]
  }

  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false)
  const [showYearConfig, setShowYearConfig] = useState(false)

  const renderCurrencyOptions = () => {
    let currencyList = ['USD', 'INR']
    return currencyList.map((c, i) => {
      return <div key={i}>{c}</div>
    })
  }

  const renderYearOptions = (years: string[]) => {
    return years.map((year, i) => {
      return <div key={i}>{year}</div>
    })
  }

  const [showUserInfoInput, setShowUserInfoInput] = useState(false)

  return (
    <div className={styles.mainTableContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.tableHeading}>Tyke Investors</div>
        <div className={styles.addUserBtnContainer}>
          <button className={styles.addUserBtn}>Add User</button>
          {showUserInfoInput ? <UserInfoForm options={options} /> : <div></div>}
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

export default InvestorTable
