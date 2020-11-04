import React from "react";
import { Trans, withTranslation } from "react-i18next";

function DisclosurePage({ t, host, onNext }) {
  return (
    <div className="content">
      <h2>{t("disclosure.header")}</h2>
      <p>
        <Trans
          i18nKey="disclosure.p1"
          values={{ host: host }}
          components={{ bold: <b></b> }}
        />
      </p>
      <div className="center-content">
        <div className="btn irma-btn" onClick={onNext}>
          {t("disclosure.button")}
        </div>
      </div>
    </div>
  );
}

export default withTranslation("guest")(DisclosurePage);
