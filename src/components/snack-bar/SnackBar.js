import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function SnackBar(props) {
  const { responseStatus, handleClose } = props;

  return (
    <Snackbar
      open={Boolean(responseStatus[0])}
      autoHideDuration={1000}
      onClose={props.handleClose}
    >
      <Alert
        severity={responseStatus[1]}
        onClose={handleClose}
        elevation={6}
        variant="filled"
      >
        {responseStatus[2]}
      </Alert>
    </Snackbar>
  );
}
SnackBar.propTypes = {
  handleClose: PropTypes.func,
  responseStatus: PropTypes.array,
};
