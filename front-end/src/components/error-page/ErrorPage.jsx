import React from "react";
import Footer from "../footer/Footer";
import Header from "../Header";
import Error from "./Error";

function ErrorPage(props) {
  return (
    <div className="container">
      <Header link="login" />
      <p></p>
      <Error />
      <Footer />
    </div>
  );
}

export default ErrorPage;
