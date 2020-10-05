import React from "react";

function Error(props) {
  return (
    <div className="content">
      De QR-code is niet meer geldig, mogelijk omdat deze bijeenkomst afgelopen
      is of de laatste twee weken geen bezoekers meer heeft gehad (en daarmee
      automatisch opgeheven is). Klopt er iets niet? Neem dan contact op met de
      host, via het e-mailadres boven de QR-code.
    </div>
  );
}

export default Error;
