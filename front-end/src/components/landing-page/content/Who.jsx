import React from "react";
import who from "../../../images/who.png";

function Who(props) {
  return (
    <div className="wide" id="who">
      {" "}
      <div class="flex-container">
        <div class="flex-item-left">
          {" "}
          <img className="illustration" src={who} alt="Restaurant visitors" />
        </div>{" "}
        <div class="flex-item-right">
          {" "}
          <h4>IRMA-welkom is voor iedereen!</h4>
          <p>
            IRMA-welkom is voor iedereen die samenkomsten organiseerd of aan
            bijeenkomsten deelnemt. Je kunt met IRMA-welkom bijvoorbeeld
            makkelijk contactgegevens versamelen als:
          </p>
          <ul>
            <li>eigenaar van een café, restaurant, winkel, garage, ...</li>
            <li>uitoefenaar van een contactberoep</li>
            <li>
              organisator van een (eenmalige) bijeenkomst, vergadering,
              voordracht, les, college, ...
            </li>
            <li>
              verantwoordelijke voor een werkvloer, afdeling of verdieping
            </li>
            <li>privé persoon die wil bijhouden wie thuis op bezoek komt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Who;
