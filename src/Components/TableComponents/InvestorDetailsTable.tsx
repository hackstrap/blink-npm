import { TextField } from "@material-ui/core";
import React, {
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useReducer,
  ReactElement,
} from "react";
import Table, { TableConfig, TableUIConfig } from "../../Table";
import DropdownComponent from "../DropdownComponent/DropdownComponent";
import styles from "./commonTableStyle.module.css";

interface YearDataInterface {
  [key: string]: (string | number | { Header: string; accessor: string })[][];
}
interface TableDataInterface {
  fields: { Header: string; accessor: string }[];
  data: YearDataInterface;
}

interface OptionsInterface {
  department: { Header: string; accessor: string }[];
  roleType: { Header: string; accessor: string }[];
}

interface TablePropsInterface {
  data: TableDataInterface;
  changeHandler: (data: TableDataInterface) => void;
}

interface ActionInterface {
  type: string;
  payload?: any;
}

interface TablePropsInterface {
  data: TableDataInterface;
  changeHandler: (data: TableDataInterface) => void;
}

interface InvestorDetailsTableRowInterface {
  [key: string]: string | number | ReactNode | JSX.Element;
}

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

const InvestorDetailsTable = ({ data, changeHandler }: TablePropsInterface) => {
  const [currentYear, setCurrentYear] = useState("2021");

  const init = (data: TableDataInterface) => data;

  const updateData = (
    data: (string | number | { Header: string; accessor: string })[][],
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => {
    data[rowIndex][columnIndex] = value;
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
              action.payload.rowIndex,
              action.payload.columnIndex,
              action.payload.value
            ),
          },
        };
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

  const passRequiredElement = (
    i: number,
    j: number,
    thisData: TableDataInterface,
    currentData: InvestorDetailsTableRowInterface[]
  ): ReactElement | ReactNode | string | number => {
    switch (j) {
      case 1:
        return (
          // <input
          //   type="date"
          //   onChange={(e) => {
          //     dispatch({
          //       type: "UPDATE_DATA",
          //       payload: {
          //         rowIndex: i,
          //         columnIndex: j,
          //         value: new Date(e.target.value).getTime(),
          //       },
          //     });
          //   }}
          //   value={checkIfObject(thisData.data[currentYear][i][j])}
          // />
          <TextField
            type="date"
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: new Date(e.target.value).getTime(),
                },
              });
            }}
            defaultValue={checkIfObject(thisData.data[currentYear][i][j])}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        );
      case 2:
        return (
          <input
            className={styles.editableInput}
            type="number"
            value={
              thisData.data[currentYear][i][j]
                ? checkIfObject(thisData.data[currentYear][i][j])
                : 0
            }
            title={
              thisData.data[currentYear][i][j]
                ? `${thisData.data[currentYear][i][j]}`
                : "0"
            }
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: checkIfObject(e.target.value),
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
            value={
              thisData.data[currentYear][i][j]
                ? checkIfObject(thisData.data[currentYear][i][j])
                : ""
            }
            title={
              thisData.data[currentYear][i][j]
                ? `${thisData.data[currentYear][i][j]}`
                : "0"
            }
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DATA",
                payload: {
                  rowIndex: i,
                  columnIndex: j,
                  value: checkIfObject(e.target.value),
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
    const currentData: InvestorDetailsTableRowInterface[] = [];
    if (state.data[currentYear]) {
      // 1st loop is for iterating over rows
      let loop1 = thisData.data[currentYear].length;
      // 2nd loop is for iterating over columns
      let loop2 = thisData.fields.length;
      for (let i = 0; i < loop1; i++) {
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

  // thisData.data[currentYear][i][j]

  const tableData = useMemo(() => generateTableData(state), [state]);
  // const tableConfig = useMemo(
  //   () => generateTableConfig(state, monthsArray),
  //   []
  // );

  const tableConfig: TableUIConfig = {
    columns: [
      {
        Header: "Investor Name",
        accessor: "name",
        width: assignWidth(15, 0),
      },
      {
        Header: "Date",
        accessor: "date",
        width: assignWidth(15, 0),
      },
      {
        Header: "Amount",
        accessor: "amount",
        width: assignWidth(10, 0),
      },
      {
        Header: "Email",
        accessor: "email",
        width: assignWidth(10, 0),
      },
    ],
  };

  const [showCurrencyConfig, setShowCurrencyConfig] = useState(false);
  const [showYearConfig, setShowYearConfig] = useState(false);

  const renderCurrencyOptions = () => {
    let currencyList = ["USD", "INR"];
    return currencyList.map((c, i) => {
      return <div key={i}>{c}</div>;
    });
  };

  const renderYearOptions = (years: string[]) => {
    return years.map((year, i) => {
      return <div key={i}>{year}</div>;
    });
  };

  return (
    // <div className={styles.mainTableContainer}>
    //   <div className={styles.infoContainer}>
    //     <div className={styles.tableHeading}>Investor Details</div>
    //   </div>
    <div className={styles.tableContainer}>
      <div>
        <Table config={tableConfig} data={tableData} />
      </div>
    </div>
    // </div>
  );
};

export default InvestorDetailsTable;
