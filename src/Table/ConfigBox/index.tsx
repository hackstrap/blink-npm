import React, { useState, useRef, useEffect } from "react";
import Classes from "./index.module.css";
import CheckBox from "../Checkbox";
import { TableColumn } from "../Column";

// SVG imports
import { ReactComponent as Add } from "../../../../../images/GreyButton.svg";

// =================================== INTERFACE =====================================

export interface Option {
  column: TableColumn;
  checked: boolean;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ConfigBoxConfig {
  options: Array<Option>;
}

// =================================== HELPERS =========================================

const getBox = (options: Array<Option>) =>
  options.map((option, i) => (
    <div className={Classes.option} key={i}>
      <div className={Classes.checkbox}>
        <CheckBox defaultChecked={option.checked} onClick={option.onClick} />
      </div>
      <div className={Classes.tag}>{option.column.Header}</div>
    </div>
  ));

// ==================================== COMPONENT =======================================

function ConfigBox({ options }: ConfigBoxConfig) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return function () {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (event: MouseEvent) => {
    if (optionsRef.current?.contains(event.target as Node)) return;
    else setDisplay(false);
  };

  return (
    <div className={Classes.configBox}>
      <div className={Classes.add} onClick={() => setDisplay(!display)}>
        <Add />
      </div>
      {display ? (
        <div className={Classes.options} ref={optionsRef}>
          {getBox(options)}
        </div>
      ) : null}
    </div>
  );
}

export default ConfigBox;
