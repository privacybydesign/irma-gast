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
import logo from "../../../images/qrona_logo_big.png";
import { withTranslation } from "react-i18next";
import GuestListButton from "./GuestListButton";

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
    height: 70,
    width: "auto",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
});

const ContactsPDF = (props) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page wrap style={styles.page} size="A4">
            <View style={styles.section}>
              <Text style={styles.title}>
                {props.title}
                {`, ${props.t("loc")}: `}
                {props.location}
              </Text>
              <Text style={styles.subtitle}>
                {`${props.t("start")}: `}
                {props.date}
                {`, ${props.t("host")}: `}
                {props.host}
              </Text>
              <Image style={styles.image} src={logo} />
              <Text style={styles.text}>{props.t("contacts.text1")}</Text>
              <View style={styles.spacer}></View>
              <Text style={styles.text}>{props.t("contacts.text2")}</Text>
              <View style={styles.spacer}></View>
              {props.entries.map(
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
      fileName={`qrona-${props.id}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <GuestListButton
            text={props.t("contacts.loadingpdf")}
            icon={<SaveIcon />}
            disabled
          />
        ) : (
          <GuestListButton
            text={props.t("contacts.actiondownload")}
            icon={<SaveIcon />}
          />
        )
      }
    </PDFDownloadLink>
  );
};

export default withTranslation("host")(ContactsPDF);
