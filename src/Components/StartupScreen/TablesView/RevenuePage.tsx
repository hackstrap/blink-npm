import React, { useContext, useState } from "react";
import RevenueTable from "../../TableComponents/RevenueTable";
import { testData, usersTableData } from "../../../RevenueData";
import { CircularProgress, Container } from "@material-ui/core";
import UsersTable from "../../TableComponents/UsersTable";
import {
  fetchCollection,
  fetchCollectionUnity,
  updateCollection,
} from "../../fetch";
import {
  TableDataInterface,
  YearDataInterface,
  OptionInterface,
} from "../../interfaces";
import { globalContext } from "../../../AppContext";
export const fields = [
  {
    Header: "",
    accessor: "",
  },
  {
    Header: "Total Revenue",
    accessor: "total_revenue",
  },
  {
    Header: "Total MRR",
    accessor: "total_mrr",
  },
  {
    Header: "Total New MRR",
    accessor: "total_new_mrr",
  },
  {
    Header: "Total Non-Recurring Revenue",
    accessor: "total_non_recurring_revenue",
  },
];

export const userTableFields = [
  { Header: "", accessor: "" },
  {
    Header: "Total Registered Users",
    accessor: "total_registered_users",
  },
  {
    Header: "Total Monthly Active Users",
    accessor: "total_monthly_active_users",
  },
  { Header: "Total Customer", accessor: "total_customers" },
  // { Header: "Total new MMR", accessor: "totalNewMMR" },
  // { Header: "Total New Customers", accessor: "totalNewCustomers" },
  // { Header: "ARPC -Total New Customers", accessor: "arpc_totalNewCustomers" },
  {
    Header: "Total Customers at the beginning of Month",
    accessor: "total_customers_at_beginning_of_month",
  },
  {
    Header: "Total New Customers Acquired",
    accessor: "total_new_customers_acquired",
  },
  {
    Header: "Total New Customers Churned",
    accessor: "total_customers_churned",
  },
];

export const createEmptyData = (year: string, fields: OptionInterface[]) => {
  const initYearData = () => {
    let data: (string | undefined)[][] = [];
    for (let i = 0; i < 12; i++) {
      data[i] = fields.map((field, j) => {
        if (j === 0) {
          return monthsArray[i];
        } else {
          return undefined;
        }
      });
    }
    return data;
  };
  return {
    currency: "INR",
    fields,
    data: {
      [year]: initYearData(),
    },
  };
};

export const convertToFrontendSchema = (
  data: object[],
  fields: OptionInterface[],
  year: string
) => {
  // fields = fields.slice(1);
  const convertedData: any = {
    fields,
    data: {
      [year]: [],
    },
    currency: "INR",
  };

  if (data.length == 0) {
    return createEmptyData(year, fields);
  } else {
    let currentData: any = [...data];
    currentData = currentData.sort((m1: any, m2: any) => {
      return m1["month"] - m2["month"];
    });
    convertedData.data[year] = currentData.map((monthData: any) => {
      let arr: (string | undefined | number)[] = [];
      fields.forEach((field, i) => {
        if (monthData[field.accessor] || monthData[field.accessor] === 0) {
          arr.push(monthData[field.accessor]);
        } else if (i === 0) {
          arr.push(monthsArray[monthData["month"] - 1]);
        } else {
          arr.push(undefined);
        }
      });
      arr.push(monthData._id);
      return arr;
    });
    return convertedData;
  }
};

export const convertToBackendSchema = (
  data: TableDataInterface,
  fields: OptionInterface[],
  year: string,
  startupId: string
) => {
  // fields should be strictly according to sequence of table rows
  let serverData = data.data[year].map((monthData, monthIndex) => {
    let obj = {};
    data.fields.forEach((field, i) => {
      let d = monthData[i]?.toString();
      if (i !== 0) {
        // because we want to ignore 1st field
        obj = {
          ...obj,
          [field.accessor]: d ? parseInt(d) : null,
        };
      }
    });
    // Adding the id
    if (monthData[fields.length]) {
      obj = {
        ...obj,
        // as ID will be the last one in array
        _id: monthData[fields.length],
      };
    } else {
      obj = {
        ...obj,
        month: monthIndex + 1,
        year: parseInt(year),
        startup_id: startupId,
      };
    }

    return obj;
  });
  return serverData;
};

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

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const RevenuePage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const [revenueTableData, setRevenueTableData] =
    useState<TableDataInterface | null>(null);
  const [usersTableData, setUsersTableData] =
    useState<TableDataInterface | null>(null);
  // const [rawRevenueData, setRawRevenueData] = useState<object[] | null>(null);
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [currentYearUserTable, setCurrentYearUserTable] = useState<string>(
    // new Date().getFullYear().toString()
    "2020"
  );
  const getRevenueData = () => {
    fetchCollectionUnity(
      appContext?.apiRoute,
      appContext?.token,
      "revenue",
      currentYear,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          fields,
          currentYear
        );

        setRevenueTableData(frontendData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = () => [
    fetchCollectionUnity(
      appContext?.apiRoute,
      appContext?.token,
      "users",
      currentYearUserTable,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          userTableFields,
          currentYearUserTable
        );
        setUsersTableData(frontendData);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];
  React.useEffect(() => {
    getRevenueData();
  }, [currentYear]);

  React.useEffect(() => {
    getUserData();
  }, [currentYearUserTable]);

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
      {revenueTableData ? (
        <div>
          <RevenueTable
            data={revenueTableData}
            currentYear={currentYear}
            setCurrentYear={(year: string) => {
              setCurrentYear(year);
            }}
            changeHandler={(value) => {
              const data = convertToBackendSchema(
                value,
                fields,
                currentYear,
                props.selectedStartup.accessor
              );
              updateCollection(
                appContext?.apiRoute,
                appContext?.token,
                "revenue",
                data,
                props.selectedStartup.accessor
              )
                .then((res) => getRevenueData())
                .catch((err) => console.log(err));
            }}
          />
          <br />
        </div>
      ) : (
        <CircularProgress />
      )}
      {usersTableData ? (
        <UsersTable
          data={usersTableData}
          changeHandler={(value) => {
            const data = convertToBackendSchema(
              value,
              userTableFields,
              currentYearUserTable,
              props.selectedStartup.accessor
            );
            updateCollection(
              appContext?.apiRoute,
              appContext?.token,
              "users",
              data,
              props.selectedStartup.accessor
            )
              .then((res) => getUserData())
              .catch((err) => console.log(err));
          }}
          currentYear={currentYearUserTable}
          setCurrentYear={(year: string) => {
            setCurrentYearUserTable(year);
          }}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default RevenuePage;
