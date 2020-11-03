import React from "react";
import flag from "../../images/flags/nl.png";
import Tooltip from "@material-ui/core/Tooltip";
import { withTranslation } from "react-i18next";

function NavBarItems({ t, onLogout, link }) {
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
            {t('items.who')}
          </a>
          <a href="/#how" className="w3-bar-item">
            {t('items.how')}
          </a>
          <a href="/#start" className="w3-bar-item">
            {t('items.start')}
          </a>
          <a href="/host" className="w3-bar-item">
            {t('items.login')} <i className="fa fa-sign-in"></i>
          </a>
          <Tooltip
            title="English coming soon"
            placement="left-end"
            aria-label="english"
          >
            <span className="selected-lang refs">
              <img src={flag} className="flag" alt="nl" />
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default withTranslation("navbar")(NavBarItems);
