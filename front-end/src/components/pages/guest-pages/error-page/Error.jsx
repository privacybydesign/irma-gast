import React from "react";
import errorImg from "../../../../images/error.png";
import { withTranslation } from "react-i18next";

function Error({ t }) {
  return (
    <div className="content">
      <h3>{t("error.header")}</h3>
      <br />
      <br />
      {t("error.text")}
      <br />
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

export default withTranslation("guest")(Error);
