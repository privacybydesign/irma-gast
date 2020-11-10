import React from "react";
import { withTranslation } from "react-i18next";

function Login({ t }) {
  return (
    <>
      <h2>{t("header")}</h2>
      <p>{t("p1")}</p>
      <div style={{ height: "30px" }} />
      <section className={"irma-web-center-child"}>
        <section id={"irma-web-form"} />
      </section>
      <div style={{ height: "60px" }} />
      <h4 className="center-content">{t("noapp")}</h4>
      <p>{t("p2")}</p>
      <div className="center-content">
        <a href="https://irma.app" className="btn irma-btn-secondary">
          {t("install")}
        </a>
      </div>
      <p dangerouslySetInnerHTML={{ __html: t("p3") }}></p>
    </>
  );
}

export default withTranslation("login")(Login);
