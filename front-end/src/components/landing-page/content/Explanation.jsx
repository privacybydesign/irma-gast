import React from "react";

function Explanation(props) {
  return (
    <div className="content">
      <h2>Van start met IRMA-welkom</h2>
      <p>
        Zowel hosts als ook bezoekers hebben de IRMA-app nodig. In de IRMA-app
        verzamel je persoonlijke gegevens, in de vorm van kaartjes.
      </p>
      <ul className="check">
        <li>Download de IRMA-app uit de appstore (van Google of Apple).</li>
        <li>Voeg ook een kaartje toe met je e-mail adres, via deze pagina.</li>
        <li>
          Met dit kaartje in je IRMA-app kan je je als bezoeker aanmelden bij
          een bijeenkomst of als host inloggen bij het IRMA-welkom portaal om je
          samenkomsten te beheren.
        </li>
      </ul>
    </div>
  );
}

export default Explanation;
