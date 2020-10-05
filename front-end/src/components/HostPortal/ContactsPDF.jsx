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
import logo from "../../images/irma_logo.png";

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

// TODO: replace mockdata with the decrypted data from the actual list
const mockdata = [
  {
    mail: "name@lastname.com",
    date: "2020-08-03",
    time: "13:10",
  },
  {
    mail: "mail@email.com",
    date: "2020-08-04",
    time: "15:10",
  },
  {
    mail: "me@lastname.com",
    date: "2020-08-04",
    time: "17:10",
  },
  {
    mail: "someone@somewhere.org",
    date: "2020-08-05",
    time: "13:10",
  },
  {
    mail: "hello@world.com",
    date: "2020-08-07",
    time: "18:10",
  },
];

function ContactsPDF(props) {
  return (
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
                mogelijke besmetting, of om hun contactgegevens aan de GGD door
                te geven. Als je zelf een waarschuwingsbericht stuurt is het
                netjes om de naam van de besmette persoon (de bron) niet te
                noemen. Bij een doorlopende (niet-eenmalige) samenkomst is het
                belangrijk om op de datum van aanmelding te letten en alleen die
                mensen te (laten) waarschuwen die mogelijk besmet zijn geraakt.
              </Text>
              <View style={styles.spacer}></View>
              {mockdata.map((mail, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.text}>
                      {mail.date}, {mail.time}: {mail.mail}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Page>
        </Document>
      }
      fileName="IRMA-welkom.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <Button color="primary" size="large" startIcon={<SaveIcon />}>
            Contactgegevens opvragen
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}

export default ContactsPDF;
