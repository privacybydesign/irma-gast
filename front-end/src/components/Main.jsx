import React from "react";
import { Switch, Route } from "react-router-dom";

import GuestPage from "./pages/guest-page/GuestPage";
import HostPage from "./pages/host-page/HostPage";
import LandingPage from "./pages/landing-page/LandingPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import PrivacyPolicyPage from "./pages/privacy-policy-page/PrivacyPolicyPage";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={GuestPage} />
      <Route exact path="/host" component={HostPage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/policy" component={PrivacyPolicyPage} />
    </Switch>
  );
};

export default Main;
