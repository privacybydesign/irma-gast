import React from "react";
import Footer from "../../footer/Footer";
import NavBar from "../../nav-bar/NavBar";
import PrivacyPolicy from "./PrivacyPolicy";

function PrivacyPolicyPage(props) {
  return (
    <div className="container">
      <NavBar link="menu" /> <p></p>
      <div className="filler">
        <PrivacyPolicy />
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
