import { FC } from "react";
import { useGeneralStyles } from "./general-styles";
import Typography from "./Typography_Custom";

const ErrorText: FC<{ small?: boolean }> = ({ small = false, children }) => {
  const classes = useGeneralStyles();

  return (
    <Typography
      variant={small ? "overline" : "body2"}
      color="error"
      className={classes.input_overline}
      weight={400}
    >
      {children}
    </Typography>
  );
};

export default ErrorText;
