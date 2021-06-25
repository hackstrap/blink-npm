import React, { useState, ReactNode, createRef } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from 'react-beautiful-dnd';
import Column, { TableColumn } from "./Column";
import { CellStruct } from "./Cell";
import CheckBox from "./Checkbox";
import Classes from "./index.module.css";
import ConfigBox from "./ConfigBox";
import ColumnOption from "./ColumnOption";

// =========================== INTERFACES ===========================================

type ColumnData = { [accessor: string]: Array<CellStruct> };

type CheckState = { [accessor: string]: boolean };

type CustomStyleElements = "serials" | "checkbox" | "common" | "configbox";

export interface AsyncConfig {
  isLoading: boolean;
  component: ReactNode;
}

export interface TableUIConfig {
  columns: Array<TableColumn>;
  serials?: boolean;
  checkbox?: boolean;
  customColumnConfig?: Array<TableColumn>;
}

export interface TableConfig {
  config: TableUIConfig;
  data: TableData;
  async?: AsyncConfig;
  className?: string;
}

export type TableData = Array<{ [column: string]: any }>;

const tableContainerRef: any = createRef();
const dotContainer: any = createRef();
const tableWrapper: any = createRef();

// =========================== HELPER FUNCTIONS =====================================

function generateSchema(data: Array<TableColumn>) {
  return data.map((col) => col.accessor);
}

function processText(data: any) {
  const temp = document.createElement("textarea");
  temp.innerHTML = data;
  return temp.innerText;
}

function constructCell(
  obj: { [column: string]: any },
  col: string
): CellStruct {
  if (React.isValidElement(obj[col])) {
    return {
      Header: obj[col],
      pseudoHeader: processText(obj[col].props["data-header"]),
      accessor: processText(obj[col].props["data-accessor"]),
      column: col,
    };
  } else {
    return {
      Header: processText(obj[col]),
      accessor: processText(obj[col]),
      column: col,
    };
  }
}

function processIncomingData(
  data: TableData,
  schema: Array<string>
): ColumnData {
  const column: ColumnData = {};
  for (const obj of data) {
    for (const col of schema) {
      const cell: CellStruct = constructCell(obj, col);
      Array.isArray(column[col])
        ? column[col].push(cell)
        : (column[col] = [cell]);
    }
  }
  return column;
}

function reorder(list: Array<any>, startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function getCustomStyles(type: CustomStyleElements): React.CSSProperties {
  switch (type) {
    case "serials":
      return {
        backgroundColor: "#e6eaed",
        color: "rgb(119, 143, 155)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    case "configbox":
    case "checkbox":
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    case "common":
      return {
        filter: "opacity(0.7)",
      };
    default:
      throw new Error("Invalid element type");
  }
}

function getAnimation() {
  return `
    @keyframes bgcolor {
        0% {
            background-color: #fff;
        }
        50% {
            background-color: #F4F4F4;
        }
        100% {
            background-color: #fff;
        }
    }`;
}

// ============================ COMPONENT =============================================

function Table({ config, data, async, className }: TableConfig) {
  const columnData = processIncomingData(
    data,
    generateSchema([...config.columns, ...(config.customColumnConfig || [])])
  );

  // const [fixedColumns, setFixedColumns] = useState(config.fixedColumns);
  // let fixedColumns = config.columns
  //   .map((obj, i) => {
  //     return i < 2 ? obj : null;
  //   })
  //   .filter((obj) => obj !== null);

  // fixedColumns.filter((obj) => obj !== null);

  // let draggableColumns = config.columns
  //   .map((obj, i) => {
  //     return i > 1 ? obj : null;
  //   })
  //   .filter((obj) => obj !== null);

  // draggableColumns.filter((obj) => obj !== null);

  // console.log(draggableColumns, fixedColumns);

  // Map internal state to columns
  // const [columns, setColumns] = useState(draggableColumns);

  // Store presentational checkbox info
  const [checkState, setCheckState] = useState<CheckState>({});

  // Store configbox checkstates
  const [configboxCheckState, setConfigboxCheckState] = useState<CheckState>(
    {}
  );

  const [scroll, setScroll] = useState<any>(0);

  const renderLoadingComponent = () => {
    if (async && async.component && React.isValidElement(async?.component))
      return async.component;
    else throw new Error("Invalid async component type");
  };

  const getData = (accessor: string) => {
    if (async && async.isLoading) return [];
    else return columnData[accessor] || [];
  };

  const getSerialsData = () => {
    if (async && async.isLoading) return [];
    else
      return data.map((el, i) => {
        return {
          Header: String(i + 1),
          accessor: String(i + 1),
          column: "serials",
        };
      });
  };

  return (
    <div className={[Classes.tableContainer, className].join(" ")}>
      <style children={getAnimation()} />
      <div ref={tableWrapper} className={Classes.tableHeadWrapper}></div>

      <div className={Classes.metadataBlock}>
        <div className={Classes.loader}>
          {async && async.isLoading ? (
            renderLoadingComponent()
          ) : (
            <div className={Classes.table}>
              <div className={Classes.tableDataBlock}>
                {config.columns
                  ? config.columns.map((el, i) => (
                      <Column
                        columnConfig={{
                          ...el,
                        }}
                        data={getData(el.accessor)}
                        key={i}
                      />
                    ))
                  : null}
              </div>
            </div>
          )}
        </div>
        {data.length === 0 && !async?.isLoading && (
          <div className={Classes.noresult}>No Results Found</div>
        )}
      </div>
    </div>
  );
}

export default Table;
