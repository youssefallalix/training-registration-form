import clsx from "clsx";
import TextField from "@mui/material/TextField";
import { makeStyles } from '/styles@material-ui/styles';

const useInputStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1.5)
  }
}));

export const InputWrapper = ({ error, className, ...rest }) => {
  const classes = useInputStyles();
  return (
    <TextField
      fullWidth
      className={clsx(className, classes.input)}
      error={!!error}
      helperText={error}
      FormHelperTextProps={{ error: !!error }}
      {...rest}
    />
  );
};
