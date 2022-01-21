import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function SnackBar(props) {
  const { responseStatus, handleClose } = props;
  console.log(responseStatus);

  return (
    <Snackbar
      open={Boolean(responseStatus[0])}
      autoHideDuration={6000}
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
