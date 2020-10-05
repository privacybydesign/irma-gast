import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./GuestPage";
import Portal from "./Portal";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={GuestPage}></Route>
      <Route exact path="/" component={Portal}></Route>
    </Switch>
  );
};

export default Main;
