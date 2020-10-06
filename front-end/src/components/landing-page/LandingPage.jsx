import React from "react";
import Footer from "../footer/Footer";
import Explanation from "./content/Explanation";
import How from "./content/How";
import Who from "./content/Who";
import NavBar from "./content/NavBar";
import PrivacyPolicy from "./content/PrivacyPolicy";
import Welcome from "./content/Welcome";

function LandingPage(props) {
  return (
    <div className="container">
      {/* <Header link="login" /> */}
      <NavBar />
      <p></p>
      <div className="irma-light">
        <Welcome />
      </div>
      <div className="irma-grey">
        <Who />
      </div>
      <div className="irma-white">
        <How />
      </div>
      <div className="irma-light">
        <Explanation />
      </div>
      <div className="irma-grey">
        <PrivacyPolicy />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
