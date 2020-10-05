import React from "react";
import Footer from "../Footer";
import Header from "../Header";

function Portal() {
  return (
    <div className="App">
      <Header link="login" />
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
        <div>
          <p>
            Met de gratis[IRMA app](https://irma.app/) kunnen gebruikers zich
            aanmelden voor bijeenkomsten. Je kunt de IRMA-app hier verkrijgen:
          </p>
          <a href="#" className="irma-btn-secondary">
            IRMA voor iOS
          </a>
          <a href="#" className="irma-btn-secondary">
            IRMA voor Android
          </a>
          <p>
            In je IRMA-app verzamel je persoonlijke gegevens, in de vorm van
            kaartjes. Bij IRMA-welkom wordt om een e-mailadres gevraagd. Voeg
            het kaartje met je e-mail adres toe, via deze <a href="#">pagina</a>
            .
          </p>
          <div style={{ height: "30px" }}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Portal;
