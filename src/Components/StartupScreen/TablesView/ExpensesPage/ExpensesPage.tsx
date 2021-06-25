import React, { useState } from 'react'
import RevenueTable from '../../../TableComponents/RevenueTable'
import { testData, usersTableData } from '../../../../RevenueData'
import { Container } from '@material-ui/core'
import UsersTable from '../../../TableComponents/UsersTable'
import ExpensesTable from '../../../TableComponents/ExpensesTable'
import OpexExpensesTable from '../../../TableComponents/OpexExpensesTable'

interface OptionInterface {
  Header: string
  accessor: string
}
interface TableDataInterface {
  currency?: string
  fields: OptionInterface[]
  data: YearDataInterface
}

interface YearDataInterface {
  [key: string]: (string | number)[][]
}
const expensesData = {
  currency: 'INR',
  fields: [
    { Header: '', accessor: '' },
    { Header: 'Total COGS', accessor: 'total_cogs' },
    {
      Header: 'Total Customer Support Expenses',
      accessor: 'total_customer_support_expenses'
    },
    { Header: 'Total Payroll - Support', accessor: 'total_payroll_support' },
    {
      Header: 'Software & Tools - Support',
      accessor: 'software_and_tools_support'
    },
    {
      Header: 'Total Service Delivery Expenses',
      accessor: 'total_service_delivery_expenses'
    },
    {
      Header: 'Hosting - Service Delivery',
      accessor: 'hosting_service_delivery'
    },
    {
      Header: 'Total Cost of Good Manufactured',
      accessor: 'total_cost_of_goods_manufactured'
    },
    { Header: 'Direct Material Costs', accessor: 'direct_material_costs' },
    { Header: 'Direct Labor Costs', accessor: 'direct_labor_costs' },
    { Header: 'Manufacturing Overhead', accessor: 'manufacturing_overhead' },
    { Header: 'Net WIP Inventory', accessor: 'net_wip_inventory' },
    {
      Header: 'Net Finished Goods Inventory',
      accessor: 'net_finished_goods_inventory'
    },
    { Header: 'Total Other COGS', accessor: 'total_other_cogs' }
  ],
  data: {
    '2020': [['janurary'], ['february'], ['march'], ['april'], ['may']],
    '2019': [['janurary'], ['february'], ['march'], ['april'], ['may']]
  }
}

const opexExpesesData = {
  currency: 'INR',
  fields: [
    { Header: '', accessor: '' },
    { Header: 'Total OPEX Expenses', accessor: 'total_opex_expenses' },
    {
      Header: 'Total General And Administrative Expenses',
      accessor: 'total_general_and_administrative_expenses'
    },
    {
      Header: 'Total Sales and Marketing Expenses',
      accessor: 'total_sales_and_marketing_expenses'
    },
    {
      Header: ' Total Research And Development Expenses',
      accessor: 'total_research_and_development_expenses'
    },
    { Header: 'Total Other Expenses', accessor: 'total_other_expenses' }
  ],
  data: {
    '2020': [['janurary'], ['february'], ['march'], ['april'], ['may']],
    '2019': [['janurary'], ['february'], ['march'], ['april'], ['may']]
  }
}
const ExpensesPage = () => {
  const [tableData, setTableData] = useState<TableDataInterface | null>(
    expensesData
  )

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        marginTop: '64px',
        flexDirection: 'column',
        gap: '64px'
      }}
    >
      {tableData ? (
        <div>
          <ExpensesTable
            data={tableData}
            changeHandler={(value) => {
              console.log(value)
              setTableData(value)
            }}
          />
          {/* <UsersTable data={usersTableData} changeHandler={() => {}} /> */}

          <OpexExpensesTable
            data={opexExpesesData}
            changeHandler={(value) => {
              console.log(value)
              // setTableData(value);
            }}
          />
        </div>
      ) : (
        <div>No Data Avaliable</div>
      )}
    </div>
  )
}

export default ExpensesPage

// const serverData = {
//   currency: "INR",
//   fields: [
//     { Header: "Total COGS", accessor: "total_cogs" },
//     {
//       Header: "Total Customer Support Expenses",
//       accessor: "total_customer_support_expenses",
//     },
//     { Header: "Total Payroll - Support", accessor: "total_payroll_support" },
//     {
//       Header: "Software & Tools - Support",
//       accessor: "software_and_tools_support",
//     },
//     {
//       Header: "Total Service Delivery Expenses",
//       accessor: "total_service_delivery_expenses",
//     },
//     {
//       Header: "Hosting - Service Delivery",
//       accessor: "hosting_service_delivery",
//     },
//     {
//       Header: "Total Cost of Good Manufactured",
//       accessor: "total_cost_of_goods_manufactured",
//     },
//     { Header: "Direct Material Costs", accessor: "direct_material_costs" },
//     { Header: "Direct Labor Costs", accessor: "direct_labor_costs" },
//     { Header: "Manufacturing Overhead", accessor: "manufacturing_overhead" },
//     { Header: "Net WIP Inventory", accessor: "net_wip_inventory" },
//     {
//       Header: "Net Finished Goods Inventory",
//       accessor: "net_finished_goods_inventory",
//     },
//     { Header: "Total Other COGS", accessor: "total_other_cogs" },
//   ],
//   data: {
//     "2020": [["janurary"], ["february"], ["march"], ["april"], ["may"]],
//     "2019": [["janurary"], ["february"], ["march"], ["april"], ["may"]],
//   },
// };
