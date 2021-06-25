import React, { forwardRef, ReactNode } from "react";
import Classes from "./index.module.css";

import Cell, { CellStruct } from "../Cell";

// =========================== INTERFACES ===========================================

export interface TableColumn {
  Header: string | ReactNode;
  accessor: string;
  customStyle?: React.CSSProperties;
  width?: Number;
  hasLinks?: boolean;
  enforcePseudoHeader?: boolean;
}

interface Props {
  columnConfig: TableColumn;
  data: Array<CellStruct>;
}

// ============================ COMPONENT =============================================

function Column({ columnConfig, data }: Props, ref?: any) {
  return (
    <div
      ref={ref}
      style={{
        minWidth: columnConfig.width + "rem",
        // ...(draggableProps && draggableProps.style),
      }}
    >
      <div className={Classes.head} style={columnConfig.customStyle}>
        {columnConfig.Header}
      </div>
      {data.map((el, i) => (
        <Cell
          key={i}
          cell={{
            ...el,
            enforcePseudoHeader: columnConfig.enforcePseudoHeader,
          }}
          isLink={!!columnConfig.hasLinks}
          className={Classes.cell}
          style={columnConfig.customStyle}
        />
      ))}
    </div>
  );
}

export default forwardRef(Column);
