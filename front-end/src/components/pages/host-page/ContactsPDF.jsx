import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import MailIcon from "@material-ui/icons/Mail";
import logo from "../../../images/irma_logo.png";
import { connect } from "react-redux";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 32,
  },
  section: {
    margin: 2,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    margin: 6,
    textAlign: "center",
  },
  organizer: {
    fontSize: 12,
    marginBottom: 40,
  },
  text: {
    fontSize: 12,
    marginLeft: 32,
    marginRight: 32,
    textAlign: "justify",
  },
  spacer: {
    height: 20,
  },
  image: {
    height: 90,
    width: 100,
    marginBottom: 30,
    marginHorizontal: "auto",
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.checkins,
  };
};

class ContactsPDF extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: "initCheckins", location_id: this.props.id });
  }

  render() {
    return this._renderState();
  }

  _renderState() {
    if (
      this.props.locations === {} ||
      this.props.locations[this.props.id] === undefined
    ) {
      return this._renderLoadCheckins();
    } else {
      switch (this.props.locations[this.props.id].location_state) {
        case "done":
          return [this._renderDownloadLink(), this._renderMailLink()];
        default:
          return this._renderLoadCheckins();
      }
    }
  }

  _renderButtonText() {
    if (
      this.props.locations === {} ||
      this.props.locations[this.props.id] === undefined
    ) {
      return "Laden...";
    } else {
      switch (this.props.locations[this.props.id].location_state) {
        case "initialized":
          return "Contactgegevens opvragen";
        case "loading":
          return "Contactgegevens laden...";
        case "decrypting":
          return "Contactgegevens ontsleutelen...";
        case "verifying":
          return "Contactgegevens verifieren...";
        default:
          return "Laden...";
      }
    }
  }

  _renderLoadCheckins() {
    return (
      <Button
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        onClick={() =>
          this.props.dispatch({
            type: "loadCheckins",
            location_id: this.props.id,
          })
        }
      >
        {this._renderButtonText()}
      </Button>
    );
  }

  _renderMailLink() {
    return (
      <Button
        startIcon={<MailIcon />}
        onClick={() => {
          console.log("testoe:", this.props.locations[this.props.id]);
          let addresses = this.props.locations[this.props.id].entries.map(
            (entry) => entry.mail
          );
          console.log("addresses: ", addresses);
          window.location.href = `mailto:?bcc=${addresses}`;
        }}
      >
        Mail
      </Button>
    );
  }

  _renderDownloadLink() {
    return (
      <PDFDownloadLink
        document={
          <Document>
            <Page wrap style={styles.page} size="A4">
              <View style={styles.section}>
                <Text style={styles.title}>
                  {this.props.title}
                  {", locatie: "}
                  {this.props.location}
                </Text>
                <Text style={styles.subtitle}>
                  {"Startdatum: "}
                  {this.props.date}
                  {", host: "}
                  {this.props.host}
                </Text>
                <Image style={styles.image} src={logo} />
                <Text style={styles.text}>
                  Deze gegevens zijn verzameld met IRMA-welkom
                  (www.irma-welkom.nl). Het doel voor het verzamelen van deze
                  contactgegevens is: zonodig waarschuwen bij een besmetting. De
                  gegevens mogen daarom alleen voor dit doel gebruikt worden, en
                  niet voor iets anders, zoals klantbinding of reclame.
                </Text>
                <View style={styles.spacer}></View>
                <Text style={styles.text}>
                  Het is je eigen verantwoordelijkheid als host van deze
                  samenkomst om de aangemelde personen te waarschuwen voor een
                  mogelijke besmetting, of om hun contactgegevens aan de GGD
                  door te geven. Als je zelf een waarschuwingsbericht stuurt is
                  het netjes om de naam van de besmette persoon (de bron) niet
                  te noemen. Bij een doorlopende (niet-eenmalige) samenkomst is
                  het belangrijk om op de datum van aanmelding te letten en
                  alleen die mensen te (laten) waarschuwen die mogelijk besmet
                  zijn geraakt. Vermijd onnodige onrust.
                </Text>
                <View style={styles.spacer}></View>
                {this.props.locations[this.props.id].entries.map(
                  (mail, index) => {
                    return (
                      <View key={index}>
                        <Text style={styles.text}>
                          {mail.date}, {mail.time}: {mail.mail}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>
            </Page>
          </Document>
        }
        fileName={`irma-welkom-${this.props.id}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Button color="primary" size="large" startIcon={<SaveIcon />}>
              Contactgegevens downloaden
            </Button>
          )
        }
      </PDFDownloadLink>
    );
  }
}

export default connect(mapStateToProps)(ContactsPDF);
