import React, { useState } from "react";
import { Button } from "@material-ui/core";
import SnackBar from "../snack-bar/SnackBar";
import { supabase } from "../../supabaseClient";

const DeleteUser = (props) => {
  const { handleClose, userId, handleDelete } = props;
  const [responseStatus, setResponseStatus] = useState([false]);

  async function deleteUser(id) {
    await supabase.from("users").delete().eq("id", id);
    setResponseStatus([true, "success", "Deleted User"]);
    handleDelete();
    handleClose();
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteUser(userId)}
      >
        Delete
      </Button>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    </>
  );
};

export default DeleteUser;
