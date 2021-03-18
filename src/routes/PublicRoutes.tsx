import React from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";

import { RequestPasswordResetMail, ResetPasswordByToken, SignIn } from "../pages/session";

export const PublicRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/password/new" component={RequestPasswordResetMail} />
      <Route exact path="/password/edit/" component={ResetPasswordByToken} />
      <Route path="/" component={SignIn} />
    </Switch>
  </Router>
);
