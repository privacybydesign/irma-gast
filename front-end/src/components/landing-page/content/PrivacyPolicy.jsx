import React from "react";
import policy from "../../../images/policy.png";

function PrivacyPolicy(props) {
  return (
    <div className="content" id="privacypolicy">
      <h2>Privacy policy</h2>
      <p>
        {" "}
        IRMA-welkom en de IRMA app zijn gratis en werken transparant, met open
        source software; gegevens van gebruikers worden niet voor andere
        doeleinden gebruikt en niet aan anderen doorgegeven of doorverkocht.
      </p>
      <div className="small-img-container">
        <img className="small-img" src={policy} alt="Policy illustration" />
      </div>
      <p>
        De IRMA-welkom dienst wordt aangeboden door de stichting
        <a href="https://privacybydesign.foundation/">Privacy by Design</a>
        en het bedrijf <a href="https://www.procolix.com/">ProcoliX</a>. De
        stichting is verwerkingsverantwoordelijke. De stichting en ProcoliX
        verwerken samen ieder een deel van de gegevens, zoals hieronder in meer
        detail beschreven. De IRMA-welkom dienst wordt door deze twee partijen
        gratis aangeboden, vanuit de eigen maatschappelijke
        verantwoordelijkheid, met bestrijding van het Coronavirus als enige
        doel. Alleen daarvoor noodzakelijke gegevens worden verwerkt, zoals
        hieronder nader omschreven. Deze gegevens worden niet met derden gedeeld
        of verkocht. De software die gebruikt wordt voor IRMA-welkom, en ook
        voor de IRMA-app, is open source en is dus voor iedereen toegankelijk
        (via Github).
      </p>

      <div className="subheading">Host, account en samenkomsten</div>

      <p>
        Een <emph>host</emph> is een persoon die een keer ingelogd is op het
        IRMA-welkom portaal door zich daar bekend te maken met een e-mailadres
        uit de eigen IRMA app. Hierbij worden alleen door ProcoliX gegevens
        verwerkt, waaronder het e-mailadres van de host. De wettelijke basis
        voor deze verwerking is: toestemming van de host zelf.
      </p>

      <p>
        Indien het gebruikte e-mailadres nog niet bekend is, wordt door ProcoliX
        impliciet een account aangemaakt voor dit adres. Indien op een account
        meer dan 14 dagen geen activiteit heeft plaatsgevonden worden alle
        bijbehorende gegevens verwijderd.
      </p>

      <p>
        Binnen dit account kan een host een of meerdere "samenkomsten"
        (eenmalige or doorlopende bijeenkomsten waar mensen samenkomen) aanmaken
        door een nieuwe (passende) naam te kiezen voor zo'n samenkomst.
        Vervolgens wordt voor deze samenkomst een QR-code aangemaakt, die de
        host kan downloaden (en afdrukken of opnemen in een presentatie). Deze
        QR-code bevat in leesbare vorm de naam van de samenkomst en het
        e-mailadres van de host. Impliciet in de QR-code staat een verwijzing
        naar een webpagina waar bezoekers zich kunnen aanmelden door een eigen
        e-mailadres te onthullen, via hun IRMA app.
      </p>

      <p>
        Het is de eigen verantwoordelijkheid van de host om deze QR-code
        (alleen) aan de deelnemers/bezoekers van de samenkomst bekend te maken.
        Voorafgaand aan de productie van deze QR-code verklaart de host
        explicit, via een vinkje, dat:
      </p>

      <ul>
        <li>
          De persoonsgegevens (met name e-mailadressen van bezoekers) die via de
          QR-code verzameld worden door hem/haar enkel gebruikt zullen worden om
          deze bezoekers te informeren, mogelijk via de GGD, enkel in het geval
          dat er sprake is van een coronabesmetting die gerelateerd is aan de
          betreffende samenkomst.
        </li>

        <li>
          De hierbovengenoemde twee organisaties achter IRMA-welkom de
          persoonsgegevens die via deze QR-code verzameld worden in zijn/haar
          opdracht verwerken. Daarmee is de host verwerkingsverantwoordelijke
          voor deze specifieke samenkomst.
        </li>
      </ul>

      <p>
        De e-mailadressen van de bezoekers van de samenkomst worden door
        ProcoliX versleuteld opgeslagen. Het<emph>tijdstip</emph>van toevoeging
        van een versleuteld e-mailadres wordt onversleuteld opgeslagen. Dit
        tijdstip wordt gebruikt om versleutelde e-mailadressen na 14 dagen
        automatisch te verwijderen. Wanneer alle versleutelde e-mailadressen van
        een samenkomst verwijderd zijn wordt de samenkomst zelf ook verwijderd
        uit het account van de host.
      </p>

      <div className="subheading">Bezoekers, bekendmaking en versleuteling</div>

      <p>
        De host zal<emph>bezoekers</emph>aan zijn/haar samenkomst verzoeken de
        bijbehorende QR-code te scannen. Daarbij komt een bezoeker eerst terecht
        op een website waar informatie beschikbaar is, grotendeels via links,
        over IRMA-welkom en over de privacy policy. Vervolgens kan de bezoeker
        via een knop het proces starten om via de IRMA app een eigen e-mailadres
        te onthullen. De wettelijke basis voor de gegevensverwerking die daarmee
        van start gaat is: toestemming van de bezoeker zelf.
      </p>

      <p>
        De IRMA server waaraan de bezoeker een eigen e-mailadres onthult wordt
        beheerd door de stichting Privacy by Design. Daarmee is de stichting
        verwerker van alle onthulde e-mailadressen van bezoekers. Deze
        verwerking vindt slechts kortstondig plaats: het e-mailadres van de
        bezoeker wordt, samen met een publieke sleutel (afgeleid van de e-mail
        van de host) teruggegeven aan de webpagina waarvan de bezoeker afkomstig
        is (via de genoemde knop). Het e-mailadres van de bezoeker wordt daarna
        direct verwijderd door de IRMA server bij de stichting. In het bijzonder
        houdt de stichting geen log bij van e-mailadressen van bezoekers.
      </p>

      <p>
        Op deze webpagina wordt het ontvangen e-mailadres versleuteld en
        vervolgens toegevoegd aan de bezoekerslijst van de samenkomst, die door
        ProcoliX bijgehouden wordt. ProcoliX verwerkt aldus de e-mailadressen
        van alle hosts, maar niet van bezoekers. Voor de IRMA server van de
        stichting Privacy by Design is dit andersom: wel van bezoekers maar niet
        van hosts. De versleuteling is<emph>identity-based</emph>: uit het
        e-mailadres van de host wordt een public key afgeleid die gebruikt wordt
        voor de versleuteling van de gegevens voor de samenkomst(en) van de
        host. De versleuteling vindt plaats in de browser van de bezoeker (en
        niet bij ProcoliX).
      </p>

      <div className="subheading">Hosts en ontsleuteling</div>

      <p>
        Wanneer een host inlogt op het eigen account op het IRMA-welkom portaal
        zijn daar alle aangemaakte (en nog niet verwijderde) samenkomsten
        zichtbaar voor de host. De host kan per samenkomst de verzamelde
        e-mailadressen ontsleutelen, zoals bedoeld in het geval dat de host weet
        heeft van de aanwezigheid van een besmette persoon op een bepaalde
        samenkomst op een bepaald tijdstip. Voor het (onbedoelde) gebruik van de
        verzamelde e-mailadressen voor andere doeleinden is de host zelf
        aansprakelijk. In het bijzonder zijn de twee partijen achter IRMA-welkom
        hiervoor niet verantwoordelijk of aansprakelijk.
      </p>

      <p>
        Voor die ontsleuteling toont de host via de IRMA app nogmaals het
        e-mailadres van het eigen account, maar nu aan
        <emph>key generating server</emph>, die beheerd wordt door de stichting
        Privacy by Design. De stichting verwerkt daarbij kortstondig het
        e-mailadres van de host, op basis van diens toestemming. De genoemde
        server levert de private sleutel horend bij het e-mailadres van de host,
        waarmee de e-mailadressen in de webbrowser van de host ontsleuteld
        worden. Vervolgens is het de verantwoordelijkheid van de host om de
        betrokkenen (per e-mail) zelf te waarschuwen, of om deze e-mailadressen
        door te geven aan de GGD.
      </p>

      <p>
        In theorie kunnen gegevens ook ontsleuteld worden wanneer de twee
        partijen achter IRMA-welkom samenspannen en de gegevens die zij voor
        IRMA-welkom apart bewerken combineren. Deze partijen zullen niet zo
        samenspannen. Zij hebben de zaken juist technisch en organisatorisch zo
        uit elkaar getrokken dat niemand van hen een totaalbeeld heeft.
      </p>

      <div className="subheading">Algemene bepalingen</div>

      <p>
        Statistische informatie over het gebruik van IRMA-welkom (aantallen
        hosts, samenkomsten, deelnemers per dag/week/maand/jaar, herkomst enz.)
        kan geaggregeerd worden door ProcoliX en kan door ProcoliX en door de
        stichting Privacy by Design gebruikt worden voor documentatie en
        presentaties. Zonodig kunnen IRMA-welkom gegevens ook gebruikt worden
        voor technische doeleinden, zoals onderhoud en optimalisatie, maar
        worden ze verwijderd na maximaal twee dagen.
      </p>

      <p>
        Technische veranderingen in het IRMA-welkom systeem, of eventuele nieuwe
        diensten, kunnen leiden tot een aanpassing van deze privacy policy. De
        stichting Privacy by Design en ProcoliX behouden zich het recht voor om
        dergelijke wijzigingen door te voeren en zullen de nieuwe privacy policy
        zo snel mogelijk via deze pagina bekend maken.
      </p>

      <p>
        Voor eventuele vragen, opmerkingen, of klachten over deze verwerkingen
        ten behoeve van IRMA-welkom kan contact opgenomen worden op
        info@irma-welkom.nl. Voor klachten over de verwerking van
        persoonsgegevens kan ook contact opgenomen worden met de Autoriteit
        Persoonsgegevens.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
