import {store} from "@/store";

function Launch(text, timeout = 3000) {
    store.state.SnackBar.text = text
    store.state.SnackBar.timeout = timeout
    store.state.SnackBar.snackbar = true
}

export default {Launch}
