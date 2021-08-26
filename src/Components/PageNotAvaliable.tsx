import { Container, makeStyles, Typography } from "@material-ui/core";
import { Puff } from "@agney/react-loading";
import React from "react";

const styles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "500px",
    padding: 32,
    borderRadius: 10,
    maxHeight: "500px",
    margin: "auto",
  },
  animation: {
    width: "50px",
    margin: "2.5rem",
  },
  text: {
    textAlign: "center",
  },
});

const PageNotAvaliable = () => {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.animation}>
        <Puff />
      </div>

      <Typography variant="h4" className={classes.text}>
        Data will be visible when Startup updates it.
      </Typography>
    </div>
  );
};

export default PageNotAvaliable;
