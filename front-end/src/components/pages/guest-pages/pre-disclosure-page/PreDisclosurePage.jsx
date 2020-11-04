import React from "react";
import Footer from "../../../footer/Footer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import irmaFrontend from "@privacybydesign/irma-frontend";
import NavBar from "../../../nav-bar/NavBar";
import DisclosurePage from "../disclosure-page/DisclosurePage";
import { Trans, withTranslation } from "react-i18next";

const mapStateToProps = (state) => {
  return {
    ...state.DisclosurePage,
  };
};

class PreDisclosurePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "initDisclosurePage",
      id: this.props.match.params.id,
      host: this.props.match.params.host,
    });
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
          language: "nl", // TODO: set language
          session: this.props.irmaSession,
        });
        this._irmaWeb.start().then((result) => {
          // Delay dispatch to make IRMA success animation visible.
          setTimeout(() => {
            this.props.dispatch({ type: "showDisclosurePage", result: result });
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
        <h2>{this.props.t("predisclosure.header")}</h2>
        <p>{this.props.t("predisclosure.p1")}</p>
        <div style={{ height: "30px" }} />
        <section className={"irma-web-center-child"}>
          <section id={"irma-web-form"} />
        </section>
        <div style={{ height: "60px" }} />
        <h4 className="center-content">{this.props.t("predisclosure.noapp")}</h4>
        <p>{this.props.t("predisclosure.p2")}</p>
        <div className="center-content">
          <a href="https://irma.app" className="btn irma-btn-secondary">
            {this.props.t("predisclosure.install")}
          </a>
        </div>
        <p dangerouslySetInnerHTML={{ __html: this.props.t("predisclosure.p3") }}></p>
      </>
    );
  }

  _renderErrorPage(error) {
    return <p>{<Trans i18nKey="predisclosure.error" value={{ error: error }} />}</p>;
  }
  _renderMessagePage(translationKey) {
    return <p>{this.props.t(`predisclosure.${translationKey}`)}</p>;
  }

  _renderState() {
    switch (this.props.state) {
      case "start":
        return this._renderStartPage();
      case "disclosurePage":
        const onNext = () => {
          this.props.dispatch({ type: "sendGuestData" });
        };
        return <DisclosurePage onNext={onNext} host={this.props.host} />;
      case "encrypting":
      case "sending":
      case "done":
        return this._renderMessagePage(this.props.state);
      case "error":
        return <p>`De volgende fout is opgetreden: ${this.props.error}`</p>;
      default:
        return this._renderMessagePage("loading");
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

export default compose(
  withRouter,
  connect(mapStateToProps),
  withTranslation("guest")
)(PreDisclosurePage);
