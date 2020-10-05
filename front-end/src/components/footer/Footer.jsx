import React from "react";
import FooterContent from "./FooterContent";

function Footer(props) {
  return (
    <div className="irma-blue">
      {/* Footer content is included twice as a workaround to dynamically create the exact space needed for the footer. */}
      <FooterContent />
      <footer>
        <FooterContent />
      </footer>
    </div>
  );
}

export default Footer;
