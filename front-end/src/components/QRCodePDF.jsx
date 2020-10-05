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
import logo from "../images/irma_logo.png";

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
    margin: 12,
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
    textAlign: "center",
  },
  spacer: {
    height: 20,
  },
  image: {
    height: 400,
    width: 400,
    marginBottom: 30,
    marginHorizontal: "auto",
  },
  small: {
    height: 90,
    width: 100,
    marginBottom: 30,
    marginHorizontal: "auto",
  },
});

function QRCodePDF(props) {
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page wrap style={styles.page} size="A4">
              <View style={styles.section}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.subtitle}>
                  {"Startdatum: "}
                  {props.date}
                  {", "}
                  {props.host}
                </Text>
                <View style={styles.spacer}></View>
                <Text style={styles.text}>
                  Scan deze code met de camera van je mobiel om je aan te
                  melden.
                </Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>
                <Image
                  style={styles.image}
                  src={document
                    .getElementById("qr-" + props.qr)
                    .toDataURL("image/jpg", 0.3)}
                />
                <Text style={styles.text}>
                  Na scan worden je contactgegevens beheerd door: {props.host}.
                </Text>
                <View style={styles.spacer}></View>
                <Text style={styles.text}>
                  Dit is een service van IRMA-welkom.
                </Text>
                <Text style={styles.text}>
                  Bezoek www.irma-welkom.nl voor meer informatie.
                </Text>
                <View style={styles.spacer}></View>
                <Image style={styles.small} src={logo} />
              </View>
            </Page>
          </Document>
        }
        fileName="IRMA-welkom-QR.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Button color="primary" size="large" startIcon={<SaveIcon />}>
              Download QR
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

export default QRCodePDF;
