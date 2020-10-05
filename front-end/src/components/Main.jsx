import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./guest-page/GuestPage";
import Portal from "./host-portal/Portal";
import LandingPage from "./landing-page/LandingPage";
import ErrorPage from "./error-page/ErrorPage";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={GuestPage}></Route>
      <Route exact path="/host" component={Portal}></Route>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/error" component={ErrorPage}></Route>
    </Switch>
  );
};

export default Main;
