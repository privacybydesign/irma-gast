import React from "react";
import { connect } from "react-redux";
import CreateListForm from "./CreateListForm";
import GuestList from "./GuestList";
import AutoDeleteText from "./AutoDeleteText";
import NavBar from "../../nav-bar/NavBar";
import Footer from "../../footer/Footer";
import irmaFrontend from "@privacybydesign/irma-frontend";

const mapStateToProps = (state) => {
  return {
    ...state.guestLists,
  };
};

class HostPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "initHostPage" });
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
        this._irmaWeb.start().then(() => {
          // Delay dispatch to make IRMA success animation visible.
          setTimeout(() => {
            this.props.dispatch({ type: "loadGuestLists" });
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

  // TODO: make site scroll to the new list after it has been created
  _addGuestList(newList) {
    // if no name/description has been given, add default name
    if (newList.name === "") {
      newList.name = `${
        newList.type === "permanent" ? "Doorlopende" : "Eenmalige"
      } samenkomst`;
    }

    this.props.dispatch({
      type: "addGuestList",
      name: newList.name,
      location: newList.location,
      onetime: newList.type === "event",
    });
  }

  _renderGuestLists() {
    return this.props.entries.map((list) => {
      let id = list["location_id"];
      return (
        <GuestList
          key={id}
          id={id}
          location={list["location"]}
          date={list["creation_date"]}
          name={list["name"]}
          listType={list["type"]}
          host={this.props.email}
          count={list["guest_count"]}
          onDelete={() =>
            this.props.dispatch({ type: "deleteGuestList", location_id: id })
          }
        />
      );
    });
  }

  _renderHostPage() {
    return (
      <div>
        <h2>Je bezoekerslijsten</h2>
        <CreateListForm onAdd={(guestList) => this._addGuestList(guestList)} />
        {this._renderGuestLists()}
        <AutoDeleteText />
        <div style={{ height: "30px" }}></div>
      </div>
    );
  }

  _renderMessagePage(message) {
    return <p>{message}</p>;
  }

  // Copied from PreDisclosurePage
  // TODO: can save code duplication
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

  _renderState() {
    switch (this.props.state) {
      case "loaded":
        return this._renderHostPage();
      case "error":
        return this._renderMessagePage(
          `De volgende fout is opgetreden: ${this.props.error}`
        );
      default:
        return this._renderStartPage();
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          loggedIn={this.props.loggedIn}
          link="logout"
          onLogout={() => {
            this.props.dispatch({ type: "logOut" });
          }}
        />
        <div className="content">{this._renderState()}</div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HostPage);
