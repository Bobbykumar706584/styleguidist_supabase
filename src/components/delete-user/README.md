### User delete Example

Demo for User delete

```js
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteUser from "./DeleteUser";
import { supabase } from "../../supabaseClient";

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

<>
  <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Username</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
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
  <DeleteUser userId={userId} handleDelete={fetchUsers} />
</>;
```
