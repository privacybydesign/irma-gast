import React from "react";
import Footer from "../../../footer/Footer";
import NavBar from "../../../nav-bar/NavBar";
import Success from "./Success";

function SuccessPage() {
  return (
    <div className="container">
      <NavBar link="menu" /> <p></p>
      <div className="filler">
        <Success />
      </div>
      <Footer />
    </div>
  );
}

export default SuccessPage;
