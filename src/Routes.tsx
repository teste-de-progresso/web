import React from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";

import { AppBar } from "./components";
import { List } from "./pages/question";
import {
  New, Show, Review, Edit,
} from "./pages/question";

import { Profile, RequestPasswordResetMail, ResetPasswordByToken, SignIn } from "./pages/session";

export const PrivateRoutes = () => (
  <Router>
    <AppBar />
    <Switch>
      <Route exact path="/" component={List} />
      <Route exact path="/my_user" component={Profile} />
      <Route exact path="/questions" component={List} />
      <Route exact path="/questions/new" component={New} />
      <Route exact path="/questions/:id" component={Show} />
      <Route exact path="/questions/:id/edit" component={Edit} />
      <Route exact path="/questions/:id/review" component={Review} />
    </Switch>
  </Router>
);

export const PublicRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/password/new" component={RequestPasswordResetMail} />
      <Route exact path="/password/edit/" component={ResetPasswordByToken} />
      <Route path="/" component={SignIn} />
    </Switch>
  </Router>
);