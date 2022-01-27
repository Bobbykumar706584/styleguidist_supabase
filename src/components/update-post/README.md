### Post Update Example

Demo for Post Update

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
import UpdatePost from "./UpdatePost";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const classes = useStyles();
const [posts, setPosts] = useState([]);
const [postId, setPostId] = useState("");
const [users, setUsers] = useState(null);

const handleChange = (event) => {
  setPostId(event.target.value);
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

const findUser = (postId) => {
  return posts.find((post) => post.id === postId) || {};
};
<>
  <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="updateTitle-label">Title</InputLabel>
    <Select
      labelId="updateTitle-label"
      id="update-userId"
      value={postId}
      onChange={handleChange}
      label="Post Title"
    >
      {posts &&
        posts.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.title}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
  <IconButton aria-label="refresh" onClick={fetchPosts}>
    <RefreshIcon />
  </IconButton>
  <UpdatePost post={findUser(postId)} handleUpdate={fetchPosts} />
</>;
```
