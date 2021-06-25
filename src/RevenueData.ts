export interface MonthDataInterface {
  monthName: string;
  totalRevenue: number;
  mmr: number;
  newMmr: number;
  churn: number;
}

export interface RevenueDataInterface {
  data: {
    [key: string]: (string | number)[][];
  };
  fields: string[];
  currency: string;
}

interface OptionInterface {
  Header: string;
  accessor: string;
}

export interface ExpensesDataInterface {
  data: {
    [key: string]: (string | number)[][];
  };
  fields: OptionInterface[];
  currency: string;
}

// export const arrayData = {
//     fields : [
//         '', 'Total Revenue', 'MMR', 'New MMR', 'Churn'
//       ],
//     data : [
//         ['janurary',3500,1000,1500,1000],
//         ['february',3500,1000,1500,1000],
//         ['march',3500,1000,1500,1000],
//         ['april',3500,1000,1500,1000]

//     ]
// }

export const testData: RevenueDataInterface = {
  currency: "INR",
  fields: [
    "",
    "Total Revenue",
    "MMR",
    "Total Non-Recurring Revenue",
    "Total Costs of Goods Sold",
    "Total Gross Profit Margin",
  ],
  data: {
    "2020": [
      ["janurary", 3500, 1000, 1500, 1000],
      ["february", 3500, 1000, 1500, 1000],
      ["march", 3500, 1000, 1500, 1000],
      ["april", 3500, 1000, 1500, 1000],
      ["may", 3500, 1000, 1500, 1000],
      ["june", 3500, 1000, 1500, 1000],
      ["july", 3500, 1000, 1500, 1000],
      ["august", 3500, 1000, 1500, 1000],
      ["september", 3500, 1000, 1500, 1000],
      ["october", 3500, 1000, 1500, 1000],
      ["november", 3500, 1000, 1500, 1000],
      ["december", 3500, 1000, 1500, 1000],
    ],
    "2019": [
      ["janurary", 3500, 1000, 1500, 1000],
      ["february", 3500, 1000, 1500, 1000],
      ["march", 3500, 1000, 1500, 1000],
      ["april", 3500, 1000, 1500, 1000],
    ],
  },
};

export const usersTableData = {
  currency: "INR",
  fields: [
    { Header: "", accessor: "" },
    { Header: "Total Customer", accessor: "total_customer" },
    { Header: "Total Monthly Active Users", accessor: "monthlyActiveUser" },
    // { Header: "Total new MMR", accessor: "totalNewMMR" },
    // { Header: "Total New Customers", accessor: "totalNewCustomers" },
    // { Header: "ARPC -Total New Customers", accessor: "arpc_totalNewCustomers" },
    {
      Header: "Total Customers at the beginning of Month",
      accessor: "totalCustomersAtBeginningOfMonth",
    },
    {
      Header: "Total New Customers Acquired",
      accessor: "totalNewCustomersAcquired",
    },
    {
      Header: "Total New Customers Churned",
      accessor: "totalNewCustomersChurned",
    },
    // {
    //   Header: "Average Revenue Per Account",
    //   accessor: "averageRevenuePerAccount",
    // },
  ],
  data: {
    "2020": [
      ["janurary", 3500, 2500, 1500, 6566, 500, 10],
      ["february", 3500, 2500, 1500, 6566, 500, 10],
      ["march", 3500, 2500, 1500, 6566, 500, 10],
      ["april", 3500, 2500, 1500, 6566, 500, 10],
    ],
    "2019": [
      ["janurary", 3500, 2500, 1500, 6566, 500, 10],
      ["february", 3500, 2500, 1500, 6566, 500, 10],
      ["march", 3500, 2500, 1500, 6566, 500, 10],
      ["april", 3500, 2500, 1500, 6566, 500, 10],
    ],
  },
};

const productsData = {
  currency: "INR",
  fields: ["Products", "P1-Basic Plan", "Pro Plan", "Premium Plan"],
};

export const expensesData: ExpensesDataInterface = {
  currency: "INR",
  fields: [
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
      Header: "Total Cost of Goods Manufactured",
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
  ],

  //   _id
  // :
  // 60c0f545a1936549a288329a
  // software_and_tools_support
  // :
  // 4958
  // direct_material_costs
  // :
  // 0
  // manufacturing_overhead
  // :
  // 0
  // total_customer_support_expenses
  // :
  // 34283
  // total_payroll_support
  // :
  // 29325
  // hosting_service_delivery
  // :
  // 30517
  // net_finished_goods_inventory
  // :
  // 0
  // currency
  // :
  // "INR"
  // total_cogs
  // :
  // 64800
  // total_service_delivery_expenses
  // :
  // 30517
  // total_cost_of_goods_manufactured
  // :
  // 0
  // startup_id
  // :
  // "startup-1slug"
  // timestamp
  // :
  // 2019-01-31T12:59:59.000+00:00
  // direct_labor_costs
  // :
  // 0
  // net_wip_inventory
  // :
  // 0
  // total_other_cogs
  // :
  // 0
  data: {
    "2020": [
      ["janurary", 1500, 1200, 3500, 4522, 1000],
      ["february", 2500, 2200, 3500, 300, 5000],
      ["march", 500, 2200, 1500, 4500, 1000],
      ["april", 3800, 1200, 3500, 2000, 1000],
    ],
  },
};

export const employeeData = {
  currency: "INR",
  fields: [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Role Type",
      accessor: "roleType",
    },
    {
      Header: "Position",
      accessor: "position",
    },
    {
      Header: "Annual Salary",
      accessor: "annualSalary",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
  ],
  data: {
    "2020": [
      [
        "test employee 1",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
      [
        "test employee 2",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
      [
        "test employee 3",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
    ],
    "2021": [
      [
        "test employee 1",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
      [
        "test employee 2",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
      [
        "test employee 3",
        { Header: "Part-Time Employee", accessor: "pte" },
        { Header: "Sales", accessor: "sales" },
        "Position Name",
        "6500",
        1620432000000,
        1620432000000,
      ],
    ],
  },
};

export const teamTable = {
  fields: [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Permissions", accessor: "permissions" },
    { Header: "Remove User", accessor: "removeUser" },
  ],
  data: [
    ["Jon Doe", "jondoe@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 1", "jondoe1@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 2", "jondoe2@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 3", "jondoe3@gmail.com", { Header: "Admin", accessor: "admin" }],
  ],
};

export const investorTableData = {
  fields: [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Permissions", accessor: "permissions" },
    // { Header: "Remove User", accessor: "removeUser" },
  ],
  data: [
    ["Jon Doe", "jondoe@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 1", "jondoe1@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 2", "jondoe2@gmail.com", { Header: "Admin", accessor: "admin" }],
    ["Jon Doe 3", "jondoe3@gmail.com", { Header: "Admin", accessor: "admin" }],
  ],
};

export const investorDetailsTableData = {
  fields: [
    {
      Header: "Investor Name",
      accessor: "name",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ],
  data: {
    "2020": [
      ["Jon Doe", 1620432000000, 6500, "jondoe@gmail.com"],
      ["Jon Doe 2", 1620432000000, 3500, "jondoe2@gmail.com"],
      ["Jon Doe 3", 1620432000000, 6500, "jondoe3@gmail.com"],
      ["Jon Doe 4", 1620432000000, 6500, "jondoe4@gmail.com"],
    ],
    "2021": [
      ["Jon Doe", 1620432000000, 6500, "jondoe@gmail.com"],
      ["Jon Doe 2", 1620432000000, 3500, "jondoe2@gmail.com"],
      ["Jon Doe 3", 1620432000000, 6500, "jondoe3@gmail.com"],
      ["Jon Doe 4", 1620432000000, 6500, "jondoe4@gmail.com"],
    ],
  },
};

export const employeeTableOptions = {
  department: [
    {
      Header: "HR",
      accessor: "hr",
    },
    {
      Header: "Sales",
      accessor: "sales",
    },
    {
      Header: "Finance",
      accessor: "finance",
    },
  ],
  roleType: [
    {
      Header: "Full-time Employee",
      accessor: "fte",
    },
    {
      Header: "Part-Time Employee",
      accessor: "pte",
    },
    {
      Header: "Intern",
      accessor: "intern",
    },
  ],
};

export const teamTableOptions = {
  roleType: [
    { Header: "Admin", accessor: "admin" },
    { Header: "View", accessor: "view" },
    { Header: "Edit", accessor: "edit" },
  ],
};
