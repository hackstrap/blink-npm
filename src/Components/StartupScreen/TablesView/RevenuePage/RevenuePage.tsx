import React, { useState } from 'react'
import RevenueTable from '../../../TableComponents/RevenueTable'
import { testData, usersTableData } from '../../../../RevenueData'
import { Container } from '@material-ui/core'
import UsersTable from '../../../TableComponents/UsersTable'
import { fetchCollection, postToCollection } from '../../../fetch'

interface TableDataInterface {
  currency?: string
  fields: string[]
  data: YearDataInterface
}

interface YearDataInterface {
  [key: string]: (string | number)[][]
}
const initData = {
  currency: 'INR',
  fields: [
    '',
    'Total Revenue',
    'MRR',
    'Total new MRR',
    'Total Non-Recurring Revenue'
  ],
  data: {
    '2020': [
      ['janurary'],
      ['february'],
      ['march'],
      ['april'],
      ['may'],
      ['june'],
      ['july'],
      ['august'],
      ['september'],
      ['october'],
      ['november'],
      ['december']
    ],
    '2019': [
      ['janurary'],
      ['february'],
      ['march'],
      ['april'],
      ['may'],
      ['june'],
      ['july'],
      ['august'],
      ['september'],
      ['october'],
      ['november'],
      ['december']
    ]
  }
}

const monthsArray = [
  'janurary',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

const RevenuePage = () => {
  const [tableData, setTableData] = useState<TableDataInterface | null>(null)
  const [rawRevenueData, setRawRevenueData] = useState<object[] | null>(null)
  const serverData = {
    currency: 'INR',
    fields: [
      '',
      'Total Revenue',
      'MMR',
      'Total new MMR',
      'Total Non-Recurring Revenue'
    ],
    data: {
      '2020': [['janurary'], ['february'], ['march'], ['april'], ['may']],
      '2019': [['janurary'], ['february'], ['march'], ['april'], ['may']]
    }
  }

  // React.useEffect(() => {
  //   fetchCollection("revenue").then((res) => {
  //     setRawRevenueData(res.data);
  //     console.log(res.data);
  //   });
  //   // let dateObj = new Date();
  //   // postToCollection("revenue", {
  //   //   year: 2020,
  //   //   month: 5,
  //   //   total_mrr: 3100,
  //   //   total_new_mrr: 1100,
  //   //   total_non_recurring_revenue: 2000,
  //   //   startup_name: "startup_1slug",
  //   //   last_updated: dateObj.toISOString(),
  //   //   gross_profit_margin: 0,
  //   //   total_revenue_gr: 0,
  //   //   total_mrr_gr: 0,
  //   // }).then((res) => {
  //   //   console.log(res);
  //   // });
  // }, []);

  // const covertToFrontendSchema = (data: object[], fields: string[]) => {
  //   fields = fields.slice(1);
  //   const convertedData: any = {
  //     fields: ["", ...fields],
  //     data: {
  //       "2020": [],
  //     },
  //   };
  //   convertedData.data["2020"] = data.map((monthData: any) => {
  //     let arr = fields.map((field, i) => {
  //       if (i === 0) return monthsArray[monthData["month"] - 1];
  //       if (monthData[field]) {
  //         return monthData[field];
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return arr;
  //   });
  //   return convertedData;
  // };

  // React.useEffect(() => {
  //   if (rawRevenueData !== null) {
  //     setTableData(
  //       covertToFrontendSchema(rawRevenueData, [
  //         "month",
  //         "total_revenue",
  //         "total_mrr",
  //         "total_new_mrr",
  //         "total_non_recurring_revenue",
  //       ])
  //     );
  //     console.log(
  //       covertToFrontendSchema(rawRevenueData, [
  //         "month",
  //         "total_revenue",
  //         "total_mrr",
  //         "total_new_mrr",
  //         "total_non_recurring_revenue",
  //       ])
  //     );
  //   }
  // }, [rawRevenueData]);
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
      {testData !== null ? (
        <div>
          <RevenueTable
            data={testData}
            changeHandler={(value) => {
              // console.log(value);
              console.log(value)
              // setTableData(value);
            }}
          />
          <UsersTable data={usersTableData} changeHandler={() => {}} />
        </div>
      ) : (
        <div>No Data Avaliable</div>
      )}
    </div>
  )
}

export default RevenuePage
