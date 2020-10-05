import React from "react";

function Welcome(props) {
  return (
    <div className="content">
      <h2>Welkom bij IRMA-welkom</h2>
      <p>Voor IRMA-welkom is de IRMA app nodig, zie [uitleg](...).</p>
      <div>[Login als host]</div>
      <p>
        Door in te loggen ga je akkoord met verwerking van persoonsgegevens
        zoals beschreven in de [privacy policy](...) van IRMA-welkom.
      </p>
    </div>
  );
}

export default Welcome;
