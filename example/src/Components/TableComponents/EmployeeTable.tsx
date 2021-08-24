import React, {
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useReducer,
  ReactElement,
} from "react";
import Table, { TableConfig, TableUIConfig } from "../../Table";
import styles from "./commonTableStyle.module.css";

import {
  // TableDataInterface,
  ActionInterface,
  // TablePropsInterface,
  OptionInterface,
} from "../interfaces";
import {
  Button,
  makeStyles,
  Select,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import ConfirmationWrapper from "../ConfirmationComponent/ConfirmationWrapper";
import { DeleteRounded } from "@material-ui/icons";

interface TablePropsInterface {
  data: TableDataInterface;
  changeHandler: Function;
  deleteHandler: Function;
  // options: {
  //   [key: string]: OptionInterface[];
  // };
}

const employeeTableFields = [
  {
    Header: "Name",
    accessor: "employee_name",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Role Type",
    accessor: "role_type",
  },
  {
    Header: "Role Name",
    accessor: "role_name",
  },
  {
    Header: "CXO",
    accessor: "cxo",
  },
  {
    Header: "Annual Salary",
    accessor: "annual_salary",
  },
  {
    Header: "Start Date",
    accessor: "start_date",
  },
  {
    Header: "End Date",
    accessor: "end_data",
  },
  // {
  //   Header: "id",
  //   accessor: "_id",
  // },
];

export interface TableDataInterface {
  currency?: string;
  fields: OptionInterface[];
  data: (string | number | undefined)[][];
}

interface EmployeeTableRowInterface {
  [key: string]: string | number | undefined | ReactNode | JSX.Element;
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

// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str: string) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

const formatDate = (date: string | number) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const assignWidth = (normalWidth: number, extension: number) =>
  window.innerWidth > 1500 ? normalWidth + extension : normalWidth;

const EmployeeTable = ({
  data,
  changeHandler,
  deleteHandler,
}: TablePropsInterface) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const init = (data: TableDataInterface) => data;
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const [deleteRowMode, setDeleteRowMode] = useState(false);

  const updateData = (
    data: (string | number | undefined)[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number | undefined
  ) => {
    setSaveChangesBtn(true);
    let currentData = [...data];
    currentData[rowIndex][columnIndex] = value;
    return currentData;
  };

  const addRow = (data: (string | number | undefined)[][]) => {
    setSaveChangesBtn(true);
    let currentData: (string | number | undefined)[][] = [];

    if (data !== undefined && data?.length) {
      currentData = [...data];
    }
    currentData.push([]);
    return currentData;
  };

  const removeRow = (
    data: (string | number | undefined)[][],
    rowIndex: number
  ) => {
    return data.filter((d, i) => {
      return i === rowIndex ? false : true;
    });
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
          data: updateData(
            currentState.data,
            action.payload.rowIndex,
            action.payload.columnIndex,
            action.payload.value
          ),
        };
      case "ADD_ROW":
        return {
          ...currentState,
          data: addRow(currentState.data),
        };
      case "REMOVE_ROW": {
        setSaveChangesBtn(true);
        return {
          ...currentState,
          data: removeRow(currentState.data, action?.payload?.rowIndex),
        };
      }
      case "RESET":
        return action.payload;
    }
    return state;
  };

  const checkIfObject = (value: any) => {
    if (typeof value === "object") return "";
    return value;
  };

  const checkIfOptionValue = (
    value: string | number | { Header: string; accessor: string }
  ) => {
    if (typeof value === "string") return undefined;
    else if (typeof value === "number") return undefined;
    else return value;
  };
  const [state, dispatch] = useReducer(reducer, data, init);

  const departmentOptions = [
    "Choose",
    "General Management",
    "Administration",
    "Operations",
    "Human Resource",
    "Purchase",
    "Engineering",
    "Finance",
    "Sales",
    "Marketing",
    "Product",
    "Customer Support",
    "Legal",
  ];
  const roleTypeOptions = [
    "Choose",
    "Contract",
    "Part-time",
    "Full-time",
    "Internship",
    "Apprenticeship",
    "Freelance",
  ];
  const booleanOption = ["Choose", "true", "false"];
  const renderTableOptions = (num: number) => {
    if (num === 1) {
      return departmentOptions.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        );
      });
    }
    if (num === 2) {
      return roleTypeOptions.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        );
      });
    }
    if (num === 4) {
      return booleanOption.map((item, i) => {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        );
      });
    }
  };

  const getDateString = (str: string | undefined) => {
    if (typeof str === "string") {
      return str.split("T")[0];
    }
  };

  const passRequiredElement = (
    i: number,
    j: number,
    thisData: TableDataInterface,
    currentData: EmployeeTableRowInterface[]
  ): ReactElement | ReactNode | string | undefined => {
    switch (j) {
      case 1:
      case 2:
      case 4:
        return (
          <Typography style={{ display: "flex", width: "100%" }}>
            <select
              className={styles.selectInput}
              value={thisData.data[i][j]}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_DATA",
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: e.target.value,
                  },
                });
              }}
            >
              {renderTableOptions(j)}
            </select>
          </Typography>
        );
      case 6:
      case 7:
        return thisData.data[i][j] ? (
          <Typography>
            <input
              type="date"
              onChange={(e) => {
                let d = new Date(e.target.value);
                dispatch({
                  type: "UPDATE_DATA",
                  payload: {
                    rowIndex: i,
                    columnIndex: j,
                    value: d.toISOString(),
                  },
                });
              }}
              className={styles.selectInput}
              value={getDateString(thisData.data[i][j]?.toString())}
            />
          </Typography>
        ) : (
          <Typography
            onClick={() => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: new Date().toISOString(),
                },
              });
            }}
          >
            Add Date
          </Typography>
        );
      case 5:
        return (
          <input
            className={styles.editableInput}
            type="number"
            value={thisData.data[i][j] !== undefined ? thisData.data[i][j] : 0}
            title={
              thisData.data[i][j] !== undefined ? `${thisData.data[i][j]}` : "0"
            }
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: e.target.value,
                },
              });
            }}
            key={`row${i}column${j}`}
          />
        );
      default:
        return (
          <input
            className={styles.editableInput}
            // type="number"
            value={
              thisData.data[i][j] !== undefined
                ? thisData.data[i][j]
                : "Enter Data"
            }
            title={
              thisData.data[i][j] !== undefined
                ? `${thisData.data[i][j]}`
                : "Enter Data  "
            }
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: e.target.value,
                },
              });
            }}
            key={`row${i}column${j}`}
          />
        );
    }
  };

  const generateTableData = (state: TableDataInterface) => {
    const thisData = { ...state };
    const currentData: EmployeeTableRowInterface[] = [];
    if (state.data) {
      // 1st loop is for iterating over rows
      let loop1 = thisData.data.length;
      // 2nd loop is for iterating over columns
      let loop2 = thisData.fields.length;
      for (let i = 0; i < loop1; i++) {
        if (deleteRowMode) {
          currentData[i] = {
            ...currentData[i],
            deleteRow: (
              <ConfirmationWrapper
                message={"Are you sure?"}
                handler={() => {
                  // dispatch({
                  //   type: "REMOVE_ROW",
                  //   payload: {
                  //     rowIndex: i,
                  //   },
                  // });
                  deleteHandler({
                    ...thisData,
                    data: [thisData.data[i]],
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
        }
        for (let j = 0; j < loop2; j++) {
          currentData[i] = {
            ...currentData[i],
            [thisData.fields[j].accessor]: passRequiredElement(
              i,
              j,
              thisData,
              currentData
            ),
          };
        }
      }
    }
    return currentData;
  };

  const generateTableConfig = () => {
    if (!deleteRowMode) {
      return {
        columns: employeeTableFields,
      };
    } else {
      return {
        columns: [
          {
            Header: "",
            accessor: "deleteRow",
            width: assignWidth(3, 0),
          },
          ...employeeTableFields,
        ],
      };
    }
  };
  // thisData.data[currentYear][i][j]

  React.useEffect(() => {
    if (data !== undefined) {
      dispatch({
        type: "RESET",
        payload: data,
      });
    }
  }, [data]);

  const tableData = useMemo(
    () => generateTableData(state),
    [state, deleteRowMode]
  );
  const tableConfig = useMemo(() => generateTableConfig(), [deleteRowMode]);

  // const tableConfig: TableUIConfig = {
  //   columns: employeeTableFields,
  // };

  return (
    <div className={classes.mainTableContainer}>
      <div className={classes.infoContainer}>
        <Typography variant="h4">Employee</Typography>
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
      </div>
      <div className={styles.tableContainer}>
        <div>
          <Table config={tableConfig} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
