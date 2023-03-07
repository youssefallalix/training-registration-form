import * as yup from "yup";

export // validation schema for formik to handle errors by field
const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("Email Address is required"),
  telephoneNumber: yup
    .number()
    .typeError("Not a valid Phone Number")
    .required("NPI Number is required"),
  selectedSession: yup
    .number()
    .typeError("Not a valid Phone Number")
    .required("NPI Number is required")
});

// just so the alert will print nicely
export const printNiceAlert = (form) => {
  let resultString = "";
  for (const [key, value] of Object.entries(form)) {
    resultString += `${key}: ${value}\n`;
  }
  return resultString;
};
