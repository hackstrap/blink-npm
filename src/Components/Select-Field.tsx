import { Chip, Fade, MenuItem, Select, SvgIcon } from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";
import {
  Field,
  FieldInputProps,
  FieldMetaProps,
  useFormikContext,
} from "formik";
import { FC, useState } from "react";
import { useSelectFieldStyles } from "./select-field-styles";
import { SelectField_Interface } from "./interfaces";
import ErrorText from "./ErrorText";
import Typography from "./Typography_Custom";

const SelectIcon: FC<{ open: boolean }> = ({ open }) => {
  const classes = useSelectFieldStyles();

  return (
    <SvgIcon
      viewBox="0 0 21.246 11.684"
      className={`${classes.select_icon} ${open && "open"}`}
    >
      <path
        d="M-1121.95,1233.2l9.563,9.563,9.562-9.562"
        transform="translate(1123.011 -1232.139)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
};

interface SelectFieldInterface {
  label: string;
  name: string;
  placeholder?: string;
  infoText?: string;
  disabled?: boolean;
  required?: boolean;
  options: string[];
  multiple?: boolean;
  value: string | string[];
  setValue: Function;
}

const SelectField: FC<SelectFieldInterface> = (props) => {
  const classes = useSelectFieldStyles();
  // const formCtx = useFormikContext();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={classes.label_div}>
        <label htmlFor={props.name}>
          <Typography
            variant="subtitle2"
            component="p"
            gutterBottom
            weight={600}
          >
            {props.label}
            {props.required && (
              <Typography variant="inherit" component="sup" color="error">
                *
              </Typography>
            )}
          </Typography>
        </label>
      </div>
      {props.infoText && (
        <Typography
          variant="body2"
          component="p"
          gutterBottom
          className={classes.input_overline}
        >
          {props.infoText}
        </Typography>
      )}

      <Select
        displayEmpty
        multiple={props.multiple}
        value={props?.value}
        variant="outlined"
        className={`${classes.select_field} ${
          props.multiple && props.value.length !== 0 ? "select-multiple" : ""
        }`}
        MenuProps={{
          className: classes.select_menu,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
          marginThreshold: 0,
          transitionDuration: 300,
          TransitionComponent: Fade,
        }}
        inputProps={{ placeholder: props.placeholder }}
        IconComponent={SelectIcon.bind(this, { open })}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e) => {
          props.setValue(e?.target?.value);
        }}
        renderValue={(selected) =>
          props.multiple ? (
            <>
              {(selected as string[]).length === 0 ? (
                props.placeholder
              ) : (
                <div className={classes.select_chips}>
                  {(selected as string[]).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      className={classes.select_chip}
                      color="secondary"
                      deleteIcon={
                        <CancelRounded
                          className={classes.select_chip_icon}
                          onMouseDown={(e) => e.stopPropagation()}
                        />
                      }
                      onDelete={(e) => {
                        if (Array.isArray(props?.value)) {
                          let newData = props?.value?.filter((val) => {
                            return val !== value ? true : false;
                          });
                          props.setValue(newData);
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>{(selected as string) === "" ? props.placeholder : selected}</>
          )
        }
      >
        <MenuItem disabled value=""></MenuItem>
        {props.options.map(
          (option, i) =>
            option !== "" && (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            )
        )}
      </Select>
    </div>
  );
};

export default SelectField;
