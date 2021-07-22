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
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import InvestorTable from "../../TableComponents/InvestorTable";
import {
  investorDetailsTableData,
  investorTableData,
} from "../../../RevenueData";
import InvestorDetailsTable from "../../TableComponents/InvestorDetailsTable";
import { fetchCollection, fetchInvestorInfo } from "../../fetch";
import { globalContext } from "../../../AppContext";

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

interface InvestorInfoInterface {
  investor_id: string;
  investor_email_id: string;
  investor_name: string;
  investor_profile_image: string;
  investor_org: string;
  investor_type: string;
}
interface PropsInterface {
  investorInfo: OptionInterface;
}

const ProfileSettings = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const theme = useTheme();
  const classes = useStyles(theme);
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

  const [investorDetails, setInvestorDetails] =
    React.useState<InvestorInfoInterface>({
      investor_id: "",
      investor_email_id: "",
      investor_name: "",
      investor_profile_image: "",
      investor_org: "",
      investor_type: "",
    });

  React.useEffect(() => {
    fetchInvestorInfo(
      appContext?.apiRoute,
      appContext?.token,
      "investor",
      undefined,
      props.investorInfo.accessor
    )
      .then((res) => {
        console.log(res.data);
        setInvestorDetails(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [props]);
  return (
    <div className={classes.mainConatiner}>
      {investorDetails ? (
        <Container maxWidth="md">
          <Typography variant="h3" className={classes.heading}>
            Basic Info
          </Typography>

          <div className={classes.inputContainer}>
            <Typography className={classes.inputLabel}>Name</Typography>
            <CssTextField
              variant="outlined"
              placeholder="Enter Name"
              className={classes.inputValue}
              value={investorDetails.investor_name}
            />
          </div>

          {/* <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Email</Typography>
          <CssTextField
            variant="outlined"
            placeholder="Enter Email"
            className={classes.inputValue}
          />
        </div> */}

          {/* <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Startup Name</Typography>
          <CssTextField
            variant="outlined"
            placeholder="Enter Startup Name"
            className={classes.inputValue}
          />
        </div> */}

          {/* <div className={classes.inputContainer}>
          <Typography className={classes.inputLabel}>Sectors</Typography>
          <CssTextField
            variant="outlined"
            placeholder="Sectors"
            className={classes.inputValue}
          />
        </div> */}
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProfileSettings;
