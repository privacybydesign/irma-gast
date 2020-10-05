import React from "react";

function Hosts(props) {
  return (
    <div className="content">
      <div>
        Met IRMA-welkom registreer je zelf bezoekers, op het werk of thuis
      </div>
      <p>
        Met IRMA-welkom kan iedereen "host" zijn en gemakkelijk en veilig
        e-mailadressen verzamelen van bezoekers, om verspreiding van het
        coronavirus tegen te gaan. Je kunt bijvoorbeeld host zijn als:
      </p>
      <ul>
        <li>eigenaar van een cafe, restaurant, winkel, garage, ...</li>
        <li>uitoefenaar van een contactberoep</li>
        <li>
          organisator van een (eenmalige) bijeenkomst, vergadering, voordracht,
          les, college, ...
        </li>
        <li>verantwoordelijke voor een werkvloer, afdeling of verdieping</li>
        <li>prive persoon die wil bijhouden wie thuis op bezoek komt.</li>
      </ul>
      <p>
        Als host kun je via de website [IRMA-welkom.nl](...) gratis een QR-code
        ophalen die je zelf afdrukt en ophangt. Je vraagt dan je bezoekers om
        deze QR-code te scannen en via hun IRMA app een e-mailadres te delen.
      </p>
    </div>
  );
}

export default Hosts;
