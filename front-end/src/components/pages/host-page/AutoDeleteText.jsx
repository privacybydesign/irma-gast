import React from "react";
import { withTranslation } from "react-i18next";

function AutoDeleteText({ t }) {
  return (
    <div className="guest-list">
      <p className="info-title"> {t("autodelete.header")}</p>
      <p> {t("autodelete.info")}</p>
    </div>
  );
}

export default withTranslation("host")(AutoDeleteText);
