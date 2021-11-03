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
      dataset: [
        ...data.dataset,
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      ],
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
    let loop1 = thisData?.labels?.length;
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
        // Checking for data
        if (i < 3) {
          currentData[i] = {
            ...currentData[i],
            [monthsArray[j]]: (
              <input
                className={styles.editableInput}
                type="number"
                placeholder="Enter Data"
                value={thisData.dataset[i][j]}
                title={
                  thisData.dataset[i][j]
                    ? `${thisData.dataset[i][j]}`
                    : "Enter Data"
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
            [monthsArray[j]]: (
              <Typography className={styles.fixedData}>
                {thisData.dataset[i][j] ? thisData.dataset[i][j] : "No Data"}
              </Typography>
            ),
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

  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
  const [showYearConfig, setShowYearConfig] = useState(false);

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
        <MenuItem value={year} key={i}>
          {year}
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">Product</Typography>
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
