import React, { useContext, useState } from "react";
import RevenueTable from "../../TableComponents/RevenueTable";
import { testData, usersTableData } from "../../../RevenueData";
import { CircularProgress, Container, Typography } from "@material-ui/core";
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
import ProductTable from "../../TableComponents/ProductTable";
import { initializeProductTable } from "./CustomTables/initializeProductTable";

export interface ProductDataInterface {
  _id?: string;
  startup_id: string;
  year: number;
  labels: string[];
  dataset: (string | undefined | number)[][];
}

export interface ProductTableInterface {
  data: ProductDataInterface;
  changeHandler: (data: ProductDataInterface) => void;
  currentYear: string;
  setCurrentYear: Function;
}

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

const ProductPage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const [productTableData, setProductTableData] =
    useState<ProductDataInterface | null>(null);

  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const getProductData = () => {
    fetchCollectionUnity(
      appContext?.apiRoute,
      appContext?.token,
      "product",
      currentYear,
      props.selectedStartup.accessor
    )
      .then((res) => {
        if (res.data.length < 1) {
          let emptyData = initializeProductTable(
            props.selectedStartup.accessor,
            currentYear
          );
          setProductTableData(emptyData);
        } else {
          setProductTableData(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getProductData();
  }, [currentYear]);

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
      {productTableData ? (
        <div>
          <ProductTable
            data={productTableData}
            currentYear={currentYear}
            setCurrentYear={(year: string) => {
              setCurrentYear(year);
            }}
            changeHandler={(data: any) => {
              let currentData = { ...data };
              if (!data.labels?.length) {
                currentData = initializeProductTable(
                  props.selectedStartup.accessor,
                  currentYear
                );
              }
              updateCollection(
                appContext?.apiRoute,
                appContext?.token,
                "product",
                [currentData],
                props.selectedStartup.accessor
              )
                .then((res) => getProductData())
                .catch((err) => console.log(err));
            }}
          />
          <br />
        </div>
      ) : (
        <div>
          <CircularProgress />
          <Typography variant="subtitle1">
            * Please contact Tyke team to enable this table
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
