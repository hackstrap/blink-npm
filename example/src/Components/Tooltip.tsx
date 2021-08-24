import { Tooltip } from "@material-ui/core";
import { FC, ReactElement } from "react";
import { useTooltipStyles } from "./tooltip-styles";
import Typography from "./Typography_Custom";

const TooltipComponent: FC<{ open: boolean }> = ({ open, children }) => {
  const classes = useTooltipStyles();

  return (
    <Tooltip
      arrow
      open={open}
      interactive
      classes={{
        tooltip: classes.dropdown_root,
        arrow: classes.dropdown_arrow,
      }}
      title={
        <div className={classes.dropdown_inner_root}>
          <Typography variant="body1" weight={400} color="primary">
            This is a tooltip
          </Typography>
        </div>
      }
    >
      {children as ReactElement}
    </Tooltip>
  );
};

export default TooltipComponent;
