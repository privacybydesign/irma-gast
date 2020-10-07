import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import test from "../../../../images/getReady.png";
import font from "../../../../fonts/Montserrat/Montserrat-Regular.ttf";
import fontBold from "../../../../fonts/Montserrat/Montserrat-Bold.ttf";
import fontSemiBold from "../../../../fonts/Montserrat/Montserrat-SemiBold.ttf";

// Register font
Font.register({
  family: "Montserrat",
  src: font,
});

// Register font
Font.register({
  family: "Montserrat Bold",
  src: fontBold,
});

// Register font
Font.register({
  family: "Montserrat SemiBold",
  src: fontSemiBold,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 24,
    fontFamily: "Montserrat",
  },
  section: {
    margin: 2,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginLeft: 24,
    textAlign: "center",
    fontFamily: "Montserrat SemiBold",
  },
  subtitle: {
    fontSize: 13,
    marginLeft: 24,
    textAlign: "center",
  },
  organizer: {
    fontSize: 12,
    marginBottom: 40,
  },
  text: {
    fontSize: 11,
    marginLeft: 24,
    marginRight: 24,
    textAlign: "center",
  },
  bolder: {
    fontSize: 11,
    marginLeft: 24,
    marginRight: 24,
    textAlign: "center",
    fontFamily: "Montserrat SemiBold",
  },
  item: {
    fontSize: 12,
    marginLeft: 32,
    marginRight: 32,
    textAlign: "left",
  },
  spacer: {
    height: 4,
  },
  image: {
    height: 180,
    width: 180,
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  small: {
    height: 45,
    width: 50,
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  fullwidth: {
    marginLeft: 0,
    marginTop: 0,
    width: 550,
    height: "auto",
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
                  {", host: "}
                  {props.host}
                </Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>
                <Image
                  style={styles.image}
                  src={document
                    .getElementById("qr-" + props.qr)
                    .toDataURL("image/jpg", 0.3)}
                />
                <View style={styles.spacer}></View>
                <Text style={styles.bolder}>
                  Scan de QR code met de IRMA-app om je aan te melden
                </Text>
                <View style={styles.spacer}></View>
                <Text style={styles.text}>
                  Na aanmelding worden je contactgegevens beheerd door de host:{" "}
                  {props.host}. Neem bij vragen contact op met deze host.
                </Text>
                <Image style={styles.fullwidth} src={test} />
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
