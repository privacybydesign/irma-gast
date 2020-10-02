import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Portal() {
  return (
    <div className="App">
      <Header />
      <h2>Meld je aan met IRMA</h2>
      <div className="content">
        <p>
          Laat je email-address achter zo dat je in het geval van een
          coronamelding een email kunt ontvangen.
        </p>
        <div style={{ height: "30px" }}></div>
        <a href="#" className="irma-btn btn">
          Email doorgeven met IRMA
        </a>
      </div>
      <h3>Nog geen IRMA app?</h3>
      <div className="content">
        <p>
          IRMA is [TODO]. Download IRMA hier en volg de onderstaande
          instructies.
        </p>
        <div style={{ height: "30px" }}></div>
        <a href="#" className="irma-btn-secondary btn">
          App Store
        </a>
      </div>
    </div>
  );
}

export default Portal;
