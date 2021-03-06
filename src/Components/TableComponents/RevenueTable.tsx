import React, { useState, useReducer, ReactNode, useMemo } from "react";
import Table, { TableConfig, TableUIConfig } from "../../Table";
import styles from "./commonTableStyle.module.css";
import {
  Button,
  capitalize,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Tooltip,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import {
  YearDataInterface,
  TableDataInterface,
  ActionInterface,
  TablePropsInterface,
  RevenueTableRowInterface,
} from "../interfaces";
import { KeyDownIcon } from "../StartupScreen/TablesView/NotesPage/NotesComponent/NotesComponent";

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
        padding: "32px",
        paddingTop: "32px",
        paddingBottom: "32px",
      },
      [theme.breakpoints.down("sm")]: {
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
      [theme.breakpoints.down("sm")]: {
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
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        width: "100%",
      },
    },
    boldText: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };
});

export const renderToolTip = (
  data:
    | {
        heading: string;
        description: JSX.Element;
      }
    | undefined
) => {
  if (data) {
    return (
      <div style={{ padding: "12px" }}>
        <h3>{data.heading}</h3>
        <div>{data.description}</div>
      </div>
    );
  } else {
    return false;
  }
};

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth;

const RevenueTable = ({
  data,
  changeHandler,
  currentYear,
  setCurrentYear,
}: TablePropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);

  const monthsArray = [
    "january",
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

  const addMonth = (year: (string | number | undefined)[][], payload: any) => {
    let data = [...year];
    data[payload.index] = [payload.monthName, 0, 0, 0];
    return data;
  };

  const removeMonth = (
    year: (string | number | undefined)[][],
    payload: any
  ) => {
    let data = [...year];
    data[payload.index] = [];
    return data;
  };

  const updateData = (
    data: (string | number | undefined)[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number | undefined
  ) => {
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
        setSaveChangesBtn(true);
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
        setSaveChangesBtn(true);
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
        setSaveChangesBtn(true);
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

  //

  const init = (data: TableDataInterface) => {
    return { ...data };
  };

  const [state, dispatch] = useReducer(reducer, data, init);

  const tooltipArray = [
    {
      heading: "Total Revenue",
      description: (
        <div>
          <p>
            Total revenue is the full amount of total sales of goods and
            services.
          </p>
        </div>
      ),
    },
    {
      heading: "Monthly Recurring Revenue (MRR)",
      description: (
        <div>
          <p>
            Monthly Recurring Revenue (MRR) is the predictable total revenue
            generated by your business from all the active subscriptions in a
            particular month.
          </p>
        </div>
      ),
    },
    {
      heading: "New MRR",
      description: (
        <div>
          <p>
            New MRR is monthly recurring revenue that comes from new customers.
          </p>
        </div>
      ),
    },
    {
      heading: "Non-Recurring Revenue",
      description: (
        <div>
          <p>
            Non-recurring revenue is made up of one-off payments that may or may
            not happen again.
          </p>
        </div>
      ),
    },

    {
      heading: "First Month of Financial year",
      description: (
        <div>
          <p>
            For reporting, you can specify any month as the start of your
            financial year (also called your financial reporting year or
            accounting year).
          </p>
        </div>
      ),
    },
    {
      heading: "Accounting Method",
      description: (
        <div>
          <p>
            Choose Accrual to report income when you bill a customer; choose
            Cash to report income when you receive payment from a customer.
          </p>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    dispatch({ type: "RESET", payload: data });
  }, [data]);

  const generateTableData = (state: TableDataInterface) => {
    if (state.data[currentYear]) {
      let thisData = { ...state };
      let currentData: RevenueTableRowInterface[] = [];
      let loop1 = thisData.fields.length;
      let loop2 = thisData.data[currentYear].length;

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
                description: tooltipArray[i].description,
              })}
              placement="right"
              arrow
            >
              <Typography className={classes.boldText}>
                {thisData.fields[i + 1].Header}
              </Typography>
            </Tooltip>
          ),
        };
        // Add data for each month
        for (let j = 0; j < 12; j++) {
          // Checking for total revenue
          if (i === 0) {
            currentData[i] = {
              ...currentData[i],
              [monthsArray[j]]: (
                <Typography className={styles.fixedData}>
                  {thisData.data[currentYear][j][i + 1]
                    ? thisData.data[currentYear][j][i + 1]
                    : "No Data"}
                </Typography>
              ),
            };
          } else {
            let propertyName = thisData.data[currentYear][j][0]?.toString();
            currentData[i] = {
              ...currentData[i],
              [propertyName ? propertyName : ""]: (
                <input
                  className={styles.editableInput}
                  value={thisData.data[currentYear][j][i + 1]}
                  title={
                    thisData.data[currentYear][j][i + 1]
                      ? `${thisData.data[currentYear][j][i + 1]}`
                      : "Enter Data"
                  }
                  type="number"
                  placeholder="Enter Data"
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
        width: assignWidth(14, 2),
      });
      currentData.forEach((monthData) => {
        if (monthData !== undefined && monthData.length > 0) {
          tableConfig.columns.push({
            Header: (
              <Typography className={styles.boldText}>
                {capitalize(`${monthData[0]}`)}
              </Typography>
            ),
            accessor: `${monthData[0]}`,
            width: assignWidth(10, 2),
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
      let displayedMonths: (string | number | undefined)[] = [];
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

  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
  const [showYearConfig, setShowYearConfig] = useState(false);

  const renderCurrencyOptions = () => {
    let currencyList = ["USD", "INR"];
    return currencyList.map((c, i) => {
      return <Typography key={i}>{c}</Typography>;
    });
  };

  // const renderYearOptions = () => {
  //   let years: string[] = [];
  //   for (
  //     let i = new Date().getFullYear();
  //     i > parseInt(currentYear) - 200;
  //     i--
  //   ) {
  //     years = [...years, i.toString()];
  //   }
  //   return years.map((year, i) => {
  //     return (
  //       <Typography
  //         onClick={() => {
  //           setShowYearConfig(false);
  //           setCurrentYear(year);
  //         }}
  //         key={i}
  //       >
  //         {year}
  //       </Typography>
  //     );
  //   });
  // };

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
        <MenuItem key={i} value={year}>
          {year}
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">Revenue</Typography>
        {saveChangesBtn ? (
          <Button
            variant="outlined"
            onClick={() => {
              changeHandler(state);
              setSaveChangesBtn(false);
            }}
            className={styles.saveChanges}
          >
            Save
          </Button>
        ) : (
          <div></div>
        )}

        <div className={classes.btnGroup}>
          {/* <div>
            <Button
              onClick={(e) => {
                setShowColumnConfig(!showColumnConfig);
              }}
              variant="outlined"
              className={styles.dropdownButton}
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
          </div> */}
          <Select
            value={currentYear}
            onChange={(e) => {
              setCurrentYear(e.target.value);
            }}
            variant="outlined"
            className={styles.dropdownButton}
          >
            {renderYearOptions()}
          </Select>
          {/* <div>
            <Button
              onClick={(e) => {
                setShowYearConfig(!showYearConfig);
              }}
              variant="outlined"
              className={styles.dropdownButton}
            >
              {`${currentYear}`} <KeyDownIcon />
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
          </div> */}
          {/* <div>
            <Button
              onClick={(e) => {
                setShowCurrencyConfig(!showCurrencyConfig);
              }}
              variant="outlined"
              className={styles.dropdownButton}
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
          </div> */}
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div>
          <Table config={tableConfig} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default RevenueTable;
