import React from "react";

function Explanation(props) {
  return (
    <div className="content" id="start">
      <h2>Van start met IRMA-welkom</h2>

      <p>
        Zowel een host die een samenkomst aanmaakt als ook bezoekers die zich
        aanmeldt heeft de IRMA-app nodig. In de IRMA-app verzamel je
        persoonlijke gegevens van jezelf, in de vorm van kaartjes.
      </p>
      <ul className="check">
        <li>
          Download de IRMA-app uit de appstore (van{" "}
          <a href="https://play.google.com/store/apps/details?id=org.irmacard.cardemu">
            Google
          </a>{" "}
          of{" "}
          <a href="https://apps.apple.com/nl/app/irma-authenticatie/id1294092994">
            Apple
          </a>
          ).
        </li>
        <li>
          Voeg een kaartje toe met je e-mailadres, via{" "}
          <a href="https://privacybydesign.foundation/uitgifte/email/">
            deze pagina
          </a>
          . Je kunt ook meer kaartjes toevoegen, maar die zijn niet nodig voor
          IRMA-welkom.
        </li>
        <li>
          Met dit e-mail kaartje in de IRMA-app kan een host een samenkomst
          aanmaken en beheren op het <a href="">IRMA-welkom portaal</a>. Een
          bezoeker meldt zich met dit e-mail kaartje aan, via het scannen van
          een QR-code bij een samenkomst.
        </li>
      </ul>
    </div>
  );
}

export default Explanation;
