import React from "react";
import Footer from "../../../footer/Footer";
import { connect } from "react-redux";
import irmaFrontend from "@privacybydesign/irma-frontend";
import NavBar from "../../../nav-bar/NavBar";

const mapStateToProps = (state) => {
  return {
    ...state.DisclosurePage,
  };
};

class PreDisclosurePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "initDisclosurePage" });
    this._handleIrma();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._handleIrma();
  }

  componentWillUnmount() {
    if (this._irmaWeb) {
      this._irmaWeb.abort();
    }
  }

  _handleIrma() {
    switch (this.props.state) {
      case "start":
        this._irmaWeb = irmaFrontend.newWeb({
          element: "#irma-web-form",
          language: "nl",
          session: this.props.irmaSession,
        });
        this._irmaWeb.start().then((result) => {
          // Delay dispatch to make IRMA success animation visible.
          setTimeout(() => {
            this.props.dispatch({ type: "sendGuestData", data: result });
          }, 1000);
        });
        return;
      default:
        if (this._irmaWeb) {
          this._irmaWeb.abort();
        }
        return;
    }
  }

  _renderStartPage() {
    return (
      <>
        <h2>Meld je aan</h2>
        <p>
          Wil je je aanmelden? Ga dan door met IRMA en geef je e-mailadres door
          aan IRMA-welkom.
        </p>
        <div style={{ height: "30px" }} />
        <section className={"irma-web-center-child"}>
          <section id={"irma-web-form"} />
        </section>
        <div style={{ height: "60px" }} />
        <h4 className="center-content">Nog geen IRMA-app?</h4>
        <p>
          IRMA-welkom werkt met de gratis IRMA-app. In deze app verzamel je
          persoonsgegevens in de vorm van kaartjes waarmee je jezelf bekend kan
          maken. Voor IRMA-welkom is alleen je e-mail kaartje nodig.
        </p>
        <div className="center-content">
          <a href="https://irma.app" className="btn irma-btn-secondary">
            Installeer IRMA
          </a>
        </div>
        <p>
          {" "}
          Voeg vervolgens een kaartje toe met je e-mailadres. Dit kan via de
          IRMA-app of via{" "}
          <a href="https://sidnemailissuer.irmaconnect.nl/uitgifte/email">
            deze pagina.
          </a>
        </p>
      </>
    );
  }

  _renderMessagePage(message) {
    // TODO: Make a bit nice.
    return <p>{message}</p>;
  }

  _renderState() {
    switch (this.props.state) {
      case "start":
        return this._renderStartPage();
      case "encrypting":
        return this._renderMessagePage("Gegevens aan het versleutelen...");
      case "sending":
        return this._renderMessagePage("Gegevens aan het verzenden...");
      case "done":
        return this._renderMessagePage("Gegevens verzonden.");
      case "error":
        return this._renderMessagePage(
          `De volgende fout is opgetreden: ${this.props.error}`
        );
      default:
        return this._renderMessagePage("Een moment geduld...");
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar link="menu" />
        <div className="content">{this._renderState()}</div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PreDisclosurePage);
