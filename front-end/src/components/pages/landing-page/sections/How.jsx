import React from "react";
import how from "../../../../images/how.png";

function How(props) {
  return (
    <div className="wide" id="how">
      <div className="flex-container">
        <div className="flex-item-double">
          <h3>Hoe werkt het?</h3>
          <h4>De host haalt een QR-code op en hangt deze op </h4>
          <p>
            Als host kun je op IRMA-welkom gratis en makkelijk QR-codes ophalen
            die je zelf afdrukt en ophangt. Je vraagt dan je bezoekers om deze
            QR-code te scannen en via hun{" "}
            <a href="https://irma.app/">IRMA-app</a> een e-mailadres met je te
            delen.
          </p>
          <p>
            De e-mailadressen die je zo verzamelt worden versleuteld opgeslagen
            en na 2 weken automatisch weggegooid. Je hebt als host daar geen
            omkijken naar. Zijn de adressen nodig na een besmetting? Dan kun je
            ze als host ophalen door (opnieuw) in te loggen. De organisatie
            achter IRMA-welkom kan de verzamelde e-mailadressen niet
            ontsleutelen: alleen jij kan dat. Je hebt daarvoor geen wachtwoord
            nodig, alleen je <a href="https://irma.app/">IRMA-app</a>.
          </p>
          <p>
            Je kunt als host verschillende samenkomsten aanmaken, met ieder een
            eigen QR-code, die je op verschillende plekken op kunt hangen. Zo
            kun je bijvoorbeeld voor iedere verdieping of afdeling op het werk
            een aparte registratie van bezoekers bijhouden.
          </p>
          <p>
            Als host zul je zeker in het begin regelmatig aan je bezoekers
            moeten vragen om de IRMA-app te installeren. Dat hoeft maar één
            keer; daarna levert het alleen maar gemak op. Het installeren is
            makkelijk en kan ter plekke gebeuren.
          </p>

          <h4>De bezoeker scant de QR-code en laat zijn e-mailadres achter</h4>
          <p>
            Bezoekers laten hun e-mailadres achter door de QR-code met de met de{" "}
            <a href="https://irma.app/">IRMA-app</a> te scannen. In de IRMA-app
            staan persoonlijke gegevens. Bij IRMA-welkom wordt alleen om een
            e-mailadres gevraagd. De app installeer je maar één keer. Je zet je
            email-address daarin en kunt de app daarna overal voor IRMA-welkom
            gebruiken. Dat is stukken makkelijker dan steeds formuliertjes
            invullen waarvan onduidelijk is waar ze blijven.
          </p>
          <p>
            {" "}
            De e-mailadressen van bezoekers worden beveiligd (versleuteld)
            opgeslagen en na twee weken automatisch weggegooid. Dat neemt
            terechte zorgen weg. Verder kan alleen de host de e-mailadressen
            ontsleutelen, bij een besmetting, om bezoekers zelf te waarschuwen
            of om hun e-mailadressen door te geven aan de GGD. De organisatie
            achter IRMA-welkom kan en wil zelf niet zien wie bij wie op bezoek
            komt, zie ook de <a href="#privacypolicy">privacy policy</a>.
          </p>
        </div>
        <div className="flex-item-single">
          <img className="illustration" src={how} alt="Restaurant visitors" />
        </div>
      </div>
    </div>
  );
}

export default How;
