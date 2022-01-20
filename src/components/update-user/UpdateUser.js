import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Grid } from "@material-ui/core";
import SnackBar from "../snack-bar/SnackBar";
import { supabase } from "../../supabaseClient";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    border: "2px solid",
  },
  headRow: {
    background: "#aaa",
    borderBottom: "2px solid",
  },
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

const UpdateUser = (props) => {
  const classes = useStyles();
  const { handleClose, user, handleUpdate } = props;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState([false]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [id, setId] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
      setId(user.id);
    }
  }, [user]);

  const openModal = () => {
    setShowUpdateModal(true);
  };

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

  async function updateUser() {
    if (!validForm()) {
      return false;
    }
    await supabase
      .from("users")
      .upsert({ name, username, email, phone, website, id });
    setResponseStatus([true, "success", "Updated User"]);
    handleUpdate();
    setShowUpdateModal(false);
    window.location.reload(false);
  }

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
              <h3 className={classes.title}>Update User</h3>
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
                label="Name"
                required
                error={nameError !== ""}
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value !== "") {
                    setNameError("");
                  } else {
                    setNameError("Enter name");
                  }
                }}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Username"
                type="text"
                required
                error={usernameError !== ""}
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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
                label="Email"
                required
                error={emailError !== ""}
                type="text"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value !== "") {
                    setEmailError("");
                  } else {
                    setEmailError("Enter Email");
                  }
                }}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                required
                error={phoneError !== ""}
                variant="outlined"
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (e.target.value !== "") {
                    setPhoneError("");
                  } else {
                    setPhoneError("Enter Phone No");
                  }
                }}
                helperText={phoneError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Website"
                type="text"
                required
                error={websiteError !== ""}
                variant="outlined"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  if (e.target.value !== "") {
                    setWebsiteError("");
                  } else {
                    setWebsiteError("Enter Website");
                  }
                }}
                helperText={websiteError}
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
                onClick={() => updateUser(user.id)}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
      <SnackBar responseStatus={responseStatus} handleClose={handleClose} />
    </>
  );
};

export default UpdateUser;
