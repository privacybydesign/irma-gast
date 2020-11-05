import React from "react";
import start from "../../../../images/start.png";
import { withTranslation } from "react-i18next";

function Start({ t }) {
  return (
    <div className="wide" id="start">
      <div className="flex-container">
        <div className="flex-item-single">
          <img className="illustration" src={start} alt="Restaurant visitors" />
        </div>
        <div className="flex-item-double">
          <h2>{t("start.h1")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("start.p1") }} />
          <ul className="check">
            <li dangerouslySetInnerHTML={{ __html: t("start.li1") }} />
            <li dangerouslySetInnerHTML={{ __html: t("start.li2") }} />
            <li>{t("start.li3")}</li>
            <li>{t("start.li4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("landing")(Start);
