import classes from "*.module.css";
import {
  useTheme,
  makeStyles,
  Theme,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  withStyles,
  Tooltip,
  capitalize,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import InvestorTable from "../../../TableComponents/InvestorTable";
import {
  investorDetailsTableData,
  investorTableData,
} from "../../../../RevenueData";
import InvestorDetailsTable from "../../../TableComponents/InvestorDetailsTable";
import { fetchCollection, updateCollection } from "../../../fetch";
import { globalContext } from "../../../../AppContext";

const useStyles = makeStyles((theme: Theme) => {
  return {
    mainConatiner: {
      width: "100%",
      backgroundColor: "white",
      padding: "32px",
      [theme.breakpoints.down("sm")]: {
        padding: "0px",
      },
      marginTop: "32px",
      borderRadius: "20px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05);",
    },
    selectComponent: {
      width: "100%",
    },
    inputLabel: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    inputValue: {
      width: "100%",
    },
    heading: {
      marginBottom: "24px",
      marginTop: "32px",
    },
    inputContainer: {
      marginBottom: "15px",
    },
    tableContainer: {
      display: "flex",
      padding: "32px",
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
      alignItems: "center",
      justifyContent: "center",
      overflowX: "auto",
      "& div": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
    },
  };
});

interface OptionInterface {
  Header: string;
  accessor: string;
}

interface StartupInfoInterface {
  startup_name: string;
  email_id: string;
  sectors: string;
  startupDescription: string;
  date_format: string;
  number_format: string;
  first_month_of_financial_year: string;
  first_month_of_tax_year: string;
  accounting_method: string;
  company_type: string;
  time_zone: string;
  currency: string[];
}

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const ProfileSettings = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const [saveChangeBtn, setSaveChangeBtn] = React.useState(false);
  // const [userInfo, setUserInfo] = useState<UserInfoInterface>({
  //   name: "",
  //   email: "",
  //   startupName: "",
  //   businessModel: { Header: "", accessor: "" },
  //   startupStage: { Header: "", accessor: "" },
  //   sector: { Header: "", accessor: "" },
  //   tech: { Header: "", accessor: "" },
  //   startupDescription: "",
  // });
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#0066EB",
      },
      "& .MuiOutlinedInput-root": {
        width: "100%",
        "& fieldset": {
          borderColor: "#B8B8B8",
        },
        "&:hover fieldset": {
          borderColor: "#0066EB",
        },
        // "&.Mui-focused fieldset": {
        //   borderColor: "green",
        // },
      },
    },
  })(TextField);
  const [startupInfo, setStartupInfo] = React.useState<StartupInfoInterface>({
    startup_name: "",
    email_id: "",
    sectors: "",
    startupDescription: "",
    date_format: "",
    number_format: "",
    first_month_of_financial_year: "",
    first_month_of_tax_year: "",
    accounting_method: "",
    company_type: "",
    time_zone: "",
    currency: [],
  });

  useEffect(() => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "startup",
      undefined,
      props.selectedStartup.accessor
    ).then((res) => {
      setStartupInfo(res.data[0]);
    });
  }, []);

  const monthsArray = [
    "janurary",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const renderMonthOptions = () => {
    return monthsArray.map((month) => {
      return <option value={month}>{capitalize(month)}</option>;
    });
  };

  const renderTaxMonthOptions = () => {
    let arr: any[] = [];
    arr.push(
      <option value={"Same as financial year"}>
        {"Same as financial year"}
      </option>
    );
    let options = monthsArray.map((month) => {
      return <option value={month}>{capitalize(month)}</option>;
    });
    return [arr, options];
  };

  return (
    <div className={classes.mainConatiner}>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.heading}>
          Basic Info
        </Typography>
        {startupInfo !== null ? (
          <div>
            <div className={classes.inputContainer}>
              <Typography className={classes.inputLabel}>Email</Typography>
              <CssTextField
                variant="outlined"
                placeholder="Enter Email"
                className={classes.inputValue}
                value={startupInfo?.email_id}
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.inputLabel}>
                Startup Name
              </Typography>
              <CssTextField
                variant="outlined"
                placeholder="Enter Startup Name"
                className={classes.inputValue}
                value={startupInfo?.startup_name}
                // onChange={(e) => {
                //   setStartupInfo({
                //     ...startupInfo,
                //     startup_name: e.target.value,
                //   });
                // }}
              />
            </div>

            <div className={classes.inputContainer}>
              <Typography className={classes.inputLabel}>Sectors</Typography>
              <CssTextField
                variant="outlined"
                placeholder="Sectors"
                className={classes.inputValue}
                value={startupInfo?.sectors}
                // onChange={(e) => {
                //   setStartupInfo({
                //     ...startupInfo,
                //     sectors: e.target.value,
                //   });
                // }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* <div className={classes.inputContainer}>
       <Typography className={classes.inputLabel}>Sectors</Typography>
        <CssTextField variant="outlined" className={classes.inputValue} />
       </div>

       <div className={classes.inputContainer}>
       <Typography className={classes.inputLabel}>Sectors</Typography>
        <CssTextField variant="outlined" className={classes.inputValue} />
       </div> */}

        <Typography variant="h3" className={classes.heading}>
          Advance Info
        </Typography>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Date Format</Typography>
          <Select
            native
            className={classes.inputValue}
            variant="outlined"
            value={startupInfo?.date_format}
            onChange={(e) => {
              if (typeof e.target.value === "string")
                setStartupInfo({
                  ...startupInfo,
                  date_format: e.target.value,
                });
              setSaveChangeBtn(true);
            }}
          >
            <option value={"dd-mm-yy"}>{"dd-mm-yy"}</option>
          </Select>
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Number Format</Typography>
          <Select
            native
            variant="outlined"
            placeholder="Number Format"
            className={classes.inputValue}
            value={startupInfo?.number_format}
            onChange={(e) => {
              if (typeof e.target.value === "string")
                setStartupInfo({
                  ...startupInfo,
                  number_format: e.target.value,
                });
              setSaveChangeBtn(true);
            }}
          >
            <option value={"1,23,456.00"}>{"1,23,456.00"}</option>
          </Select>
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>
            First month of financial year
          </Typography>
          <Select
            native
            variant="outlined"
            placeholder="Enter first month of financial year"
            className={classes.inputValue}
            value={startupInfo?.first_month_of_financial_year}
            onChange={(e) => {
              if (typeof e.target.value === "string")
                setStartupInfo({
                  ...startupInfo,
                  first_month_of_financial_year: e.target.value,
                });
              setSaveChangeBtn(true);
            }}
          >
            {renderMonthOptions()}
          </Select>
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>
            First month of tax year
          </Typography>
          <Select
            native
            variant="outlined"
            placeholder="Enter first month of tax year"
            value={startupInfo?.first_month_of_tax_year}
            className={classes.inputValue}
            onChange={(e) => {
              if (typeof e.target.value === "string")
                setStartupInfo({
                  ...startupInfo,
                  first_month_of_tax_year: e.target.value,
                });
              setSaveChangeBtn(true);
            }}
          >
            {renderTaxMonthOptions()}
          </Select>
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>
            Accounting method
          </Typography>
          <Select
            native
            variant="outlined"
            placeholder="Enter Accounting method"
            className={classes.inputValue}
            value={startupInfo?.accounting_method}
            onChange={(e) => {
              if (typeof e.target.value === "string")
                setStartupInfo({
                  ...startupInfo,
                  accounting_method: e.target.value,
                });
              setSaveChangeBtn(true);
            }}
          >
            <option value="Cash">Cash</option>
            <option value="Accrual">Accrual</option>
          </Select>
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Company Type</Typography>
          <CssTextField
            variant="outlined"
            placeholder="Enter Company Type"
            className={classes.inputValue}
            value={startupInfo?.company_type}
          />
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Time Zone</Typography>
          <CssTextField
            variant="outlined"
            placeholder="Enter time Zone"
            className={classes.inputValue}
            value={startupInfo?.time_zone}
          />
        </div>

        <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Currency</Typography>
          <Select
            // native
            variant="outlined"
            placeholder="Enter Currency"
            className={classes.inputValue}
            value={startupInfo?.currency}
            multiple
            onChange={(e) => {
              if (Array.isArray(e.target.value))
                setStartupInfo({
                  ...startupInfo,
                  currency: e.target.value,
                });
            }}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </Select>
        </div>
        {saveChangeBtn ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateCollection(
                appContext?.apiRoute,
                appContext?.token,
                "startup",
                [startupInfo],
                props.selectedStartup.accessor
              )
                .then((res) => {
                  setSaveChangeBtn(false);
                })
                .catch((err) => {
                  console.log(err);
                  setSaveChangeBtn(false);
                });
            }}
          >
            Save Changes
          </Button>
        ) : (
          <div></div>
        )}
      </Container>
      {/* <div className={classes.tableContainer}>
        <div>
          <Typography variant="h3" className={classes.heading}>
            Investors Details Table
          </Typography>
          <InvestorDetailsTable
            data={investorDetailsTableData}
            changeHandler={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileSettings;
