import React, { useRef } from "react";
import { useFormik } from "formik";

import { makeStyles } from '@material-ui/styles';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import MuiPhoneNumber from "mui-phone-input-ssr";

import { InputWrapper } from "./Input";
import { Button } from "./Button";
import { validationSchema, printNiceAlert } from "./util";

// styling for registration form
const useRegistrationFormStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    perspective: "1000px",
    background: "url(https://i.redd.it/bf1osbvddz6z.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: " no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  innerWrapper: ({ status }) => ({
    width: "450px",
    transition: "transform .8s",
    transformStyle: "preserve-3d",
    transform: status === "complete" ? "rotateY(-180deg)" : null
  }),
  form: {
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d"
  },
  completed: {
    position: "absolute",
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden"
  }
}));

const RegistrationForm = () => {
  // setting ref to the form to get the height/width so the flipped side
  // can have the same height
  const formRef = useRef(null);

  // using formik to handle form handling and submissions
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    errors,
    touched,
    isSubmitting,
    status
  } = useFormik({
    validateOnMount: true,
    validationSchema,
    onSubmit: (values, actions) => {
      // submit form data to server
      // when returning a promise to formiks 'onSubmit', the 'isSubmitting' is automatically updated when promise is resolved
      return new Promise((res) => {
        setTimeout(() => {
          alert(printNiceAlert(values));
          // update status to complete to rotate form
          actions.setStatus("complete");
          res();
        }, 2000);
      });
    },
    // initializing form values as to not switch from uncontrolled to controlled
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      telephoneNumber: "",
      selectedSession: ""
    }
  });

  const classes = useRegistrationFormStyles({ status });

  function handleOnChange(value) {
    this.setState({
      phone: value
    });
  }
  const [alignment, setAlignment] = React.useState('web');

  const handleGroupChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.innerWrapper}>
        {/* back side of the form, status is put here */}
        <Paper className={classes.completed}>
          <Box
            width={formRef.current?.clientWidth}
            height={formRef.current?.clientHeight}
            bgcolor="success.main"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            color="primary.contrastText"
            fontSize="h2.fontSize"
          >
            <CheckCircleIcon fontSize="inherit" />
            <Box mb={1} />
            <Typography variant="h4">Form Submitted</Typography>
          </Box>
        </Paper>

        {/* front side of the form, user fills here */}
        <Paper ref={formRef} elevation={3} className={classes.form}>
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
            >
              <Typography variant="h4" gutterBottom>
                Registration Form
              </Typography>
              <Typography variant="body" gutterBottom>
                Welcome to our training. Please provide your information
              </Typography>

              <InputWrapper
                variant="outlined"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={touched.firstName && errors.firstName}
              />

              <InputWrapper
                variant="outlined"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName && errors.lastName}
              />
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleGroupChange}
                aria-label="Platform"
              >
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>

              <InputWrapper
                variant="outlined"
                name="emailAddress"
                label="Email Address"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailAddress}
                error={touched.emailAddress && errors.emailAddress}
              />
{/* 
              <MuiPhoneNumber
                fullWidth
                variant="outlined"
                defaultCountry={"ma"}
                onChange={handleOnChange}
                name="telephoneNumber"
                label="Telephone Number"
                error={touched.telephoneNumber && errors.telephoneNumber}
              />
*/}
              <Select
                fullWidth
                variant="outlined"
                name="selectedSession"
                label="Select your schedule"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.selectedSession}
                error={touched.selectedSession && errors.selectedSession}
              >
                <MenuItem value={"first_session"}>
                  12, 18 et 19 mars 2023
                </MenuItem>
                <MenuItem value={"second_session"}>
                  26 mars, 1 et 2 avril 2023
                </MenuItem>
                <MenuItem value={"third_session"}>
                  9, 15 et 16 avril 2023
                </MenuItem>
              </Select>
              <Typography variant="body" gutterBottom>
                By submitting this form, you agree to our Terms and conditions
                of use.
              </Typography>

              <Box mt={3}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
