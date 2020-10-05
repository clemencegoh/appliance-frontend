import React from "react";
import { createStyles, makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "core/services/snackbarService";

export default function EnhancedSnackbar() {
  const classes = useStyles();
  const [snackbar, closeSnackbar] = useSnackbar();
  if (!snackbar) {
    return null;
  }
  const {
    message,
    autoHideDuration,
    anchorOrigin,
    severity,
    ...config
  } = snackbar;
  function handleClose(_, reason?: string) {
    if (reason !== "clickaway") {
      closeSnackbar();
    }
  }
  return (
    <Snackbar
      className={classes.root}
      key={`${anchorOrigin?.vertical}, ${anchorOrigin?.horizontal}`}
      open={Boolean(message)}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      {...config}
    >
      <Alert
        severity={severity}
        onClose={
          autoHideDuration && autoHideDuration > 0 ? undefined : handleClose
        }
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiSnackbarContent-root": {
        display: "flex",
        flexWrap: "nowrap",
      },
      maxWidth: 600,
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);
