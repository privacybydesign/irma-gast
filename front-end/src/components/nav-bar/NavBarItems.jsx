import React from "react";

function NavBarItems(props) {
  return (
    <div>
      <a href="#who" className="w3-bar-item">
        Voor wie?
      </a>
      {/* <a href="#why" className="w3-bar-item">
        Waarom?
      </a> */}
      <a href="#how" className="w3-bar-item">
        Hoe werkt het?
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
