import {
  Button,
  capitalize,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, {
  useState,
  useEffect,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import Table, { TableConfig, TableUIConfig } from "../../Table";
import styles from "./commonTableStyle.module.css";
import {
  YearDataInterface,
  TableDataInterface,
  TablePropsInterface,
  ActionInterface,
} from "../interfaces";

interface UserTableRowInterface {
  [key: string]: string | number | ReactNode;
}

// // program to convert first letter of a string to uppercase
// function capitalizeFirstLetter(str: string) {
//   // converting first letter to uppercase
//   const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

//   return capitalized
// }

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth;

const useStyles = makeStyles((theme: Theme) => {
  return {
    mainTableContainer: {
      width: "100%",
      height: "100%",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05);",
      borderRadius: "20px",
      padding: "64px",
      paddingTop: "48px",
      [theme.breakpoints.down("md")]: {
        padding: "15px",
        paddingTop: "32px",
        paddingBottom: "32px",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: "white",
    },
    infoContainer: {
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        gap: 15,
        flexDirection: "column",
        alignItems: "flex-start",
      },
      display: "flex",
      width: "100%",
    },
    btnGroup: {
      display: "flex",
      marginLeft: "auto",
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
      },
    },
  };
});

const UsersTable = ({
  data,
  changeHandler,
  currentYear,
  setCurrentYear,
}: TablePropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [currentYear, setCurrentYear] = useState('2020')
  const [showYearConfig, setShowYearConfig] = useState(false);
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const monthsArray = [
    "janurary",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const tooltipArray = [
    {
      heading: "Monthly Active Users (MAU)",
      description: (
        <div>
          <p>
            Monthly active users (MAU) is the number of unique users who have
            performed some action in an app within the last month (30 days).
          </p>
          <p>
            In calculating MAU, every user who performs any action in the app
            during a 30-day period is counted only once no matter how many times
            they have logged in and performed various actions.
          </p>
        </div>
      ),
    },
    {
      heading: "Total New Customers",
      description: (
        <div>
          <p>
            Total new customers are the new customers acquired by sales and
            marketing activities during a given time period.
          </p>
        </div>
      ),
    },
    null,
    null,
    {
      heading: "Customer Churn",
      description: (
        <div>
          <p>
            Customer churn is calculated by the number of customers who leave
            your company during a given time period.
          </p>
        </div>
      ),
    },
  ];

  const addMonth = (year: (string | number)[][], payload: any) => {
    setSaveChangesBtn(true);
    let data = [...year];
    data[payload.index] = [payload.monthName, 0, 0, 0];
    return data;
  };

  React.useEffect(() => {
    dispatch({ type: "RESET", payload: data });
  }, [data]);

  const removeMonth = (year: (string | number)[][], payload: any) => {
    setSaveChangesBtn(true);
    let data = [...year];
    data[payload.index] = [];
    return data;
  };

  const updateData = (
    data: (string | number)[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => {
    setSaveChangesBtn(true);
    data[columnIndex][rowIndex] = value;
    return data;
  };

  const reducer = (
    state: TableDataInterface,
    action: ActionInterface
  ): TableDataInterface => {
    let currentState = { ...state };
    switch (action.type) {
      case "UPDATE_DATA":
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: updateData(
              currentState.data[currentYear],
              action?.payload?.rowIndex + 1,
              action?.payload?.columnIndex,
              action?.payload?.value
            ),
          },
        };
      case "ADD_MONTH": {
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: addMonth(
              currentState.data[currentYear],
              action.payload
            ),
          },
        };
      }
      case "REMOVE_MONTH": {
        return {
          ...currentState,
          data: {
            ...currentState.data,
            [currentYear]: removeMonth(
              currentState.data[currentYear],
              action.payload
            ),
          },
        };
      }
      case "RESET": {
        return {
          ...action.payload,
        };
      }
    }
    return state;
  };

  const renderToolTip = (
    data: {
      heading: string;
      description: JSX.Element;
    } | null
  ) => {
    if (data) {
      return (
        <div>
          <h3>{data.heading}</h3>
          <div>{data.description}</div>
        </div>
      );
    } else {
      return false;
    }
  };

  const init = (data: TableDataInterface) => data;

  const [state, dispatch] = useReducer(reducer, data, init);

  const getTableCellData = (
    i: number,
    j: number,
    thisData: TableDataInterface,
    currentData: UserTableRowInterface[]
  ) => {
    switch (i) {
      case 1:
      case 2:
        return {
          ...currentData[i],
          [monthsArray[j]]: (
            <Typography>{thisData.data[currentYear][j][i + 1]}</Typography>
          ),
        };
      default:
        return {
          ...currentData[i],
          [thisData.data[currentYear][j][0]]: (
            <input
              className="editableInput"
              value={
                thisData.data[currentYear][j][i + 1]
                  ? thisData.data[currentYear][j][i + 1]
                  : 0
              }
              title={
                thisData.data[currentYear][j][i + 1]
                  ? `${thisData.data[currentYear][j][i + 1]}`
                  : "0"
              }
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_DATA",
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: parseInt(e.target.value),
                  },
                });
              }}
              key={`row${i}column${j}`}
            />
          ),
          // thisData.data[currentYear][j][i + 1],
        };
    }
  };

  const generateTableData = (state: TableDataInterface) => {
    if (state.data[currentYear]) {
      let thisData = { ...state };
      let currentData: UserTableRowInterface[] = [];
      let loop1 = thisData.fields.length;
      let loop2 = thisData.data[currentYear].length;

      // Data is passed in the tables row wise
      for (let i = 0; i < loop1 - 1; i++) {
        // Add data for first column
        currentData[i] = {
          ...currentData[i],
          dataRow: tooltipArray[i] ? (
            <Tooltip
              title={renderToolTip(tooltipArray[i])}
              arrow
              placement="right"
            >
              <Typography className={styles.boldText}>
                {thisData.fields[i + 1]?.Header}
              </Typography>
            </Tooltip>
          ) : (
            <Typography className={styles.boldText}>
              {thisData.fields[i + 1]?.Header}
            </Typography>
          ),
        };
        // Add data for each month
        for (let j = 0; j < 12; j++) {
          if (thisData.data[currentYear][j]) {
            currentData[i] = getTableCellData(i, j, thisData, currentData);
          } else {
            currentData[i] = {
              ...currentData[i],
              [monthsArray[j]]: "",
            };
          }
        }
      }
      return currentData;
    } else {
      return [];
    }
  };

  const generateTableConfig = (
    state: TableDataInterface,
    monthsArray: string[]
  ) => {
    if (state.data[currentYear] !== undefined) {
      const currentData = [...state.data[currentYear]];
      let tableConfig: TableUIConfig = {
        columns: [],
      };
      tableConfig.columns.push({
        Header: "",
        accessor: "dataRow",
        width: assignWidth(15, 2),
      });
      currentData.forEach((monthData) => {
        if (monthData !== undefined && monthData.length > 0) {
          tableConfig.columns.push({
            Header: capitalize(`${monthData[0]}`),
            accessor: `${monthData[0]}`,
          });
        }
      });
      return tableConfig;
    } else {
      return { columns: [{ Header: "", accessor: "" }] };
    }
  };

  const tableData = useMemo(() => generateTableData(state), [state]);
  const tableConfig = useMemo(
    () => generateTableConfig(state, monthsArray),
    [state.data[currentYear]]
  );

  const renderMonthsCheckbox = (tableConfig: TableUIConfig) => {
    let checkboxArray: ReactNode[] = [];

    monthsArray.forEach((month: string, i: number) => {
      let displayedMonths: (string | number)[] = [];
      state.data[currentYear].forEach((arr, i) => {
        if (arr && arr.length > 0) displayedMonths.push(arr[0]);
      });
      checkboxArray.push(
        <div key={i}>
          <input
            type="checkbox"
            id={monthsArray[i]}
            defaultChecked={displayedMonths.includes(month)}
            onClick={() => {
              if (!displayedMonths.includes(month)) {
                dispatch({
                  type: "ADD_MONTH",
                  payload: {
                    monthName: month,
                    index: i,
                  },
                });
              } else {
                dispatch({
                  type: "REMOVE_MONTH",
                  payload: {
                    monthName: month,
                    index: i,
                  },
                });
              }
            }}
          />
          <label htmlFor={monthsArray[i]}>{capitalize(month)}</label>
        </div>
      );
    });
    return checkboxArray;
  };

  const renderYearOptions = () => {
    let years: string[] = [];
    for (
      let i = new Date().getFullYear();
      i > parseInt(currentYear) - 200;
      i--
    ) {
      years = [...years, i.toString()];
    }
    return years.map((year, i) => {
      return (
        <Typography
          onClick={() => {
            setCurrentYear(year);
            setShowYearConfig(false);
          }}
          key={i}
        >
          {year}
        </Typography>
      );
    });
  };
  const renderCurrencyOptions = () => {
    let currencyList = ["USD", "INR"];
    return currencyList.map((c, i) => {
      return <div key={i}>{c}</div>;
    });
  };

  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
  const [showColumnConfig, setShowColumnConfig] = useState(false);

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">User</Typography>
        {saveChangesBtn ? (
          <Button
            variant="outlined"
            onClick={() => {
              changeHandler(state);
              setSaveChangesBtn(false);
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
                setShowColumnConfig(!showColumnConfig);
              }}
              variant="outlined"
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
                setShowYearConfig(!showYearConfig);
              }}
              variant="outlined"
            >
              {`Year: ${currentYear}`}
            </Button>
            {showYearConfig ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={(e) => setShowYearConfig(false)}
              >
                {renderYearOptions()}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <Button
              onClick={(e) => {
                setShowCurrencyConfig(!showCurrencyConfig);
              }}
              variant="outlined"
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
        <Table config={tableConfig} data={tableData} />
      </div>
    </div>
  );
};

export default UsersTable;
