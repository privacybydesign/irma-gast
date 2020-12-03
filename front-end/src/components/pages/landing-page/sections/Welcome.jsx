import React from "react";
import guests from "../../../../images/guests.png";
import { Trans, withTranslation } from "react-i18next";

function Welcome({ t }) {
  return (
    <div className="wide">
      <div className="irma-light">
        <div className="flex-container">
          <div className="flex-item-single">
            <h3>{t("welcome.h1")}</h3>
            <p>{t("welcome.p1")}</p>
            <p>{t("welcome.p2")}</p>
            <p>
              <Trans
                t={t}
                i18nKey="welcome.p3"
                components={[
                  /* eslint-disable-next-line */
                  <a href="/host" className="btn irma-btn" />,
                  /* eslint-disable-next-line */
                  <a
                    href="https://irma.app/"
                    className="btn irma-btn-secondary"
                  />,
                ]}
              />
            </p>
            <p className="small">
              <Trans
                t={t}
                i18nKey="welcome.p4"
                components={[
                  /* eslint-disable-next-line */
                  <a href="/policy" />,
                ]}
              />
            </p>
          </div>
          <div className="flex-item-single">
            {" "}
            <img
              className="illustration"
              src={guests}
              alt="Restaurant visitors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("landing")(Welcome);
