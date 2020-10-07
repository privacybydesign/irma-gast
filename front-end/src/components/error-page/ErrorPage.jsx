import React from "react";
import Footer from "../footer/Footer";
import NavBar from "../nav-bar/NavBar";
import Error from "./Error";

function ErrorPage(props) {
  return (
    <div className="container">
      <NavBar /> <p></p>
      <div className="filler">
        <Error />
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
