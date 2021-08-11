import React, { useRef, ReactNode, useState, useEffect } from "react";
import classes from "./index.module.css";

// =========================== INTERFACES ===========================================

export interface CellStruct {
  Header: string | ReactNode;
  // Shall be used only if Header is a react node, in that case this can be used to in place of Header
  pseudoHeader?: string;
  accessor: string;
  column: string;
  enforcePseudoHeader?: boolean;
}

interface Props {
  cell: CellStruct;
  isLink?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// =========================== HELPER FUNCTIONS =====================================

function isHTML(data: any) {
  return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(data);
}

function extractTextFromHTMLString(data: any) {
  const fdiv = document.createElement("div");
  fdiv.innerHTML = data;

  return fdiv.innerText;
}

function formatData(data: any) {
  switch (true) {
    case React.isValidElement(data):
      return data;
    case data === "undefined":
      return "NA";
    case typeof data === "string":
      return data.trim();
    case typeof data === "object":
      // Check for array
      if (Array.isArray(data)) return data.join(", ").trim();
      // Check for null
      else if (data === null) return data;
      // Check for objects
      else throw new Error("Objects are not allowed as cell values");
    default:
      throw new Error("Unsupported data type");
  }
}

function trimString(data: any, trimAt = 7, enforcePseudoHeader = false): any {
  const eps = "...";
  if (typeof data === "string") {
    const dataArr = data.split(" ");
    if (dataArr.length > trimAt) {
      return {
        str: dataArr.slice(0, trimAt + 1).join(" ") + eps,
        trimmed: true,
      };
    }

    return { str: dataArr.join(" "), trimmed: false };
  }

  if (enforcePseudoHeader && React.isValidElement(data)) {
    return trimString((data.props as any)["data-header"]);
  }

  return { str: data, trimmed: false };
}

function extractString(data: any): any {
  if (isHTML(data)) return extractTextFromHTMLString(data);
  if (React.isValidElement(data))
    return extractString((data.props as any)["data-header"]);
  if (typeof data === "string") return data;

  return "";
}

function ShowTrimmed({ data = "", trimAt = 7, enforcePseudoHeader = false }) {
  const trimmedData = trimString(
    extractString(data),
    trimAt,
    enforcePseudoHeader
  );

  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = (ev: MouseEvent) => {
    if (!ref.current?.contains(ev.target as HTMLDivElement)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  if (enforcePseudoHeader && trimmedData.trimmed)
    return (
      <div ref={ref}>
        <div onClick={() => setShow(true)}>{trimmedData.str}</div>
        {show && <div className={classes.popup}>{extractString(data)}</div>}
      </div>
    );

  if (enforcePseudoHeader && !trimmedData.trimmed)
    return <div ref={ref}>{trimmedData.str}</div>;

  return <div ref={ref}>{data}</div>;
}

// ============================ COMPONENT =============================================
function Cell({ cell, isLink, className, style }: Props) {
  const cellRef = useRef<HTMLDivElement>(null);
  const data = formatData(cell.Header);
  const trimmedData = trimString(data, 7, cell.enforcePseudoHeader);

  return (
    <div
      // title={React.isValidElement(data) ? cell.pseudoHeader : data}
      className={className}
      ref={cellRef}
      style={style}
    >
      {isLink ? (
        <a href={trimmedData.str} target="__blank">
          {trimmedData.str}
        </a>
      ) : (
        <ShowTrimmed
          data={data}
          trimAt={7}
          enforcePseudoHeader={cell.enforcePseudoHeader}
        />
      )}
    </div>
  );
}

export default Cell;
