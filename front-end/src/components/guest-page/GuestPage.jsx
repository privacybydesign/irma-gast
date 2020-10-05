import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Instructions from "./Instructions";

function Portal() {
  return (
    <div className="App">
      <Header link="login" />
      <div className="content">
        <h2>Meld je aan met IRMA</h2>
        <p>
          Meld je aan met je e-mailaddress zodat je in het geval van een
          coronamelding een waarschuwing kunt ontvangen.
        </p>
        <div style={{ height: "30px" }}></div>
        <a href="#" className="irma-btn btn">
          E-mail doorgeven met IRMA
        </a>
        <div style={{ height: "60px" }}></div>
        <Instructions />
      </div>
      <Footer />
    </div>
  );
}

export default Portal;
