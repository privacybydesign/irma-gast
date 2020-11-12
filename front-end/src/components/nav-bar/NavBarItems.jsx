import React from "react";
import flagNL from "../../images/flags/nl.png";
import flagEN from "../../images/flags/en.png";
import Tooltip from "@material-ui/core/Tooltip";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    "text-decoration": "underline",
    color: "#004c92",
    backgroundColor: "transparent"
  },
}));

function NavBarItems({ t, onLogout, link, loggedIn }) {
  const handleClick = () =>
    i18n.changeLanguage(i18n.language.startsWith("en") ? "nl" : "en");

  const classes = useStyles();
  return (
    <div>
      {/* <a href="#why" className="w3-bar-item">
        Waarom?
      </a> */}
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
          {!loggedIn ? (
            <a href="/host" className="w3-bar-item">
              {t("items.login")} <i className="fa fa-sign-in"></i>
            </a>
          ) : (
            <button className={`w3-bar-item ${classes.button}`} onClick={onLogout}>
              {t("items.logout")}
            </button>
          )}
          <Tooltip
            title={t("items.switchlang")}
            placement="left-end"
            aria-label="english"
            onClick={handleClick}
          >
            <span className="selected-lang refs">
              {i18n.language.startsWith("nl") && (
                <img src={flagEN} className="flag" alt="en" />
              )}
              {i18n.language.startsWith("en") && (
                <img src={flagNL} className="flag" alt="nl" />
              )}
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default withTranslation("navbar")(NavBarItems);
