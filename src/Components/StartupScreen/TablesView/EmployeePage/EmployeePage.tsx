import React, { useState } from 'react'
import OpexExpensesTable from '../../../TableComponents/OpexExpensesTable'
import { OptionInterface } from '../../../interfaces'
import { fetchCollection, updateCollection } from '../../../fetch'
// import {
//   convertToFrontendSchema,
//   convertToBackendSchema,
// } from "../RevenuePage/RevenuePage";
import EmployeeTable from '../../../TableComponents/EmployeeTable'

interface PropsInterface {
  selectedStartup: OptionInterface
}

export interface TableDataInterface {
  currency?: string
  fields: OptionInterface[]
  data: (string | number)[][]
}

export const convertToFrontendSchema = (
  data: object[],
  fields: OptionInterface[]
) => {
  const convertedData: any = {
    fields: [...fields],
    data: [],
    currency: 'INR'
  }
  if (data.length == 0) {
    console.log('no data')
    return convertedData
  } else {
    convertedData.data = data.map((document: any) => {
      let arr: (string | number)[] = []
      fields.forEach((field, i) => {
        console.log(document, field)
        if (document[field.accessor]) {
          arr.push(document[field.accessor])
        } else {
          arr.push(0)
        }
      })
      arr.push(document._id)
      return arr
    })
    return convertedData
  }
}

export const convertToBackendSchema = (
  data: TableDataInterface,
  fields: OptionInterface[],
  startupId: string
) => {
  // fields should be strictly according to sequence of table rows
  let serverData = data.data.map((rowData, rowIndex) => {
    let obj: object = {}
    data.fields.forEach((field, i) => {
      if (i !== 0) {
        // because we want to ignore 1st field
        obj = {
          ...obj,
          [field.accessor]: rowData[i]
        }
      }
    })
    // Adding the id
    if (rowData[fields.length]) {
      obj = {
        ...obj,
        // as ID will be the last one in array
        _id: rowData[fields.length]
      }
    } else {
      obj = {
        ...obj,
        startup_id: startupId
      }
    }

    return obj
  })
  return serverData
}

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
    Header: 'Name',
    accessor: 'employee_name'
  },
  {
    Header: 'Department',
    accessor: 'department'
  },
  {
    Header: 'Role Type',
    accessor: 'role_type'
  },
  {
    Header: 'Role Name',
    accessor: 'role_name'
  },
  {
    Header: 'CXO',
    accessor: 'cxo'
  },
  {
    Header: 'Annual Salary',
    accessor: 'annual_salary'
  },
  {
    Header: 'Start Date',
    accessor: 'start_date'
  },
  {
    Header: 'End Date',
    accessor: 'end_data'
  }
  // {
  //   Header: "id",
  //   accessor: "_id",
  // },
]

const EmployeePage = (props: PropsInterface) => {
  const [employeeTableData, setEmployeeTableData] =
    useState<TableDataInterface | null>(null)
  // const [currentYearEmployeeTable, setCurrentYearEmployeeTable] =
  //   useState<string>(new Date().getFullYear().toString());

  const getData = () => {
    fetchCollection('employee', undefined, props.selectedStartup.accessor)
      .then((res) => {
        const frontendData = convertToFrontendSchema(
          res.data,
          employeeTableFields
        )
        console.log(frontendData)
        setEmployeeTableData(frontendData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    getData()
  }, [])
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
      {employeeTableData ? (
        <div>
          <EmployeeTable
            data={employeeTableData}
            changeHandler={(value: TableDataInterface) => {
              const serverData = convertToBackendSchema(
                value,
                employeeTableFields,
                props.selectedStartup.accessor
              )
              console.log(serverData)
              updateCollection(
                'employee',
                serverData,
                props.selectedStartup.accessor
              )
                .then((res) => {
                  console.log(res.data)
                  getData()
                })
                .catch((err) => console.log(err))
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
  )
}

export default EmployeePage
