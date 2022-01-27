### Post delete Example

Demo for Post delete

```js
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeletePost from "./DeletePost";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { supabase } from "../../supabaseClient";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const classes = useStyles();
const [posts, setPosts] = useState([]);
const [userId, setUserId] = useState("");
const [users, setUsers] = useState(null);
const [userSearch, setUserSearch] = useState(null);

const handleChange = (event) => {
  setUserId(event.target.value);
};

useEffect(() => {
  fetchPosts();
  userdropdown();
}, []);

async function fetchPosts() {
  const { data } = await supabase.from("posts").select();
  data.sort((a, b) => a.id - b.id);
  setPosts(data);
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
const findUser = (userId) => {
  return users.find((user) => user.id === userId) || {};
};

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
      {posts &&
        users &&
        posts.filter(findUser).map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {users.find((a) => a.value === item.user_id).label}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
  <IconButton aria-label="refresh" onClick={fetchPosts}>
    <RefreshIcon />
  </IconButton>
  <DeletePost userId={userId} fetchPosts={fetchPosts} />
</>;
```
