import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import React from "react";

function Header() {
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
        <a href="https://irma.app">Logout</a>
        {/* TODO: replace URL */}
      </p>
    </header>
  );
}

export default Header;
