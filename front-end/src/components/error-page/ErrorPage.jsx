import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Error from "./Error";

function ErrorPage(props) {
  return (
    <div className="container">
      <Header link="login" />
      <p></p>
      <Error />
      <div className="irma-blue">
        <Footer />
      </div>
    </div>
  );
}

export default ErrorPage;
