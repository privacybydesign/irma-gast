import React from "react";

function NavBarItems(props) {
  return (
    <div>
      <a href="#about" className="w3-bar-item">
        Features
      </a>
      <a href="#hoe" className="w3-bar-item">
        Hoe werkt het
      </a>
      <a href="#start" className="w3-bar-item">
        Van start
      </a>
      <a href="/host" className="w3-bar-item">
        Host login <i className="fa fa-sign-in"></i>
      </a>
    </div>
  );
}

export default NavBarItems;
