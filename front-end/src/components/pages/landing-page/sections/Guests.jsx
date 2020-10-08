import React from "react";

function How(props) {
  return (
    <div className="content" id="how">
      <h3>Hoe werkt het?</h3>
      <h4>De host maakt een samenkomst aan en hangt een QR code op </h4>
      <p>
        Met de [IRMA-app](https://irma.app/) kunnen gebruikers zich op veel
        verschillende manieren online bekend maken, bijvoorbeeld met hun naam,
        adres, e-mail, 06 of BSN. Bij IRMA-welkom wordt alleen om een
        e-mailadres gevraagd. De app installeer je maar één keer en kun je
        daarna overal voor IRMA-welkom gebruiken. Dat is stukken makkelijker dan
        steeds formuliertjes invullen waarvan onduidelijk is waar ze blijven.
        Steeds meer mensen hebben deze IRMA-app op hun telefoon. Heb je de app
        nog niet, bekijk dan deze [uitleg](...). Voor breed gebruik van
        IRMA-welkom is een netwerk effect nodig.
      </p>
      <p>
        {" "}
        De e-mailadressen van bezoekers worden beveiligd (versleuteld)
        opgeslagen en na twee weken automatisch weggegooid. Alleen de host kan
        de e-mailadressen ontsleutelen, bij een besmetting, om bezoekers zelf te
        waarschuwen of om hun e-mailadressen door te geven aan de GGD. De
        organisatie achter IRMA-welkom kan en wil zelf niet zien wie bij wie op
        bezoek komt, zie ook de [privacy policy](...). IRMA-welkom en de IRMA
        app zijn gratis en werken transparant, met open source software;
        gegevens van gebruikers worden niet voor andere doeleinden gebruikt en
        niet aan anderen doorgegeven of doorverkocht.
      </p>
      <h4>
        De bezoeker scant de QR code bij binnenkomst en laat zijn emailadres
        achter
      </h4>
    </div>
  );
}

export default How;