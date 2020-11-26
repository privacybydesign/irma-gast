import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Trans, withTranslation } from "react-i18next";

function GuestCount({ t, count, className, listType, showText }) {
  return (
    <CardContent className={className}>
      <Typography variant="h5" component="p">
        {t("guestcount.header")}
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body1" component="span">
        {listType === "event"
          ? t("guestcount.onetimetext")
          : t("guestcount.permanenttext")}{" "}
      </Typography>
      <Typography variant="body1" component="span">
        <Trans
          t={t}
          i18nKey="guestcount.guest"
          count={count}
          components={[<b></b>]}
        />
      </Typography>
      <Typography variant="body1" component="span">
        {" " + t("guestcount.end")}
      </Typography>
      <div style={{ height: "4px" }}></div>
      <Typography variant="body2" color="textSecondary" component="p">
        {count > 0 && showText && t("guestcount.info")}
      </Typography>
    </CardContent>
  );
}

export default withTranslation("host")(GuestCount);
