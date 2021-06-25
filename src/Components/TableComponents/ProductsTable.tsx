import React, { useState } from 'react'
import Table, { TableConfig, TableUIConfig } from '../../Table'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import styles from '../commonTableStyle.module.css'

const ProductsTable = () => {
  const [currentYear, setCurrentYear] = useState('2020')
  const [showYearConfig, setShowYearConfig] = useState(false)

  return (
    <div className={styles.mainTableContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.tableHeading}>Products</div>

        {/* <div>
          <button
            onClick={(e) => {
              setShowCurrencyConfig(!showCurrencyConfig);
            }}
            className={styles.columnConfigBtn}
          >
            {`Currency: ${state.currency}`}
          </button>
          {showCurrencyConfig ? (
            <div
              className={styles.columnConfigBox}
              onMouseLeave={(e) => setShowCurrencyConfig(false)}
            >
              {renderCurrencyOptions()}
            </div>
          ) : (
            <div></div>
          )}
        </div> */}

        <div>
          <button
            onClick={(e) => {
              setShowYearConfig(!showYearConfig)
            }}
            className={styles.columnConfigBtn}
          >
            {`Year: ${currentYear}`}
          </button>
          {showYearConfig ? (
            <div
              className={styles.columnConfigBox}
              onMouseLeave={(e) => setShowYearConfig(false)}
            >
              {/* {renderYearOptions(Object.keys(state.data))} */}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* <Table /> */}
    </div>
  )
}

export default ProductsTable
