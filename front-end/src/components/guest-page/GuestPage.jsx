import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Instructions from "./Instructions";
import {connect} from 'react-redux';
import irmaFrontend from '@privacybydesign/irma-frontend';

const mapStateToProps = (state) => {
  return {
    ...state.guestPage,
  }
}

class GuestPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({type: 'initGuestPage'});
    this._handleIrma()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._handleIrma();
  }

  _handleIrma() {
    switch (this.props.state) {
      case 'start':
        this._irmaWeb = irmaFrontend.newWeb({
          element: '#irma-web-form',
          language: 'nl',
          session: this.props.irmaSession,
        });
        this._irmaWeb.start()
          .then(result => {
            // Delay dispatch to make IRMA success animation visible.
            setTimeout(() => {
              this.props.dispatch({type: 'sendGuestData', data: result});
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

  startPage() {
    return (
      <>
        <h2>Meld je aan met IRMA</h2>
        <p>
          Meld je aan met je e-mailaddress zodat je in het geval van een
          coronamelding een waarschuwing kunt ontvangen.
        </p>
        <div style={{height: "30px"}}/>
        <section className={'irma-web-center-child'}>
          <section id={'irma-web-form'}/>
        </section>
        <div style={{height: "60px"}}/>
        <Instructions />
      </>
    );
  }

  messagePage(message) {
    // TODO: Make a bit nice.
    return (
      <p>
        {message}
      </p>
    )
  }

  renderState() {
    switch (this.props.state) {
      case 'start':
        return this.startPage();
      case 'encrypting':
        return this.messagePage('Gegevens aan het versleutelen...');
      case 'sending':
        return this.messagePage('Gegevens aan het verzenden...');
      case 'done':
        return this.messagePage('Gegevens verzonden.');
      case 'error':
        return this.messagePage(`De volgende fout is opgetreden:<br>${this.props.error}`)
      default:
        return this.messagePage('Een moment geduld...');
    }
  }

  render() {
    return (
      <div className="App">
        <Header link="login" />
        <div className="content">
          {this.renderState()}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(GuestPage);
