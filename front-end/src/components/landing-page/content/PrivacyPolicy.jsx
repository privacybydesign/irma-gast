import React from "react";

function PrivacyPolicy(props) {
  return (
    <div className="content">
      <h2>Privacy policy</h2>

      <p>
        De IRMA-welkom dienst wordt in samenwerking tussen het bedrijf ProcoliX,
        de stichting Privacy by Design, en de Radboud Universiteit Nijmegen
        (i.h.b. de onderzoeksafdeling iHub), aangeboden. Deze drie partijen zijn
        gezamenlijk verantwoordelijk voor de gegevensverwerking en verwerken
        ieder een deel van de gegevens, zoals hieronder in meer detail
        beschreven. De IRMA-welkom dienst wordt door deze partijen gratis
        aangeboden, vanuit de eigen maatschappelijke verantwoordelijkheid, als
        bijdrage aan de bestrijding van het Corona virus. Alleen noodzakelijke
        gegevens worden voor dit doel verwerkt, zoals hieronder nader
        omschreven, en worden niet met derden gedeeld of verkocht. De software
        die gebruikt wordt voor IRMA-welkom, en ook voor de IRMA-app, is open
        source en is dus voor iedereen toegankelijk.
      </p>

      <div className="subheading">Host, account en samenkomsten</div>

      <p>
        Een <emph>host</emph> is een persoon die een keer ingelogd is op de
        website irma-welkom.nl door zich daar bekend te maken met een
        e-mailadres uit de eigen IRMA app. Hierbij worden alleen door ProcoliX
        gegevens verwerkt, waaronder het e-mailadres van de host. De wettelijke
        basis voor deze verwerking is: toestemming van de host.
      </p>

      <p>
        Indien het gebruikte e-mailadres nog niet bekend is, wordt door ProcoliX
        impliciet een account aangemaakt voor dit adres. Indien op een account
        meer dan 14 dagen geen activiteit heeft plaatsgevonden worden alle
        bijbehorende gegevens verwijderd.
      </p>

      <p>
        Binnen dit account kan een host een of meerdere "samenkomsten"
        (eenmalige bijeenkomsten, of plaatsen waar mensen bijeenkomen) aanmaken
        door een nieuwe (passende) naam te kiezen voor zo'n samenkomst.
        Vervolgens wordt voor deze samenkomst een QR-code aangemaakt, die de
        host kan afdrukken of downloaden. Deze QR-code bevat in leesbare vorm de
        naam van de samenkomst, het e-mailadres van de host en de aanmaakdatum.
        Impliciet in de QR-code staat een verwijzing naar een webpagina waar
        bezoekers een eigen e-mailadres kunnen onthullen, via hun IRMA app.
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
          De hierbovengenoemde drie organisaties achter de website
          irma-welkom.nl de persoonsgegevens die via deze QR-code verzameld
          worden in zijn/haar opdracht verwerken. Daarmee is de host
          verwerkingsverantwoordelijke voor deze specifieke samenkomst.
        </li>
      </ul>

      <p>
        De e-mailadressen van de bezoekers van de samenkomst worden door
        ProcoliX versleuteld opgeslagen. Het<emph>tijdstip</emph>van toevoeging
        van een versleuteld e-mailadres wordt onversleuteld opgeslagen. Dit
        tijdstip wordt gebruikt om versleutelde e-mailadressen na 14 dagen
        automatisch te verwijderen. Wanneer alle versleutelde e-mailadressen van
        een samenkomst verwijderd zijn wordt de samenkomst zelf verwijderd uit
        het account van de host.
      </p>

      <div className="subheading">Bezoekers, bekendmaking en versleuteling</div>

      <p>
        De host zal<emph>bezoekers</emph>aan zijn/haar samenkomst verzoeken de
        bijbehorende QR-code te scannen. Daarbij komt een bezoeker eerst terecht
        op een website waar informatie beschikbaar is, grotendeels via links,
        over IRMA-welkom en over de privacy policy. Vervolgens kan de bezoeker
        via een knop het proces starten om via de IRMA app een eigen e-mailadres
        te onthullen. De wettelijke basis voor de gegevensverwerking die daarmee
        van start gaat is: toestemming van de bezoeker.
      </p>

      <p>
        De IRMA server waaraan de bezoeker een eigen e-mailadres onthult wordt
        beheerd door de Radboud Universiteit. Daarmee is de universiteit
        verwerker van alle onthulde e-mailadressen van bezoekers. Deze
        verwerking vindt slechts kortstondig plaats: het e-mailadres van de
        bezoeker wordt, samen met een publieke sleutel (afgeleid van de e-mail
        van de host) teruggegeven aan de webpagina waarvan de bezoeker afkomstig
        is (via de genoemde knop). Het e-mailadres van de bezoeker wordt daarna
        direct verwijderd door de IRMA server bij de Radboud Universiteit. In
        het bijzonder houdt de universiteit geen log bij van e-mailadressen van
        bezoekers.
      </p>

      <p>
        Op deze webpagina wordt het ontvangen e-mailadres versleuteld en
        vervolgens toegevoegd aan de bezoekerslijst van de samenkomst, die door
        ProcoliX bijgehouden wordt. ProcoliX verwerkt aldus de e-mailadressen
        van alle hosts, maar niet van bezoekers. Voor de IRMA server op de
        Radboud Universiteit is dit andersom: wel van bezoekers maar niet van
        hosts. De versleuteling is<emph>identity-based</emph>: uit het
        e-mailadres van de host wordt een public key afgeleid die gebruikt wordt
        voor de versleuteling van de gegevens voor de samenkomst(en) van de
        host. De versleuteling vindt plaats in de browser van de bezoeker (en
        niet bij ProcoliX).
      </p>

      <div className="subheading">Hosts en ontsleuteling</div>

      <p>
        Wanneer een host inlogt op het eigen account op irma-welkom.nl zijn daar
        alle aangemaakte (en nog niet verwijderde) samenkomsten zichtbaar. De
        host kan de e-mailadressen ontsleutelen, zoals bedoeld in het geval dat
        de host weet heeft van de aanwezigheid van een besmette persoon op een
        bepaalde samenkomst op een bepaald tijdstip. Voor het gebruik van de
        verzamelde e-mailadressen voor andere doeleinden is de host zelf
        aansprakelijk. In het bijzonder zijn de drie partijen achter IRMA-welkom
        hiervoor niet aansprakelijk.
      </p>

      <p>
        Voor die ontsleuteling toont de host via de IRMA app nogmaals het
        e-mailadres van het eigen account, maar nu aan aparte een{" "}
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
        In theorie kunnen gegevens ook ontsleuteld worden wanneer de drie
        partijen achter IRMA-welkom samenspannen en de gegevens die zij voor
        IRMA-welkom apart bewerken combineren. Deze partijen zullen niet zo
        samenspannen. Zij hebben de zaken juist technisch en organisatorisch zo
        uit elkaar getrokken dat niemand van hen een totaalbeeld heeft.
      </p>

      <div className="subheading">Algemene bepalingen</div>

      <p>
        Statistische informatie over het gebruik van IRMA-welkom (aantallen
        hosts, samenkomsten, deelnemers per dag/week/maand/jaar, herkomst enz.)
        kan geaggregeerd worden door ProcoliX en kan door ProcoliX, de stichting
        Privacy by Design en door de Radboud Universteit gebruikt worden voor
        documentatie en presentaties. Zonodig kunnen IRMA-welkom gegevens ook
        gebruikt worden voor technische doeleinden, zoals onderhoud en
        optimalisatie, maar worden ze verwijderd na maximaal twee dagen.
      </p>

      <p>
        Technische veranderingen in het IRMA-welkom systeem, of eventuele nieuwe
        diensten, kunnen leiden tot een aanpassing van deze privacy policy.
        ProcoliX, de stichting Privacy by Design en de Radboud Universiteit
        behouden zich het recht voor om dergelijke wijzigingen door te voeren en
        zullen de nieuwe privacy policy zo snel mogelijk via deze pagina bekend
        maken.
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
