import { fade, makeStyles } from "@material-ui/core";

export const useSelectFieldStyles = makeStyles((theme) => ({
  label_div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0.3rem",
  },
  label: {
    fontWeight: theme.typography.fontWeightSemiBold,
  },
  input_overline: {
    lineHeight: "1",
    marginBottom: "0.5rem",
  },
  select_field: {
    display: "block",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: theme.typography.body2.fontSize,
    "&.placeholder_shown": {
      "& .MuiSelect-root": {
        color: theme.palette.grey[400],
      },
    },
    "& .MuiSelect-root": {
      boxSizing: "border-box",
      padding: 8,
      paddingLeft: 15,
      paddingRight: 32,
    },
    "&.select-multiple": {
      "& .MuiSelect-root": {
        padding: "0.5em 1em",
      },
    },
    "&.select-multiple-empty": {
      "& .MuiSelect-root": {
        padding: "1.75em 1em",
      },
    },
    // normal state
    "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
      {
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 1,
        borderColor: fade(theme.palette.primary.main, 1),
        boxShadow: `0 0 2px 3px ${theme.palette.secondary.main}`,
      },
    },
    // disabled state
    "&:disabled, &:disabled:hover": {
      backgroundColor: theme.palette.grey[100],
    },
    // error state
    "&.error, &.error:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: fade(theme.palette.error.main, 1),
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          boxShadow: `0 0 2px 3px ${theme.palette.error.main}40`,
        },
      },
    },
    // valid state
    "&.valid, &.valid:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: fade(theme.palette.success.main, 1),
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          boxShadow: `0 0 2px 3px ${theme.palette.success.main}40`,
        },
      },
    },
  },
  select_menu: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.background.default,
      maxHeight: "35vh",
      padding: "1rem 0",
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    "& .MuiMenuItem-root": {
      fontSize: theme.typography.body2.fontSize,
    },
  },
  select_chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  select_chip: {
    margin: "2px",
    fontSize: theme.typography.body2.fontSize,
  },
  select_chip_icon: {
    color: theme.palette.primary.light,
  },
  select_icon: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: "translatey(-50%)",
    width: 12,
    color: theme.palette.grey[400],
    transformOrigin: "center",
    "&.open": {
      transform: "translatey(-50%) rotate(180deg)",
    },
  },
}));
