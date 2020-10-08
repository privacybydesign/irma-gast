import React from "react";
import Footer from "../../footer/Footer";
import { connect } from "react-redux";
import irmaFrontend from "@privacybydesign/irma-frontend";
import NavBar from "../../nav-bar/NavBar";

const mapStateToProps = (state) => {
  return {
    ...state.guestPage,
  };
};

class GuestPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "initGuestPage" });
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
          Wil je je e-mailaddress achterlaten bij <b>{this.props.host}</b> ? Je
          kan dan in het geval van een coronamelding een waarschuwing ontvangen.
          Je e-mailadres wordt beveiligd (versleuteld) opgeslagen en na twee
          weken automatisch weggegooid. Alleen {this.props.host} kan je
          e-mailadres ontsleutelen.
        </p>
        <h4 className="center-content">Laat je e-mailadres achter</h4>
        <div style={{ height: "30px" }} />
        <section className={"irma-web-center-child"}>
          <section id={"irma-web-form"} />
        </section>
        <div style={{ height: "60px" }} />
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
          `De volgende fout is opgetreden:<br>${this.props.error}`
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

export default connect(mapStateToProps)(GuestPage);
