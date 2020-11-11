import React from "react";
import how from "../../../../images/how.png";
import { Trans, withTranslation } from "react-i18next";

function How({ t }) {
  return (
    <div className="wide" id="how">
      <div className="flex-container">
        <div className="flex-item-double">
          <h3>{t("how.h1")}</h3>
          <h4>{t("how.h2")}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("how.p1") }} />
          <p dangerouslySetInnerHTML={{ __html: t("how.p2") }} />
          <p>{t("how.p3")}</p>
          <p>{t("how.p4")}</p>
          <h4>{t("how.h3")}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("how.p5") }} />
          <p>
            <Trans
              t={t}
              i18nKey="how.p6"
              components={[<a href="/policy"></a>]}
            />
          </p>
        </div>
        <div className="flex-item-single">
          <img className="illustration" src={how} alt="Restaurant visitors" />
        </div>
      </div>
    </div>
  );
}

export default withTranslation("landing")(How);
