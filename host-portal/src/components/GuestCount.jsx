import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function GuestCount(props) {
  return (
    <CardContent className={props.className}>
      <Typography variant="h5" component="p">
        Aanmeldingen
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body1" component="span">
        Er hebben zich{" "}
        {props.listType === "permanent"
          ? "binnen de afgelopen twee weken "
          : "tot nu toe "}
      </Typography>
      <Typography variant="caption" component="span">
        {props.count > 0 ? props.count + " " : "geen "}
      </Typography>
      <Typography variant="body1" component="span">
        bezoekers op deze lijst geregistreerd.
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body2" color="textSecondary" component="p">
        {props.count > 0 &&
          "De contactgegevens van de aangemelde bezoekers zijn versleuteld. Als er een besmette persoon aanwezig was kun je de contactgevens van de aangemelde bezoekers ontsleutelen en downloaden. Kies daarvoor 'contactgegevens opvragen'. Je wordt dan gevraagd je e-mailadres nog een keer met je IRMA app te tonen."}
      </Typography>
    </CardContent>
  );
}

export default GuestCount;
