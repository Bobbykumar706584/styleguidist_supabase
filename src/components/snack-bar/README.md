### Snack Bar Example

Demo for snackbar messages

```js
import SnackBar from "./SnackBar";
import { Button } from "@material-ui/core";

const [responseStatus, setResponseStatus] = React.useState([false]);

const alertClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setResponseStatus([false]);
};
<>
  <Button
    variant="contained"
    color="primary"
    onClick={() => setResponseStatus([true, "success", "Success message"])}
    style={{ marginRight: 10 }}
  >
    Show Success Message
  </Button>
  <Button
    variant="contained"
    color="secondary"
    onClick={() => setResponseStatus([true, "error", "Error message"])}
  >
    Show Error Message
  </Button>
  <SnackBar responseStatus={responseStatus} handleClose={alertClose} />
</>;
```
