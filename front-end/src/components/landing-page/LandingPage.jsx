import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Explanation from "./content/Explanation";
import Guests from "./content/Guests";
import Hosts from "./content/Hosts";
import PrivacyPolicy from "./content/PrivacyPolicy";
import Welcome from "./content/Welcome";

function LandingPage(props) {
  return (
    <div>
      <Header link="login" />
      <p></p>
      <div className="irma-light">
        <Welcome />
      </div>
      <div className="irma-grey">
        <Hosts />
      </div>
      <div className="irma-white">
        <Guests />
      </div>
      <div className="irma-light">
        <Explanation />
      </div>
      <div className="irma-grey">
        <PrivacyPolicy />
      </div>
      <div className="irma-blue">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
