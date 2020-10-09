import React, { useState } from "react";
import { connect } from "react-redux";
import CreateListForm from "./CreateListForm";
import GuestList from "./GuestList";
import AutoDeleteText from "./AutoDeleteText";
import NavBar from "../../nav-bar/NavBar";
import Footer from "../../footer/Footer";
import irmaFrontend from "@privacybydesign/irma-frontend";

const mapStateToProps = (state) => {
  return {
    ...state.HostPage,
  };
};

class HostPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "initLogin" });
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
          let email = result.disclosed[0].rawValue;
          // Delay dispatch to make IRMA success animation visible.
          setTimeout(() => {
            // Update state with host email
            this.props.dispatch({ type: "loggedIn", email: email });
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

  _addGuestList(newList) {
    // if no name/description has been given, add default name
    if (newList.name === "") {
      newList.name = `${
        newList.type === "permanent" ? "Doorlopende" : "Eenmalige"
      } samenkomst`;
    }

    // Location is something like "Nijmegen" for e.g., Cafe Jos
    newList.location = "some location";
    this.props.dispatch({
      type: "addGuestList",
      name: newList.name,
      location: newList.location,
      onetime: newList.type !== "permanent",
    });
  }

  // TODO: make site scroll to the new list after it has been created

  _deleteGuestList(id) {
    this.props.dispatch({ type: "deleteGuestList", location_id: id });
  }

  _renderGuestLists() {
    return this.props.entries.map((list) => {
      return (
        <GuestList
          key={list["location_id"]}
          onDelete={this._deleteGuestList(list["location_id"])}
          id={list["location_id"]}
          date={list["date"]}
          name={list["name"]}
          listType={list["type"]}
          host="someone@someplace.nl" // TODO replace with actual host
        />
      );
    });
  }

  _renderHostPage() {
    return (
      <div>
        <h2>Je bezoekerslijsten</h2>
        <CreateListForm onAdd={this._addGuestList} />
        {this._renderGuestLists()}
        <AutoDeleteText />
        <div style={{ height: "30px" }}></div>
      </div>
    );
  }

  _renderMessagePage(message) {
    return <p>{message}</p>;
  }

  _renderState() {
    switch (this.props.state) {
      case "loaded":
        return this._renderHostPage();
      case "error":
        return this._renderMessagePage(
          `De volgende fout is opgetreden: ${this.props.error}`
        );
      case "loggedOut":
        return this._renderMessagePage("U bent uitgelogd");
      default:
        return this._renderMessagePage("Een moment geduld...");
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          link="logout"
          onClick={this.props.dispatch({ type: "logOut" })}
        />
        <div className="container">{this._renderState()}</div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HostPage);
