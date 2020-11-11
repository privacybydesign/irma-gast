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
import SaveIcon from "@material-ui/icons/Save";
import logo from "../../../images/irma_logo.png";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import GuestListButton from "./GuestListButton";
import Button from "@material-ui/core/Button";

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

  _renderButtonText() {
    if (
      this.props.locations === {} ||
      this.props.locations[this.props.id] === undefined
    ) {
      return this.props.t("contacts.default");
    } else {
      let s = this.props.locations[this.props.id].location_state;
      switch (s) {
        case "initialized":
        case "loading":
        case "decrypting":
        case "verifying":
          return this.props.t(`contacts.${s}`);
        default:
          return this.props.t("contacts.default");
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

  _renderDownloadLink() {
    return (
      <PDFDownloadLink
        document={
          <Document>
            <Page wrap style={styles.page} size="A4">
              <View style={styles.section}>
                <Text style={styles.title}>
                  {this.props.title}
                  {`, ${this.props.t("loc")}: `}
                  {this.props.location}
                </Text>
                <Text style={styles.subtitle}>
                  {`${this.props.t("start")}: `}
                  {this.props.date}
                  {`, ${this.props.t("host")}: `}
                  {this.props.host}
                </Text>
                <Image style={styles.image} src={logo} />
                <Text style={styles.text}>
                  {this.props.t("contacts.text1")}
                </Text>
                <View style={styles.spacer}></View>
                <Text style={styles.text}>
                  {this.props.t("contacts.text2")}
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
        fileName={`qrona-${this.props.id}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <GuestListButton
              text={this.props.t("contacts.loadingpdf")}
              icon={<SaveIcon />}
              disabled
            />
          ) : (
            <GuestListButton
              text={this.props.t("contacts.download")}
              icon={<SaveIcon />}
            />
          )
        }
      </PDFDownloadLink>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  withTranslation("host")
)(ContactsPDF);
