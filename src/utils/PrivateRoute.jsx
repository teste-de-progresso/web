import React from "react";
import { Route } from "react-router-dom";
import { AuthenticationContext } from "./contexts/Authentication";
import { Login } from "../screens/Login";

export const PrivateRoute = (props) => (
  <AuthenticationContext.Consumer>
    {(value) => (value.isLoggedIn ? <Route {...props} /> : <Login />)}
  </AuthenticationContext.Consumer>
);
