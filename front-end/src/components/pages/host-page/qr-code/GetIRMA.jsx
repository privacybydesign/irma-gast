import React from "react";
import start from "../../../../images/start.png";

function Instructions(props) {
  return (
    <div>
      <h3>Nog geen IRMA-app?</h3>
      <div>
        <p>
          Met de gratis <a href="https://irma.app/">IRMA-app</a> kunnen
          gebruikers zich aanmelden voor bijeenkomsten. In de IRMA-app verzamel
          je persoonlijke gegevens, in de vorm van kaartjes. Je kan je dan met
          deze kaartjes bekend maken.
        </p>{" "}
        <h5>1. Download IRMA</h5>
        {/* <div className="center-content"> */}
        <a href="#" className="btn irma-btn-secondary">
          IRMA voor iOS
        </a>
        <a href="#" className="btn irma-btn-secondary">
          IRMA voor Android
        </a>{" "}
        {/* </div> */}
        <h5>2. Laad je e-mailadres kaartje in IRMA</h5>
        <p>
          Bij IRMA-welkom wordt om een e-mailadres gevraagd. Voeg het kaartje
          met je e-m ail adres toe, via deze <a href="#">pagina</a>.
        </p>
        <h5>3. Scan de QR code met je IRMA-app</h5>
        <p>
          Bij IRMA-welkom wordt om een e-mailadres gevraagd. Voeg het kaartje
          met je e-m ail adres toe, via deze <a href="#">pagina</a>.
        </p>
      </div>
      <div className="small-img-container">
        <img className="small-img" src={start} alt="Get IRMA" />
      </div>
    </div>
  );
}

export default Instructions;
