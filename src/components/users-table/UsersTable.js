import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteUser from "../delete-user/DeleteUser";
import UpdateUser from "../update-user/UpdateUser";
import { supabase } from "../../supabaseClient";

const useStyles = makeStyles({
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
});

const UsersTable = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select();
    data.sort((a, b) => a.id - b.id);
    setUsers(data);
  }

  return (
    <>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>
                  <UpdateUser user={user} handleUpdate={fetchUsers} />
                </TableCell>
                <TableCell>
                  <DeleteUser userId={user.id} handleDelete={fetchUsers} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
