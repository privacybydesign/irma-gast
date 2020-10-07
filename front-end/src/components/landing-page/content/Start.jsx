import React from "react";
import start from "../../../images/start.png";

function Start(props) {
  return (
    <div className="wide" id="start">
      <div className="flex-container">
        <div className="flex-item-single">
          <img className="illustration" src={start} alt="Restaurant visitors" />
        </div>
        <div className="flex-item-double">
          <h2>Van start met IRMA-welkom</h2>

          <p>
            Zowel een host die een samenkomst aanmaakt als ook een bezoeker die
            zich aanmeldt heeft de <a href="https://irma.app/">IRMA-app</a>{" "}
            nodig. In de IRMA-app verzamel je persoonlijke gegevens van jezelf,
            in de vorm van kaartjes.
          </p>
          <ul className="check">
            <li>
              Download de IRMA-app uit de appstore (van{" "}
              <a href="https://play.google.com/store/apps/details?id=org.irmacard.cardemu">
                Google
              </a>{" "}
              of{" "}
              <a href="https://apps.apple.com/nl/app/irma-authenticatie/id1294092994">
                Apple
              </a>
              ).
            </li>
            <li>
              Voeg een kaartje toe met je e-mailadres, via{" "}
              <a href="https://privacybydesign.foundation/uitgifte/email/">
                deze pagina
              </a>
              . Je kunt ook meer kaartjes toevoegen, maar die zijn niet nodig
              voor IRMA-welkom.
            </li>
            <li>
              Met dit e-mail kaartje in de IRMA-app kan een host op IRMA-welkom
              inloggen en een samenkomst aanmaken en beheren.
            </li>
            <li>
              Bezoekers kunnen zich met dit e-mail kaartje in de IRMA-app bij
              samenkomsten aanmelden. Ze scannen met hun IRMA-app de QR-code en
              geven zo hun e-mailadres door.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Start;
