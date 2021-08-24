import { Bars } from "@agney/react-loading";
import { Typography } from "@material-ui/core";
import React from "react";
interface PropsInterface {
  msg?: string;
}

const NoData = (props: PropsInterface) => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
      }}
    >
      <div>
        <div style={{ width: "20px", margin: "auto", color: "#808080" }}>
          <Bars />
        </div>
        {props?.msg ? (
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              color: "#808080",
            }}
          >
            {props?.msg}
          </Typography>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NoData;
