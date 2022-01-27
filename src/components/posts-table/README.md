### Post table exmaple

Demo for Post table

```js
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { supabase } from "../../supabaseClient";
import DeletePost from "../delete-post/DeletePost";
import UpdatePost from "../update-post/UpdatePost";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    border: "2px solid",
    marginTop: "10px",
  },
  headRow: {
    background: "#aaa",
    borderBottom: "2px solid",
  },
});

const classes = useStyles();
const [posts, setPosts] = useState([]);
const [users, setUsers] = useState(null);
const [userSearch, setUserSearch] = useState(null);

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
const filterUser = (post) => {
  return userSearch === null || post.user_id === userSearch;
};

<>
  <Select
    className="w-80"
    options={users}
    onChange={(a) => setUserSearch(a ? a.value : null)}
    isClearable={true}
    defaultValue={userSearch}
    placeholder={"All Users"}
  />
  <IconButton aria-label="refresh" onClick={fetchPosts}>
    <RefreshIcon />
  </IconButton>
  <TableContainer className={classes.container}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow className={classes.headRow}>
          <TableCell>Username</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>body</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts &&
          users &&
          posts.filter(filterUser).map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {users.find((a) => a.value === item.user_id).label}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <DeletePost userId={item.id} handleDelete={fetchPosts} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
</>;
```
