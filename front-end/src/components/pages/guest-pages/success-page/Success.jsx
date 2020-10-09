import React from "react";
import successImg from "../../../../images/success.png";

function Success(props) {
  return (
    <div className="content">
      <h2>Gelukt!</h2>
      <br />
      <div className="flex-item-single xs-img-container">
        <img className="small-img" src={successImg} alt="Restaurant visitors" />
      </div>
      <br />
      <p className="center-content">
        Je e-mailadres is doorgegeven.
        <br /> <br /> Je e-mailadres wordt beveiligd (versleuteld) opgeslagen en
        na twee weken automatisch weggegooid. In het geval van een coronamelding
        ontvang je een waarschuwing. Je kunt deze pagina nu sluiten.
      </p>
      <br /> <br />
    </div>
  );
}

export default Success;
