import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField } from "@material-ui/core";
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
}));

const AddUser = (props) => {
  const classes = useStyles();
  const { showModal, handleClose } = props;
  const [responseStatus, setResponseStatus] = useState([false]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const { name, username, email, phone, website } = user;
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers() {
    const { data } = await supabase.from("users").select();
    data.sort((a, b) => a.id - b.id);
    setUsers(data);
  }
  const validForm = () => {
    if (name === "") {
      setNameError("Enter Name");
      return false;
    }
    if (username === "") {
      setUsernameError("Enter Username");
      return false;
    }
    if (email === "") {
      setEmailError("Enter Email");
      return false;
    }
    if (phone === "") {
      setPhoneError("Enter Phone No");
      return false;
    }
    if (website === "") {
      setWebsiteError("Enter Website");
      return false;
    }

    return true;
  };

  async function createUser() {
    if (!validForm()) {
      return false;
    }

    await supabase
      .from("users")
      .insert([{ name, username, email, phone, website }])
      .single();
    setUser({ name: "", username: "", email: "", phone: "", website: "" });
    fetchUsers();
    setResponseStatus([true, "success", "Success message"]);
    handleClose();
    window.location.reload(false);
  }

  return (
    <>
      <Modal
        open={showModal}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={classes.paper} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <h3 className={classes.title}>Create user</h3>
            </Grid>
            <Grid item xs={1} className={classes.closeBox}>
              <span className={classes.closeButton} onClick={props.handleClose}>
                x
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                error={nameError !== ""}
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                  if (e.target.value !== "") {
                    setNameError("");
                  } else {
                    setNameError("Enter Name");
                  }
                }}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                error={usernameError !== ""}
                label="Username"
                type="text"
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                  if (e.target.value !== "") {
                    setUsernameError("");
                  } else {
                    setUsernameError("Enter Username");
                  }
                }}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                error={emailError !== ""}
                label="Email"
                type="text"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  if (e.target.value !== "") {
                    setEmailError("");
                  } else {
                    setEmailError("Enter Email");
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                error={phoneError !== ""}
                label="Phone"
                variant="outlined"
                type="number"
                value={phone}
                onChange={(e) => {
                  setUser({ ...user, phone: e.target.value });
                  if (e.target.value !== "") {
                    setPhoneError("");
                  } else {
                    setPhoneError("Enter Phone No");
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                error={websiteError !== ""}
                label="Website"
                type="text"
                variant="outlined"
                value={website}
                onChange={(e) => {
                  setUser({ ...user, website: e.target.value });
                  if (e.target.value !== "") {
                    setWebsiteError("");
                  } else {
                    setWebsiteError("Enter Website");
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.buttonBox}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.handleClose}
              >
                Cancel
              </Button>
              <Button
                className={classes.buttonCreate}
                variant="contained"
                color="primary"
                onClick={createUser}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    </>
  );
};
export default AddUser;
