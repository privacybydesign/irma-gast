import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CreateListForm from "./CreateListForm";
import GuestList from "./GuestList";
import AutoDeleteText from "./AutoDeleteText";
import NavBar from "../../nav-bar/NavBar";
import Footer from "../../footer/Footer";
import irmaFrontend from "@privacybydesign/irma-frontend";
import { Trans, withTranslation } from "react-i18next";
import LoginPage from "../login-page/LoginPage";

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
        newList.type === "permanent"
          ? this.props.t("permanent")
          : this.props.t("onetime")
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
        <h2>{this.props.t("header")}</h2>
        <CreateListForm onAdd={(guestList) => this._addGuestList(guestList)} />
        {this._renderGuestLists()}
        <AutoDeleteText />
        <div style={{ height: "30px" }}></div>
      </div>
    );
  }

  _renderState() {
    switch (this.props.state) {
      case "loaded":
        return this._renderHostPage();
      case "error":
        return (
          <Trans
            t={this.props.t}
            i18nKey="error"
            values={{ error: this.props.error }}
            components={[<p></p>]}
          />
        );
      default:
        return <LoginPage />;
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
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

export default compose(connect(mapStateToProps), withTranslation())(HostPage);
