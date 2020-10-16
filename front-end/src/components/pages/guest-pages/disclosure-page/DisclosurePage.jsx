import React from "react";
import Footer from "../../../footer/Footer";
import NavBar from "../../../nav-bar/NavBar";

function DisclosurePage(props) {
  return (
//    <div className="container">
//      <NavBar link="menu" /> <p></p>
//      <div className="filler">
        <div className="content">
          <h2>Laat je e-mailadres achter</h2>
          <p>
            Wil je je e-mailaddress achterlaten bij <b>{props.host}</b>? Je kan
            dan in het geval van een coronamelding een waarschuwing ontvangen.
            Je e-mailadres wordt beveiligd (versleuteld) opgeslagen en na twee
            weken automatisch weggegooid. Alleen <b>{props.host}</b> kan je e-mailadres
            ontsleutelen.
          </p>
          <div className="center-content">
            <div className="btn irma-btn" onClick={props.onNext}>
              Laat email achter
            </div>
          </div>
        </div>
//      </div>
//      <Footer />
//    </div>
  );
}

export default DisclosurePage;
