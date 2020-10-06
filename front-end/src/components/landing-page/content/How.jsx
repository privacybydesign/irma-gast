import React from "react";

function How(props) {
  return (
    <div className="content" id="how">
      <h3>Hoe werkt het?</h3>
      <h4>De host maakt een samenkomst aan en hangt een QR code op </h4>
      <p>
        Als host kun je via de website [IRMA-welkom.nl](...) gratis een QR-code
        ophalen die je zelf afdrukt en ophangt. Je vraagt dan je bezoekers om
        deze QR-code te scannen en via hun IRMA app een e-mailadres met je te
        delen.
      </p>
      <p>
        De e-mailadressen die je zo verzamelt worden na 2 weken automatisch
        weggegooid. Je hebt daar geen omkijken naar. Zijn de adressen nodig na
        een besmetting? Dan kun je ze als host ophalen via het
        <a href="">IRMA-welkom portaal</a>. De organisatie achter IRMA-welkom
        kan de verzamelde adressen niet ontsleutelen: alleen jij kan dat. Je heb
        daarvoor geen wachtwoord nodig, alleen je IRMA app.
      </p>

      <h4>
        De bezoeker scant de QR code bij binnenkomst en laat zijn emailadres
        achter
      </h4>
      <p>
        Met de [IRMA app](https://irma.app/) kunnen gebruikers zich op veel
        verschillende manieren online bekend maken, bijvoorbeeld met hun naam,
        adres, e-mail, 06 of BSN. Bij IRMA-welkom wordt alleen om een
        e-mailadres gevraagd. De app installeer je maar één keer en kun je
        daarna overal voor IRMA-welkom gebruiken. Dat is stukken makkelijker dan
        steeds formuliertjes invullen waarvan onduidelijk is waar ze blijven.
        Steeds meer mensen hebben deze IRMA app op hun telefoon. Heb je de app
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
    </div>
  );
}

export default How;
