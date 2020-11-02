import React from "react";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NavBarItems from "./NavBarItems";

function NavBar(props) {
  // Toggle between showing and hiding the sidebar when clicking the menu icon

  function w3_open() {
    var mySidebar = document.getElementById("mySidebar"); // TODO: not sure how to do this only once in React as element is not available when I move this outside
    if (mySidebar.style.display === "block") {
      mySidebar.style.display = "none";
    } else {
      mySidebar.style.display = "block";
    }
  }

  // Close the sidebar with the close button
  function w3_close() {
    var mySidebar = document.getElementById("mySidebar");
    mySidebar.style.display = "none";
  }

  // TODO: replace a-elements with buttons to avoid the href="javascript:void(0)

  return (
    <div>
      <div className="w3-top">
        <div className="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/" className="w3-bar-item logo w3-wide">
            <h1>
              IRMA
              <span>
                <MeetingRoomIcon
                  fontSize="large"
                  style={{ color: "#004C92" }}
                />
                welkom
              </span>
            </h1>
          </a>
          {/* <!-- Right-sided navbar links --> */}
          <div className="w3-right w3-hide-small">
            <NavBarItems
              link={props.link}
              loggedIn={props.loggedIn}
              onLogout={props.onLogout}
            />
          </div>
          {/* <!-- Hide right-floated links on small screens and replace them with a menu icon --> */}
          <a
            href=""
            className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
            onClick={w3_open}
          >
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </div>
      {/* <!-- Sidebar on small screens when clicking the menu icon --> */}
      <nav
        className="w3-sidebar w3-bar-block w3-card w3-animate-left w3-hide-medium w3-hide-large"
        style={{ display: "none" }}
        id="mySidebar"
      >
        <a
          href=""
          onClick={w3_close}
          className="w3-bar-item w3-button w3-large w3-padding-16"
        >
          Close ×
        </a>
        <NavBarItems link={props.link} onLogout={props.onLogout} />
      </nav>
    </div>
  );
}

export default NavBar;
