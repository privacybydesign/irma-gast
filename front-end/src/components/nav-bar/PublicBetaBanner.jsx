import React from "react";
import { withTranslation } from "react-i18next";

const PublicBetaBanner = ({ t }) => {
  return (
    <div className="w3-bar irma-blue w3-card">
      <div className="flex-container">
        <p className="info-title flex-item-single-centered">
          {t("alert_text")}
        </p>
      </div>
    </div>
  );
};

export default withTranslation("public_beta_banner")(PublicBetaBanner);
