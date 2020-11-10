import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withTranslation } from "react-i18next";

function GuestCount({ t, count, className, listType }) {
  return (
    <CardContent className={className}>
      <Typography variant="h5" component="p">
        {t("guestcount.header")}
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body1" component="span">
        {listType === "permanent"
          ? t("guestcount.onetimetext")
          : t("guestcount.permanenttext")}
        {" "}{t("guestcount.begin")}
      </Typography>
      <Typography variant="h6" component="span">
        {" " + t("guestcount.guestWithCount", { count: count }) + " "}
      </Typography>
      <Typography variant="body1" component="span">
        {t("guestcount.end")}
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body2" color="textSecondary" component="p">
        {count > 0 && t("guestcount.info")}
      </Typography>
    </CardContent>
  );
}

export default withTranslation("host")(GuestCount);
