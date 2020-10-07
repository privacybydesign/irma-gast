import React from "react";
import guests from "../../../../images/guests.png";

function Welcome(props) {
  return (
    <div className="wide">
      <div className="irma-light">
        <div className="flex-container">
          <div className="flex-item-single">
            <h3>Registreer zelf bezoekers, op het werk of thuis!</h3>
            <p>
              Met IRMA-welkom kan iedereen host zijn en gemakkelijk en veilig
              e-mailadressen verzamelen van bezoekers, om verspreiding van het
              coronavirus tegen te gaan.
              <br />
            </p>
            <p>
              Alles wat jij en je bezoekers hiervoor nodig hebben is de gratis
              IRMA-app, met daarin een e-mailadres. Je hoeft je niet vooraf te
              registreren.
            </p>
            <p>
              <a href="#" className="btn irma-btn">
                Login als host met IRMA*
              </a>
              <a href="#" className="btn irma-btn-secondary">
                Installeer eerst IRMA
              </a>
            </p>
            <p className="small">
              *Door in te loggen ga je akkoord met verwerking van
              persoonsgegevens zoals beschreven in de{" "}
              <a href="#privacypolicy">privacy policy</a> van IRMA-welkom.
            </p>
          </div>
          <div className="flex-item-single">
            {" "}
            <img
              className="illustration"
              src={guests}
              alt="Restaurant visitors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
