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
      <div className="App-bar">
        <div className="buttons">
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/protected")}>
            Protected Page
          </Button>
          <Button onClick={() => history.push("/unprotected")}>
            Unprotected Page
          </Button>

          {login === true ? (
            <Button sx={{ ml: "auto" }} onClick={Logout}>
              Logout
            </Button>
          ) : (
            <Button sx={{ ml: "auto" }} onClick={() => history.push("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
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
