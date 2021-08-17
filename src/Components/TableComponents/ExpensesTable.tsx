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
  ActionInterface,
  TablePropsInterface,
  RevenueTableRowInterface,
} from "../interfaces";
import { KeyDownIcon } from "../StartupScreen/TablesView/NotesPage/NotesComponent/NotesComponent";
import { renderToolTip } from "./RevenueTable";

interface ExpenseTableRowInterface {
  [key: string]: string | number | ReactNode;
}

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
    boldText: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };
});

const ExpensesTable = ({
  data,
  changeHandler,
  currentYear,
  setCurrentYear,
}: TablePropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
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

  const addMonth = (year: (string | number)[][], payload: any) => {
    let data = [...year];
    data[payload.index] = [payload.monthName, 0, 0, 0];
    return data;
  };

  const removeMonth = (year: (string | number)[][], payload: any) => {
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

  React.useEffect(() => {
    dispatch({
      type: "RESET",
      payload: data,
    });
  }, [data]);

  const tooltipArray = [
    {
      heading: "Total Cost of Goods Sold (COGS)",
      description: (
        <div>
          <p>
            Cost of goods sold (COGS) refers to the direct costs of producing
            the goods sold by a company. This amount includes the cost of the
            materials and labor directly used to create the good.
          </p>
        </div>
      ),
    },
    null,
    null,
    null,
    null,
    null,
    {
      heading: "Total Cost of Goods Manufactured (COGM)",
      description: (
        <div>
          <p>
            The cost of goods manufactured (COGM), also called cost of goods
            completed, calculates the total value of inventory that was produced
            during the period and is ready for sale.
          </p>
        </div>
      ),
    },
    {
      heading: "Direct Material Costs",
      description: (
        <div>
          <p>It is the cost of direct materials used in production.</p>
          <p>
            IDirect Material Costs = Beginning Raw Materials Inventory +
            Purchases of raw materials - Ending Raw Materials Inventory.
          </p>
        </div>
      ),
    },
    {
      heading: "Direct Labor Costs",
      description: (
        <div>
          <p>
            Direct labor cost is wages that are incurred in order to produce
            goods or provide services to customers.
          </p>
        </div>
      ),
    },
    {
      heading: "Manufacturing Overhead",
      description: (
        <div>
          <p>
            Manufacturing overhead is all indirect costs incurred during the
            production process. This overhead is applied to the units produced
            within a reporting period.{" "}
          </p>
        </div>
      ),
    },
    {
      heading: "Work-in-Progress (WIP) Inventory",
      description: (
        <div>
          <p>
            Work-in-process (WIP) inventory refers to a component of a company's
            inventory that is partially completed.
          </p>
          <p>
            Net WIP Inventory = Beginning WIP Inventory - Ending WIP Inventory.
          </p>
        </div>
      ),
    },
    {
      heading: "Finished Goods Inventory",
      description: (
        <div>
          <p>
            Finished goods inventory refers to the number of manufactured
            products in stock that are available for customers to purchase.
          </p>
          <p>
            Net Finished Goods Inventory = Beginning Finished Goods Inventory -
            Ending Finished Goods Inventory.
          </p>
        </div>
      ),
    },
    {
      heading: "Total Other COGS",
      description: (
        <div>
          <p>
            Total Other COGS are other miscellaneous items that add to the COGS
          </p>
        </div>
      ),
    },
  ];

  const reducer = (
    state: TableDataInterface,
    action: ActionInterface
  ): TableDataInterface => {
    console.log("reducer called");
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

      // let config = { ...tableConfig };
      // config.columns.push({
      //   Header: action.payload,
      //   accessor: action.payload,
      // });
      // setTableConfig(config);
      // console.log("Add month called");
      // return currentState.data[currentYear].push([action.payload]);
    }
    return state;
  };

  const init = (data: TableDataInterface) => data;

  const [state, dispatch] = useReducer(reducer, data, init);

  const getTableCellData = (
    thisData: TableDataInterface,
    currentData: ExpenseTableRowInterface[],
    i: number,
    j: number
  ) => {
    switch (i) {
      case 0:
      case 1:
      case 4:
      case 6:
      case 12:
        if (thisData.data[currentYear][j][i + 1])
          return {
            ...currentData[i],
            [thisData.data[currentYear][j][0]]: (
              <Typography className={styles.fixedData}>
                {thisData.data[currentYear][j][i + 1]}
              </Typography>
            ),
          };
        else
          return {
            ...currentData[i],
            [thisData.data[currentYear][j][0]]: (
              <Typography className={styles.fixedData}>No Data</Typography>
            ),
          };
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
      let currentData: ExpenseTableRowInterface[] = [];
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
              <span className={classes.boldText}>
                {thisData.fields[i + 1].Header}
              </span>
            </Tooltip>
          ) : (
            <span className={classes.boldText}>
              {thisData.fields[i + 1].Header}
            </span>
          ),
        };
        // Add data for each month
        for (let j = 0; j < 12; j++) {
          if (thisData.data[currentYear][j]) {
            currentData[i] = getTableCellData(thisData, currentData, i, j);
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
    console.log("generate table called");
    if (state.data[currentYear]) {
      const currentData = [...state.data[currentYear]];
      console.log(currentData);
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
            width: assignWidth(10, 2),
          });
        }
      });
      console.log(tableConfig);
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
            setShowYearConfig(false);
            setCurrentYear(year);
          }}
          key={i}
        >
          {year}
        </Typography>
      );
    });
  };
  const [showColumnConfig, setShowColumnConfig] = useState(false);

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">Expenses</Typography>
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
          <div>
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
          </div>
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

export default ExpensesTable;
