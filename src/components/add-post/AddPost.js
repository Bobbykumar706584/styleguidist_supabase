import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Select from "react-select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid } from "@material-ui/core";
import SnackBar from "../snack-bar/SnackBar";

import { supabase } from "../../supabaseClient";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "25%",
    left: "30%",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeBox: {
    textAlign: "center",
  },
  closeButton: {
    color: "red",
    fontSize: "26px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    fontSize: "30px",
    borderBottom: "2px solid",
    padding: "10px",
  },
  buttonBox: {
    marginTop: "10px",
  },
  buttonCreate: {
    marginLeft: "20px",
  },
  textAreaSize: {
    minWidth: "100%",
  },
}));

const AddPost = (props) => {
  const classes = useStyles();
  const { showModal, handleClose } = props;
  const [responseStatus, setResponseStatus] = useState([false]);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState(null);
  const [post, setPost] = useState({
    user_id: "",
    title: "",
    body: "",
    username: "",
  });
  const { title, body } = post;

  useEffect(() => {
    userdropdown();
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data } = await supabase.from("posts").select();
    data.sort((a, b) => a.id - b.id);
    setPost(data);
  }

  async function createComment() {
    await supabase
      .from("posts")
      .insert([{ user_id: username, title, body }])
      .single();
    setPost({ user_id: "", title: "", body: "" });
    fetchPosts();
    setResponseStatus([true, "success", "Success message"]);
    handleClose();
  }
  async function userdropdown() {
    const { data } = await supabase.from("users").select();
    const arr = [];
    data.map((item) => {
      const obj = {
        value: item.id,
        label: item.username,
      };
      arr.push(obj);
    });
    setUsers(arr);
  }

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseStatus([false]);
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={classes.paper} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <h3 className={classes.title}>Create Post</h3>
            </Grid>
            <Grid item xs={1} className={classes.closeBox}>
              <span className={classes.closeButton} onClick={handleClose}>
                x
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                label="Title"
                type="text"
                variant="outlined"
                value={title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                options={users}
                defaultValue={username}
                onChange={(a) => setUsername(a.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="body"
                minRows={8}
                placeholder="Body"
                value={body}
                className={classes.textAreaSize}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.buttonBox}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className={classes.buttonCreate}
                variant="contained"
                color="primary"
                onClick={createComment}
              >
                Create Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
      <SnackBar responseStatus={responseStatus} handleClose={alertClose} />
    </>
  );
};

export default AddPost;
