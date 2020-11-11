import React from "react";
import policy from "../../../images/policy.png";
import { withTranslation } from "react-i18next";

function PrivacyPolicy({ t }) {
  return (
    <div className="content" id="privacypolicy">
      <h2>{t("h1")}</h2>
      <p>{t("p1")}</p>
      <div className="small-img-container">
        <img className="small-img" src={policy} alt="Policy illustration" />
      </div>
      <p dangerouslySetInnerHTML={{ __html: t("p2") }} />
      <div className="subheading">{t("h2")}</div>
      <p dangerouslySetInnerHTML={{ __html: t("p3") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p4") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p5") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p6") }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("li1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("li2") }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t("p7") }} />
      <div className="subheading">{t("h3")}</div>
      <p dangerouslySetInnerHTML={{ __html: t("p8") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p9") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p10") }} />
      <div className="subheading">{t("h4")}</div>
      <p dangerouslySetInnerHTML={{ __html: t("p11") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p12") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p13") }} />
      <div className="subheading">{t("h5")}</div>
      <p dangerouslySetInnerHTML={{ __html: t("p14") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p15") }} />
      <p dangerouslySetInnerHTML={{ __html: t("p16") }} />
    </div>
  );
}

export default withTranslation("policy")(PrivacyPolicy);
