import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./guest-page/GuestPage";
import Portal from "./host-portal/Portal";
import LandingPage from "./landing-page/LandingPage";
import ErrorPage from "./error-page/ErrorPage";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={GuestPage}/>
      <Route exact path="/host" component={Portal}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/error" component={ErrorPage}/>
    </Switch>
  );
};

export default Main;
