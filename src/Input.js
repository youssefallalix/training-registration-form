import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
