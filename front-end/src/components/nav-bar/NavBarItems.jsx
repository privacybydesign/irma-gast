import React from "react";
import flag from "../../images/flags/nl.png";
import Tooltip from "@material-ui/core/Tooltip";

function NavBarItems(props) {
  return (
    <div>
      {/* <a href="#why" className="w3-bar-item">
        Waarom?
      </a> */}
      {props.link === "logout" && (
        <a href="/" className="w3-bar-item" onClick={props.onLogout}>
          Logout
        </a>
      )}
      {/* {props.link === "more" && (
        <a href="/" className="w3-bar-item">
          Over IRMA-welkom
        </a>
      )} */}
      {props.link === "menu" && (
        <div>
          <a href="/#who" className="w3-bar-item">
            Voor wie?
          </a>
          <a href="/#how" className="w3-bar-item">
            Hoe werkt het?
          </a>
          <a href="/#start" className="w3-bar-item">
            Van start
          </a>
          <a href="/host" className="w3-bar-item">
            Host login <i className="fa fa-sign-in"></i>
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

export default NavBarItems;
