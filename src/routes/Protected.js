import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

function Protected() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [fact, setFact] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getDogFacts = async () => {
      const token = localStorage.getItem("token");
      const myDecodedToken = decodeToken(token);
      const isMyTokenExpired = isExpired(token);

      if (!myDecodedToken && isMyTokenExpired === true) {
        return history.push("/login");
      }
      await fetch("https://pizza-by-vrushabh.herokuapp.com/dogs", {
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let x = Math.floor(Math.random() * 435 + 1);
          setFact(data[x].fact);
        })
        .catch((err) => console.log("Error:", err.message));
    };
    getDogFacts();
  }, [history]);

  return (
    <div className="modal">
      <h3>Random Dog Facts</h3>
      <Button variant="outlined" onClick={handleClickOpen}>
        Click Me
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Dog Facts"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{fact}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              history.go(0);
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Protected;
