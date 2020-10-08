import React from "react";
import { Switch, Route } from "react-router-dom";

import PreDisclosurePage from "./pages/guest-pages/pre-disclosure-page/PreDisclosurePage";
import HostPage from "./pages/host-page/HostPage";
import LandingPage from "./pages/landing-page/LandingPage";
import ErrorPage from "./pages/guest-pages/error-page/ErrorPage";
import PrivacyPolicyPage from "./pages/privacy-policy-page/PrivacyPolicyPage";
import SuccessPage from "./pages/success-page/SuccessPage";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/guest" component={PreDisclosurePage} />
      <Route exact path="/host" component={HostPage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/success" component={SuccessPage} />
      <Route exact path="/policy" component={PrivacyPolicyPage} />
    </Switch>
  );
};

export default Main;
