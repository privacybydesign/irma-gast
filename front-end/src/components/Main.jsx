import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./GuestPage/GuestPage";
import Portal from "./HostPortal/Portal";
import LandingPage from "./LandingPage/LandingPage";

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
