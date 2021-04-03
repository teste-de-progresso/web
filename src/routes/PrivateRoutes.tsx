import React from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";

import { AppBar } from "../components";
import { Home, UserProfile } from "../screens";
import {
  New, Show, Review, Edit,
} from "../screens/questions";

export const PrivateRoutes = () => (
  <Router>
    <AppBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/question/new" component={New} />
      <Route exact path="/question/:uuid" component={Show} />
      <Route exact path="/question/:uuid/edit" component={Edit} />
      <Route exact path="/question/:uuid/review" component={Review} />
      <Route exact path="/user/profile" component={UserProfile} />
    </Switch>
  </Router>
);
