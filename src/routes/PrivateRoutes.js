import React from "react";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";

import { Navbar } from "../components";
import { Home, UserProfile } from "../screens";
import {
  New, Edit, Show, Review,
} from "../screens/questions";

export const PrivateRoutes = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/question/new" component={New} />
      <Route exact path="/question/:id" component={Show} />
      <Route exact path="/question/:id/edit" component={Edit} />
      <Route exact path="/question/:id/review" component={Review} />
      <Route exact path="/user/profile" component={UserProfile} />
    </Switch>
  </Router>
);
