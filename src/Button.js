import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  container: {
    position: "relative"
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px"
  }
});

export const Button = ({
  children,
  loading,
  className,
  whiteButton,
  ...props
}) => {
  const classes = useStyles();
  return (
    <MaterialButton
      className={clsx(classes.container, className, {
        [classes.whiteButton]: whiteButton
      })}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={24} className={classes.loading} />}
    </MaterialButton>
  );
};
