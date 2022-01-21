This is an atomic component that greets a single name.

### ADD USER

```js
import React, { useState } from "react";
import AddUser from "./AddUser";
import { Button } from "@material-ui/core";
const [showModal, setShowModal] = useState(false);
const handleClose = () => {
  setShowModal(false);
};
const handleOpen = () => {
  setShowModal(true);
};
<>
  <Button variant="contained" color="primary" onClick={handleOpen}>
    + Add
  </Button>
  <AddUser showModal={showModal} handleClose={handleClose} />
</>;
```
