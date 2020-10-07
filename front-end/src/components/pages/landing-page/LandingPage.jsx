import React from "react";
import Footer from "../../footer/Footer";
import How from "./sections/How";
import Who from "./sections/Who";
import NavBar from "../../nav-bar/NavBar";
import Welcome from "./sections/Welcome";
import Start from "./sections/Start";

function LandingPage(props) {
  return (
    <div className="container">
      <NavBar link="menu" />
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
        <Start />
      </div>
      <div style={{ height: "60px" }} />
      <Footer />
    </div>
  );
}

export default LandingPage;
