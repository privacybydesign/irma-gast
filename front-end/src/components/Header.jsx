import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <h1>
        IRMA
        <span>
          <MeetingRoomIcon fontSize="large" style={{ color: "#004C92" }} />
          welkom
        </span>
      </h1>
      <p>
        {props.link === "login" ? (
          <Link to="/host">
            <p>Host login</p>
          </Link>
        ) : (
          <Link to="/">
            <p>Logout</p>
          </Link>
        )}
        {/* TODO: replace link destination with landing page */}
      </p>
    </header>
  );
}

export default Header;
