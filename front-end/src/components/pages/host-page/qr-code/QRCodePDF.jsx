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
import scan from "../../../../images/scan.png";
import logo from "../../../../images/irma_logo.png";
import font from "../../../../fonts/Montserrat/Montserrat-Regular.ttf";
import fontBold from "../../../../fonts/Montserrat/Montserrat-Bold.ttf";
import fontSemiBold from "../../../../fonts/Montserrat/Montserrat-SemiBold.ttf";
import { Trans, withTranslation } from "react-i18next";

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
  smallText: {
    fontSize: 9,
    marginLeft: 38,
    marginRight: 38,
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
    height: 400,
    width: 400,
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  small: {
    height: 45,
    width: "auto",
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  scan: {
    height: 150,
    width: "auto",
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

function QRCodePDF({ t, title, location, date, host, qr }) {
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page wrap style={styles.page} size="A4">
              <View style={styles.section}>
                <View style={styles.spacer}></View>
                <Text style={styles.title}>
                  {title}
                  {`, ${t("qr.loc")}: `}
                  {location}
                </Text>
                <Text style={styles.subtitle}>
                  {`${t("qr.start")}: `}
                  {date}
                  {`, ${t("qr.host")}: `}
                  {host}
                </Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>
                <Image
                  style={styles.image}
                  src={document
                    .getElementById("qr-" + qr)
                    .toDataURL("image/jpg", 0.3)}
                />
                <View style={styles.spacer}></View>

                <Text style={styles.bolder}>{t("qr.scan")}</Text>
                <Text style={styles.smallText}>{t("qr.scaninfo1")}</Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>

                <Image style={styles.scan} src={scan} />

                <Text style={styles.text}>
                  <Trans i18nKey="host.qr.scaninfo2" values={{ host: host }} />
                </Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>

                <Text style={styles.text}>{t("qr.scaninfo3")}</Text>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>

                <Image style={styles.small} src={logo} />

                {/* <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>

                <Image style={styles.fullwidth} src={instructions} />
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View>
                <View style={styles.spacer}></View> */}
              </View>
            </Page>
          </Document>
        }
        fileName="IRMA-welkom-QR.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            t("qr.loading")
          ) : (
            <Button color="primary" size="large" startIcon={<SaveIcon />}>
              {t("qr.download")}
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

export default withTranslation("host")(QRCodePDF);
