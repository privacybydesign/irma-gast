import React, { useState } from "react";
import Header from "../Header";

function Portal() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <h2>Meld je aan met IRMA</h2>
        <p>
          Laat je email-address achter zo dat je in het geval van een
          coronamelding een email kunt ontvangen.
        </p>
        <div style={{ height: "30px" }}></div>
        <a href="#" className="irma-btn btn">
          Email doorgeven met IRMA
        </a>
        <div style={{ height: "60px" }}></div>
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
    </div>
  );
}

export default Portal;
