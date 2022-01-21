### User Update Example

Demo for User Update

```js
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { supabase } from "../../supabaseClient";
import UpdateUser from "./UpdateUser";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const classes = useStyles();
const [users, setUsers] = useState([]);
const [userId, setUserId] = useState("");

const handleChange = (event) => {
  setUserId(event.target.value);
};

useEffect(() => {
  fetchUsers();
}, []);

async function fetchUsers() {
  const { data } = await supabase.from("users").select();
  data.sort((a, b) => a.id - b.id);
  setUsers(data);
}

const findUser = (userId) => {
  return users.find((user) => user.id === userId) || {};
};

<>
  <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="updateUser-label">Username</InputLabel>
    <Select
      labelId="updateUser-label"
      id="update-userId"
      value={userId}
      onChange={handleChange}
      label="Username"
    >
      {users.map((user) => (
        <MenuItem value={user.id} key={user.id}>
          {user.username}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <IconButton aria-label="refresh" onClick={fetchUsers}>
    <RefreshIcon />
  </IconButton>
  <UpdateUser user={findUser(userId)} handleUpdate={fetchUsers} />
</>;
```
