import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import UserSignup from "./user/Signup";
import UserSignin from "./user/Signin";
import GarageSignIn from "./garage/Signin";
import GarageSignUp from "./garage/Signup";
import ForgotPassword from "./user/ForgotPassword";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/usersignin" exact component={UserSignin} />
        <Route path="/usersignup" exact component={UserSignup} />
        <Route path="/garagesignup" exact component={GarageSignUp} />
        <Route path="/garagesignin" exact component={GarageSignIn} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
