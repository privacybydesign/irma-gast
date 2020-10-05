import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./guest-page/GuestPage";
import Portal from "./host-portal/Portal";
import LandingPage from "./landing-page/LandingPage";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={GuestPage}></Route>
      <Route exact path="/host" component={Portal}></Route>
      <Route exact path="/" component={LandingPage}></Route>
    </Switch>
  );
};

export default Main;
