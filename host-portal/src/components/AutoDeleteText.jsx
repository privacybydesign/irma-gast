import React from "react";

function AutoDeleteText(props) {
  return (
    <div className="guest-list">
      <p className="info-title">Je lijst is weg?</p>
      <p>
        Aanmeldingen worden na 14 dagen automatisch verwijderd. Als een
        bezoekerslijst uiteindelijk helemaal leeg is wordt de lijst zelf
        verwijderd. Je kunt altijd weer een nieuwe samenkomst / lijst toevoegen.
      </p>
    </div>
  );
}

export default AutoDeleteText;
