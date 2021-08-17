import React, { useState, useReducer, ReactNode, useMemo } from "react";
import Table, { TableConfig, TableUIConfig } from "../../Table";
import styles from "./commonTableStyle.module.css";
import {
  Button,
  capitalize,
  makeStyles,
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
import {
  ProductDataInterface,
  ProductTableInterface,
} from "../StartupScreen/TablesView/ProductPage";
import { updateLabel } from "typescript";
import { DeleteRounded } from "@material-ui/icons";
import ConfirmationWrapper from "../ConfirmationComponent/ConfirmationWrapper";

interface ProductTableRowInterface {
  [key: string]: string | number | React.ReactNode;
}

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
        gap: 15,
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    boldText: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };
});

export const renderToolTip = (
  data: {
    heading: string;
    description: JSX.Element;
  } | null
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

const ProductTable = ({
  data,
  changeHandler,
  currentYear,
  setCurrentYear,
}: ProductTableInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [deleteRowMode, setDeleteRowMode] = useState(false);

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
    data: number[][],
    rowIndex: number,
    columnIndex: number,
    value: number
  ) => {
    data[rowIndex][columnIndex] = value;
    return data;
  };

  const updateLabel = (labels: string[], index: number, value: string) => {
    let data = [...labels];
    data[index] = value;
    return data;
  };

  const addRow = (data: ProductDataInterface) => {
    return {
      ...data,
      labels: [...data.labels, "Enter Row Name"],
      dataset: [...data.dataset, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    };
  };

  const removeRow = (data: ProductDataInterface, rowIndex: number) => {
    let labels = data?.labels.filter((item, i) => {
      return i === rowIndex ? false : true;
    });
    let dataset = data?.dataset.filter((item, i) => {
      return i === rowIndex ? false : true;
    });
    return {
      ...data,
      labels,
      dataset,
    };
  };
  const reducer = (
    state: ProductDataInterface,
    action: ActionInterface
  ): ProductDataInterface => {
    let currentState = { ...state };
    switch (action.type) {
      case "UPDATE_DATA":
        setSaveChangesBtn(true);
        return {
          ...currentState,
          dataset: updateData(
            currentState.dataset,
            action?.payload?.rowIndex,
            action?.payload?.columnIndex,
            action?.payload?.value
          ),
        };
      case "UPDATE_LABEL":
        setSaveChangesBtn(true);
        return {
          ...currentState,
          labels: updateLabel(
            currentState.labels,
            action?.payload?.index,
            action?.payload?.value
          ),
        };
      case "ADD_ROW": {
        setSaveChangesBtn(true);
        return addRow(currentState);
      }
      case "REMOVE_ROW": {
        setSaveChangesBtn(true);
        return removeRow(currentState, action?.payload?.rowIndex);
      }
      case "RESET": {
        return {
          ...action.payload,
        };
      }
    }
    return state;
  };

  const init = (data: ProductDataInterface) => {
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

  const generateTableData = (state: ProductDataInterface) => {
    let thisData = { ...state };
    let currentData: ProductTableRowInterface[] = [];
    let loop1 = thisData.labels.length;
    // let loop2 = thisData.dataset.length;

    // Data is passed in the tables row wise
    for (let i = 0; i < loop1; i++) {
      // Add data for first column
      currentData[i] = {
        ...currentData[i],
        dataRow: (
          <input
            className={styles.editableInputBold}
            value={thisData.labels[i] ? thisData.labels[i] : ""}
            title={thisData.labels[i] ? `${thisData.labels[i]}` : ""}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_LABEL",
                payload: {
                  index: i,
                  value: e.target.value,
                },
              });
            }}
            key={`row${i}`}
          />
        ),
        deleteRow: (
          <ConfirmationWrapper
            message={"Are you sure?"}
            handler={() => {
              dispatch({
                type: "REMOVE_ROW",
                payload: {
                  rowIndex: i,
                },
              });
            }}
            position={{ x: 35, y: -45 }}
          >
            <div style={{ textAlign: "center" }}>
              <DeleteRounded style={{ margin: "auto" }} />
            </div>
          </ConfirmationWrapper>
        ),
      };
      // Add data for each month
      for (let j = 0; j < 12; j++) {
        if (thisData.dataset[i][j] !== undefined) {
          // Checking for data
          currentData[i] = {
            ...currentData[i],
            [monthsArray[j]]: (
              <input
                className={styles.editableInput}
                value={thisData.dataset[i][j] ? thisData.dataset[i][j] : 0}
                title={
                  thisData.dataset[i][j] ? `${thisData.dataset[i][j]}` : "0"
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
          };
        } else {
          currentData[i] = {
            ...currentData[i],
            [monthsArray[j]]: "",
          };
        }
      }
    }
    return currentData;
  };

  const generateTableConfig = (
    state: ProductDataInterface,
    monthsArray: string[]
  ) => {
    const currentData = { ...state };
    let tableConfig: TableUIConfig = {
      columns: [],
    };

    if (!deleteRowMode) {
      tableConfig.columns.push({
        Header: "",
        accessor: "dataRow",
        width: assignWidth(14, 2),
      });
    } else {
      tableConfig.columns.push({
        Header: "",
        accessor: "deleteRow",
        width: assignWidth(3, 3),
      });
      tableConfig.columns.push({
        Header: "",
        accessor: "dataRow",
        width: assignWidth(14, 2),
      });
    }

    monthsArray.forEach((month) => {
      tableConfig?.columns.push({
        Header: (
          <Typography className={styles.boldText}>
            {capitalize(month)}
          </Typography>
        ),
        accessor: month,
        width: assignWidth(10, 2),
      });
    });
    return tableConfig;
  };

  const tableData = useMemo(
    () => generateTableData(state),
    [state, deleteRowMode]
  );
  const tableConfig = useMemo(
    () => generateTableConfig(state, monthsArray),
    [state.dataset, deleteRowMode]
  );

  console.log(tableData, tableConfig);

  // const renderMonthsCheckbox = (tableConfig: TableUIConfig) => {
  //   let checkboxArray: ReactNode[] = [];

  //   monthsArray.forEach((month: string, i: number) => {
  //     let displayedMonths: (string | number)[] = [];
  //     state.data[currentYear].forEach((arr, i) => {
  //       if (arr && arr.length > 0) displayedMonths.push(arr[0]);
  //     });
  //     checkboxArray.push(
  //       <div key={i}>
  //         <input
  //           type="checkbox"
  //           id={monthsArray[i]}
  //           defaultChecked={displayedMonths.includes(month)}
  //           onClick={() => {
  //             if (!displayedMonths.includes(month)) {
  //               dispatch({
  //                 type: "ADD_MONTH",
  //                 payload: {
  //                   monthName: month,
  //                   index: i,
  //                 },
  //               });
  //             } else {
  //               dispatch({
  //                 type: "REMOVE_MONTH",
  //                 payload: {
  //                   monthName: month,
  //                   index: i,
  //                 },
  //               });
  //             }
  //           }}
  //         />
  //         <label htmlFor={monthsArray[i]}>{capitalize(month)}</label>
  //       </div>
  //     );
  //   });
  //   return checkboxArray;
  // };

  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
  const [showYearConfig, setShowYearConfig] = useState(false);

  // const renderCurrencyOptions = () => {
  //   let currencyList = ["USD", "INR"];
  //   return currencyList.map((c, i) => {
  //     return <Typography key={i}>{c}</Typography>;
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

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">Product Table</Typography>
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
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch({
                  type: "ADD_ROW",
                });
              }}
              className={styles.commonButton}
            >
              Add Row
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setDeleteRowMode(!deleteRowMode);
              }}
              className={styles.commonButton}
            >
              {!deleteRowMode ? "Remove Row" : "Done"}
            </Button>
          </div>
          {/* <div>
            <Button
              onClick={(e) => {
                setEditTable(!editTable);
              }}
              variant="outlined"
              className={styles.dropdownButton}
            >
              Edit Table
            </Button>
            {editTable ? (
              <div
                className={styles.columnConfigBox}
                onMouseLeave={(e) => setEditTable(false)}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch({
                      type: "ADD_ROW",
                    });
                  }}
                >
                  Add Row
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setRemove
                  }}
                >
                  Remove Row
                </Button>
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
              className={`${styles.dropdownButton} ${styles.commonButton}`}
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

export default ProductTable;
