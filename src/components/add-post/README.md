This is an atomic component that greets a single post.

### ADD POST

```js
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import AddPost from "./AddPost";

const [showModal, setShowModal] = useState(false);

const handleOpen = () => {
  setShowModal(true);
};

const handleClose = () => {
  setShowModal(false);
};

<>
  <Button variant="contained" color="primary" onClick={handleOpen}>
    + Add
  </Button>
  <AddPost showModal={showModal} handleClose={handleClose} />
</>;
```
