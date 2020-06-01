import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import UserSignup from "./user/Signup";
import UserSignin from "./user/Signin";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/usersignin" exact component={UserSignin} />
        <Route path="/usersignup" exxact component={UserSignup} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
