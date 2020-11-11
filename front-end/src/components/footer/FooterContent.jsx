import React from "react";
import { withTranslation } from "react-i18next";

function FooterContent({ t }) {
  return (
    <div>
      <div className="footer-info">
        <h4>{t("header")}</h4>
        <p dangerouslySetInnerHTML={{__html: t("p1")}}></p>
        <p dangerouslySetInnerHTML={{__html: t("p2")}}></p>
        <p dangerouslySetInnerHTML={{__html: t("p3")}}></p>
        <p dangerouslySetInnerHTML={{__html: t("p4")}}></p>
      </div>
    </div>
  );
}

export default withTranslation("footer")(FooterContent);
