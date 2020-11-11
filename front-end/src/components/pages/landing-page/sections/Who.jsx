import React from "react";
import who from "../../../../images/who.png";
import { withTranslation } from "react-i18next";

function Who({ t }) {
  return (
    <div className="wide" id="who">
      {" "}
      <div className="flex-container">
        <div className="flex-item-single">
          {" "}
          <img className="illustration" src={who} alt="Restaurant visitors" />
        </div>{" "}
        <div className="flex-item-single">
          {" "}
          <h4>{t("who.h1")}</h4>
          <p>{t("who.p1")}</p>
          <ul>
            <li>{t("who.li1")}</li>
            <li>{t("who.li2")}</li>
            <li>{t("who.li3")}</li>
            <li>{t("who.li4")}</li>
            <li>{t("who.li5")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("landing")(Who);
