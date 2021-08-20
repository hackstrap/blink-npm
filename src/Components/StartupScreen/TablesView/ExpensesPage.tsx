import React, { useContext, useState } from "react";
// import { Container } from "@material-ui/core";
import ExpensesTable from "../../TableComponents/ExpensesTable";
import OpexExpensesTable from "../../TableComponents/OpexExpensesTable";
import { OptionInterface, TableDataInterface } from "../../interfaces";
import { fetchCollection, updateCollection } from "../../fetch";
import { convertToFrontendSchema, convertToBackendSchema } from "./RevenuePage";
import { globalContext } from "../../../AppContext";

// const expensesData = {
//   currency: 'INR',
//   fields: ,
//   data: {
//     '2020': [['january'], ['february'], ['march'], ['april'], ['may']],
//     '2019': [['january'], ['february'], ['march'], ['april'], ['may']]
//   }
// }

const expenseTableFields = [
  { Header: "", accessor: "" },
  { Header: "Total COGS", accessor: "total_cogs" },
  {
    Header: "Total Customer Support Expenses",
    accessor: "total_customer_support_expenses",
  },
  { Header: "Total Payroll - Support", accessor: "total_payroll_support" },
  {
    Header: "Software & Tools - Support",
    accessor: "software_and_tools_support",
  },
  {
    Header: "Total Service Delivery Expenses",
    accessor: "total_service_delivery_expenses",
  },
  {
    Header: "Hosting - Service Delivery",
    accessor: "hosting_service_delivery",
  },
  {
    Header: "Total Cost of Good Manufactured",
    accessor: "total_cost_of_goods_manufactured",
  },
  { Header: "Direct Material Costs", accessor: "direct_material_costs" },
  { Header: "Direct Labor Costs", accessor: "direct_labor_costs" },
  { Header: "Manufacturing Overhead", accessor: "manufacturing_overhead" },
  { Header: "Net WIP Inventory", accessor: "net_wip_inventory" },
  {
    Header: "Net Finished Goods Inventory",
    accessor: "net_finished_goods_inventory",
  },
  { Header: "Total Other COGS", accessor: "total_other_cogs" },
];

const opexTableFields = [
  { Header: "", accessor: "" },
  { Header: "Total OPEX Expenses", accessor: "total_opex_expenses" },
  {
    Header: "Total General And Administrative Expenses",
    accessor: "total_general_and_administrative_expenses",
  },
  {
    Header: "Total Sales and Marketing Expenses",
    accessor: "total_sales_and_marketing_expenses",
  },
  {
    Header: " Total Research And Development Expenses",
    accessor: "total_research_and_development_expenses",
  },
  { Header: "Total Other Expenses", accessor: "total_other_expenses" },
];

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const ExpensesPage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const [expenseTableData, setExpenseTableData] =
    useState<TableDataInterface | null>(null);
  const [opexTableData, setOpexTableData] = useState<TableDataInterface | null>(
    null
  );
  const [currentYearExpenseTable, setCurrentYearEpenseTable] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [currentYearOpexTable, setCurrentYearOpexTable] = useState<string>(
    new Date().getFullYear().toString()
  );
  const getData1 = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "expense",
      currentYearExpenseTable,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          expenseTableFields,
          currentYearExpenseTable
        );
        setExpenseTableData(frontendData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData2 = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "opex",
      currentYearOpexTable,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          opexTableFields,
          currentYearOpexTable
        );
        setOpexTableData(frontendData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getData1();
  }, [currentYearExpenseTable]);

  React.useEffect(() => {
    getData2();
  }, [currentYearOpexTable]);
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
      {expenseTableData ? (
        <div>
          <ExpensesTable
            data={expenseTableData}
            changeHandler={(value) => {
              const serverData = convertToBackendSchema(
                value,
                expenseTableFields,
                currentYearExpenseTable,
                props.selectedStartup.accessor
              );
              updateCollection(
                appContext?.apiRoute,
                appContext?.token,
                "expense",
                serverData,
                props.selectedStartup.accessor
              )
                .then((res) => {
                  getData1();
                })
                .catch((res) => {
                  console.log(res);
                });
            }}
            currentYear={currentYearExpenseTable}
            setCurrentYear={(year: string) => setCurrentYearEpenseTable(year)}
          />
          {/* <UsersTable data={usersTableData} changeHandler={() => {}} /> */}
        </div>
      ) : (
        <div>No Data Avaliable</div>
      )}
      {opexTableData ? (
        <OpexExpensesTable
          data={opexTableData}
          changeHandler={(value) => {
            const serverData = convertToBackendSchema(
              value,
              opexTableFields,
              currentYearOpexTable,
              props.selectedStartup.accessor
            );
            updateCollection(
              appContext?.apiRoute,
              appContext?.token,
              "expense",
              serverData,
              props.selectedStartup.accessor
            )
              .then((res) => {
                getData2();
              })
              .catch((err) => console.log(err));
          }}
          currentYear={currentYearOpexTable}
          setCurrentYear={(year: string) => setCurrentYearOpexTable(year)}
        />
      ) : (
        <div>No Data Avaliable</div>
      )}
    </div>
  );
};

export default ExpensesPage;
