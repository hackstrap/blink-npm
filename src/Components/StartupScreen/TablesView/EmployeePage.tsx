import React, { useContext, useState } from "react";
import OpexExpensesTable from "../../TableComponents/OpexExpensesTable";
import { OptionInterface } from "../../interfaces";
import {
  deleteCollection,
  fetchCollection,
  updateCollection,
} from "../../fetch";

// import {
//   convertToFrontendSchema,
//   convertToBackendSchema,
// } from "../RevenuePage/RevenuePage";
import EmployeeTable from "../../TableComponents/EmployeeTable";
import { globalContext } from "../../../AppContext";
import { extractChartData } from "../../ChartsWrapper/MRRChart";

interface PropsInterface {
  selectedStartup: OptionInterface;
}

export interface TableDataInterface {
  currency?: string;
  fields: OptionInterface[];
  data: (string | undefined)[][];
}

export const convertToFrontendSchema = (
  data: object[],
  fields: OptionInterface[]
) => {
  const convertedData: any = {
    fields: [...fields],
    data: [],
    currency: "INR",
  };
  if (data.length == 0) {
    console.log("no data");
    return convertedData;
  } else {
    convertedData.data = data.map((document: any) => {
      let arr: (string | undefined)[] = [];
      fields.forEach((field, i) => {
        if (document[field.accessor]) {
          arr.push(document[field.accessor]);
        } else {
          arr.push(undefined);
        }
      });
      arr.push(document._id);
      return arr;
    });
    return convertedData;
  }
};

export const convertToBackendSchema = (
  data: TableDataInterface,
  fields: OptionInterface[],
  startupId: string
) => {
  // fields should be strictly according to sequence of table rows
  let serverData = data.data.map((rowData, rowIndex) => {
    let obj: any = {};

    data.fields.forEach((field, i) => {
      let d = rowData[i]?.toString();

      // because we want to ignore 1st field
      obj = {
        ...obj,
        [field.accessor]: d ? parseInt(d) : null,
      };
    });
    // Adding the id
    if (rowData[fields.length]) {
      obj = {
        ...obj,
        // as ID will be the last one in array
        _id: rowData[fields.length],
      };
    } else {
      obj = {
        ...obj,
        startup_id: startupId,
        employee_id: "",
      };
    }

    return obj;
  });
  return serverData;
};

// export const employeeTableOptions = {
//   department: [
//     {
//       Header: "HR",
//       accessor: "hr",
//     },
//     {
//       Header: "Sales",
//       accessor: "sales",
//     },
//     {
//       Header: "Finance",
//       accessor: "finance",
//     },
//   ],
//   roleType: [
//     {
//       Header: "Full-time Employee",
//       accessor: "fte",
//     },
//     {
//       Header: "Part-Time Employee",
//       accessor: "pte",
//     },
//     {
//       Header: "Intern",
//       accessor: "intern",
//     },
//   ],
// };

export const employeeTableFields = [
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

const EmployeePage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const [employeeTableData, setEmployeeTableData] =
    useState<TableDataInterface | null>(null);
  // const [currentYearEmployeeTable, setCurrentYearEmployeeTable] =
  //   useState<string>(new Date().getFullYear().toString());

  const getData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "employee",
      undefined,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          employeeTableFields
        );
        setEmployeeTableData(frontendData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginTop: "64px",
        flexDirection: "column",
        gap: "64px",
      }}
    >
      {employeeTableData ? (
        <div>
          <EmployeeTable
            data={employeeTableData}
            deleteHandler={(data: TableDataInterface) => {
              const serverData = convertToBackendSchema(
                data,
                employeeTableFields,
                props.selectedStartup.accessor
              );
              console.log(serverData);
              deleteCollection(
                appContext?.apiRoute,
                appContext?.token,
                "employee",
                serverData,
                serverData[0]?._id
              )
                .then((res) => {
                  getData();
                })
                .catch((err) => console.log(err));
            }}
            changeHandler={(value: TableDataInterface) => {
              const serverData = convertToBackendSchema(
                value,
                employeeTableFields,
                props.selectedStartup.accessor
              );
              updateCollection(
                appContext?.apiRoute,
                appContext?.token,
                "employee",
                serverData,
                props.selectedStartup.accessor
              )
                .then((res) => {
                  getData();
                })
                .catch((err) => console.log(err));
            }}
            // currentYear={currentYearEmployeeTable}
            // setCurrentYear={(year: string) => setCurrentYearEmployeeTable(year)}
            // options={employeeTableOptions}
          />
          {/* <UsersTable data={usersTableData} changeHandler={() => {}} /> */}
        </div>
      ) : (
        <div>No Data Avaliable</div>
      )}
    </div>
  );
};

export default EmployeePage;
