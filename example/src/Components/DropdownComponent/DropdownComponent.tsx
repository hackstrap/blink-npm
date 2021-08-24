import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
interface PropsInterface {
  options: { Header: string; accessor: string }[];
  changeHandler: (value: { Header: string; accessor: string } | null) => void;
  defaultValue?: { Header: string; accessor: string } | null;
}

const DropdownComponent = (props: PropsInterface) => {
  const [value, setvalue] =
    useState<{ Header: string; accessor: string } | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    if (props.defaultValue) setvalue(props.defaultValue);
  }, []);

  useEffect(() => {
    if (value) props.changeHandler(value);
  }, [value]);

  const renderOptions = (options: { Header: string; accessor: string }[]) => {
    return options.map((option, i) => {
      return (
        <div
          className={styles.option}
          onClick={(e) => {
            setvalue(option);
            setShowOptions(false);
          }}
          key={i}
        >
          <div>{option.Header}</div>
        </div>
      );
    });
  };
  return (
    <div
      className={styles.dropdownContainer}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div
        className={styles.valueBox}
        onClick={() => setShowOptions(!showOptions)}
      >
        {value ? value.Header : "Choose"}
      </div>
      {showOptions ? (
        <div className={styles.optionsContainer}>
          {renderOptions(props.options)}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DropdownComponent;
