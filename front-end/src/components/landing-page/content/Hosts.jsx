import React from "react";

function Hosts(props) {
  return (
    <div className="content">
      <div>
        Met IRMA-welkom registreer je zelf bezoekers, op het werk of thuis
      </div>
      <p>
        Met IRMA-welkom kan iedereen <em>host</em> zijn en gemakkelijk en veilig
        e-mailadressen verzamelen van bezoekers, om verspreiding van het
        coronavirus tegen te gaan. Je kunt bijvoorbeeld host zijn als:
      </p>
      <ul>
        <li>eigenaar van een café, restaurant, winkel, garage, ...</li>
        <li>uitoefenaar van een contactberoep</li>
        <li>
          organisator van een (eenmalige) bijeenkomst, vergadering, voordracht,
          les, college, ...
        </li>
        <li>verantwoordelijke voor een werkvloer, afdeling of verdieping</li>
        <li>privé persoon die wil bijhouden wie thuis op bezoek komt.</li>
      </ul>
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
    </div>
  );
}

export default Hosts;
