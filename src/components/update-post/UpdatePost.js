import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import SnackBar from "../snack-bar/SnackBar";
import Select from "react-select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Grid } from "@material-ui/core";
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

const UpdatePost = (props) => {
  const classes = useStyles();
  const { post, handleUpdate } = props;
  const [responseStatus, setResponseStatus] = useState([false]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState(null);
  const [id, setId] = useState("");

  const openModal = () => {
    setShowUpdateModal(true);
  };

  useEffect(() => {
    userdropdown();
    if (Object.keys(post).length !== 0) {
      setTitle(post.title);
      setBody(post.body);
      setId(post.id);
    }
  }, [post]);

  async function updatePost() {
    const user_id = userId.value;
    await supabase.from("posts").upsert({ title, body, id, user_id });
    setResponseStatus([true, "success", "Updated Post"]);
    handleUpdate();
    setShowUpdateModal(false);
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
  useEffect(() => {
    if (users !== null) {
      const user = users.find((item) => {
        if (item.value === post.user_id) {
          return true;
        }
      });
      setUserId(user);
    }
  }, [users, post]);
  const handleUserChange = (e) => {
    setUserId(e);
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseStatus([false]);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Edit
      </Button>
      <Modal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={classes.paper} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <h3 className={classes.title}>Update Post</h3>
            </Grid>
            <Grid item xs={1} className={classes.closeBox}>
              <span
                className={classes.closeButton}
                onClick={() => setShowUpdateModal(false)}
              >
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                options={users}
                defaultValue={userId}
                // value={userId}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="body"
                minRows={8}
                placeholder="Body"
                value={body}
                className={classes.textAreaSize}
                onChange={(e) => setBody(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.buttonBox}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button
                className={classes.buttonCreate}
                variant="contained"
                color="primary"
                onClick={updatePost}
              >
                Update Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
      <SnackBar responseStatus={responseStatus} handleClose={alertClose} />
    </>
  );
};
export default UpdatePost;
