import React, { useState } from "react";
import { Button } from "@material-ui/core";
import SnackBar from "../snack-bar/SnackBar";
import { supabase } from "../../supabaseClient";

const DeletePost = (props) => {
  const { userId, fetchPosts } = props;
  const [responseStatus, setResponseStatus] = useState([false]);

  async function deletePost(id) {
    await supabase.from("posts").delete().eq("id", id);
    setResponseStatus([true, "success", "Deleted User"]);
    fetchPosts();
  }
  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseStatus([false]);
  };
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deletePost(userId)}
      >
        Delete
      </Button>
      <SnackBar responseStatus={responseStatus} handleClose={alertClose} />
    </>
  );
};
export default DeletePost;
