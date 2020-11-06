import React, { useState } from "react";
import flagNL from "../../images/flags/nl.png";
import flagEN from "../../images/flags/en.png";
import Tooltip from "@material-ui/core/Tooltip";
import i18n from "i18next";
import { initReactI18next, withTranslation } from "react-i18next";

function NavBarItems({ t, onLogout, link }) {
  const getLanguage = () => i18n.language || window.localStorage.i18nextLng;

  const handleClick = () =>
    i18n.use(initReactI18next).init({ lng: getLanguage() === "nl" ? "en" : "nl"});

  return (
    <div>
      {/* <a href="#why" className="w3-bar-item">
        Waarom?
      </a> */}
      {link === "logout" && (
        <a href="/" className="w3-bar-item" onClick={onLogout}>
          {t("items.logout")}
        </a>
      )}
      {/* {link === "more" && (
        <a href="/" className="w3-bar-item">
          Over IRMA-welkom
        </a>
      )} */}
      {link === "menu" && (
        <div>
          <a href="/#who" className="w3-bar-item">
            {t("items.who")}
          </a>
          <a href="/#how" className="w3-bar-item">
            {t("items.how")}
          </a>
          <a href="/#start" className="w3-bar-item">
            {t("items.start")}
          </a>
          <a href="/host" className="w3-bar-item">
            {t("items.login")} <i className="fa fa-sign-in"></i>
          </a>
          <Tooltip
            title={t("items.switchlang")}
            placement="left-end"
            aria-label="english"
            onClick={handleClick}
          >
            <span className="selected-lang refs">
              {getLanguage() === "nl" && <img src={flagEN} className="flag" alt="en" />}
              {getLanguage() === "en" && <img src={flagNL} className="flag" alt="nl" />}
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default withTranslation("navbar")(NavBarItems);
