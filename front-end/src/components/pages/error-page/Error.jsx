import React from "react";
import errorImg from "../../../images/error.png";

function Error(props) {
  return (
    <div className="content">
      <h3>QR-code niet herkend</h3>
      <br /> De QR-code is niet meer geldig, mogelijk omdat deze bijeenkomst
      afgelopen is of de laatste twee weken geen bezoekers meer heeft gehad (en
      daarmee automatisch opgeheven is). Klopt er iets niet? Neem dan contact op
      met de host, via het e-mailadres boven de QR-code.
      <br /> <br />
      <div className="flex-item-single">
        <img
          className="illustration"
          src={errorImg}
          alt="Restaurant visitors"
        />
      </div>
    </div>
  );
}

export default Error;
