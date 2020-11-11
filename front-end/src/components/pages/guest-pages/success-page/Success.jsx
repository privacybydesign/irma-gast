import React from "react";
import successImg from "../../../../images/success.png";
import { withTranslation } from "react-i18next";

function Success({ t }) {
  return (
    <div className="content">
      <h2>{t("success.header")}</h2>
      <br />
      <div className="flex-item-single xs-img-container">
        <img className="small-img" src={successImg} alt="Restaurant visitors" />
      </div>
      <br />
      <p className="center-content">{t("success.p1")}</p>
      <br /> <br />
    </div>
  );
}

export default withTranslation("guest")(Success);
