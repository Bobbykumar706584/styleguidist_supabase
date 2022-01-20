This is an atomic component that greets a single name.

### ADD USER

```js
import AddUser from "./AddUser";
import { Button } from "@material-ui/core";
const [showModal, setShowModal] = React.useState(false);

const handleClose = () => {
  setShowModal(false);
};
<>
  <Button
    variant="contained"
    color="primary"
    onClick={(e) => setShowModal(true)}
  >
    + Add
  </Button>
  <AddUser showModal={showModal} handleClose={handleClose} />
</>;
```
