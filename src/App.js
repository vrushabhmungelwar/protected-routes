import "./App.css";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Protected from "./routes/Protected";
import Unprotected from "./routes/Unprotected";
import Home from "./routes/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Login } from "./routes/login";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { SignUp } from "./routes/signup";
import { Forgot } from "./routes/forgotPassword";
import { Reset } from "./routes/resetPassord";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function App() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  const [login, setLogin] = useState(
    myDecodedToken && isMyTokenExpired === false ? true : false
  );
  function Logout() {
    localStorage.removeItem("token");
    setLogin(false);
    history.push("/login");
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Button color="inherit" onClick={() => history.push("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => history.push("/protected")}>
              Protected Page
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/unprotected")}
            >
              Unprotected Page
            </Button>

            {login === true ? (
              <Button color="inherit" sx={{ ml: "auto" }} onClick={Logout}>
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ ml: "auto" }}
                onClick={() => history.push("/login")}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/protected" Proute={Protected} />
        <Route path="/unprotected" component={Unprotected} />
        <Route path="/login">
          <Login setLogin={setLogin} />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/forgotpassword">
          <Forgot />
        </Route>
        <Route path="/resetpassword/:id/:token">
          <Reset />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
