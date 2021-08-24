import { Bars } from "@agney/react-loading";
import { Typography } from "@material-ui/core";
import React from "react";

const AnalyticsIsBuilding = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div>
        <div style={{ maxWidth: "50px", margin: "auto", color: "#808080" }}>
          <Bars />
        </div>
        <Typography
          variant="subtitle2"
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#808080",
          }}
        >
          Data will be visible when Startup updates it.
        </Typography>
      </div>
    </div>
  );
};

export default AnalyticsIsBuilding;
