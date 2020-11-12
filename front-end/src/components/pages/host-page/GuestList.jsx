import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import QRCode from "qrcode.react";
import GuestCount from "./GuestCount";
import Contacts from "./Contacts";
import QRCodePDF from "./qr-code/QRCodePDF";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import { Trans, withTranslation } from "react-i18next";
import GuestListButton from "./GuestListButton";
import { guestQRUrl } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: "25px",
  },
  noPadding: { paddingLeft: "0px !important" },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  irmaBlue: {
    color: "#fff",
    backgroundColor: "#004c92",
  },
}));

function GuestList({
  t,
  onDelete,
  id,
  host,
  name,
  location,
  listType,
  event_date,
  date,
  count,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [qrReady, setQrReady] = useState(false);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-" + id);
    const qrUrl = canvas.toDataURL("image/jpg", 0.3);
    let downloadLink = document.createElement("a");
    downloadLink.href = qrUrl;
    setQrReady(true);
  };

  // state of the delete confirmation dialogue
  const [dialog, setDialog] = React.useState(false);
  const handleDelete = () => {
    onDelete();
    setDialog(false);
  };
  const handleClose = () => {
    setDialog(false);
  };
  const handleClickOpen = () => {
    setDialog(true);
  };

  const subheader = () => {
    let subheader = `${t("guestlist.made")} ${date}`;
    if (listType === "event") {
      subheader = `${subheader}, ${t("guestlist.usable")} ${event_date}`;
    }
    return subheader;
  };
  // TODO: extract subcomponents used in GuestList.jsx into their individual files

  return (
    <Card className={(classes.root, "guest-list")} id={id} square={true}>
      <CardHeader
        className={classes.noPadding}
        avatar={
          <Avatar aria-label="list" className={classes.irmaBlue}>
            <FormatListBulletedIcon />
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label={t("guestlist.expandlabel")}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={name}
        subheader={subheader()}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.noPadding}>
          <Typography variant="body1" component="p">
            {t("guestlist.qrinfo")}
          </Typography>
        </CardContent>
        <CardContent className={classes.noPadding}>
          <QRCode
            id={"qr-" + id}
            value={guestQRUrl(id, host)}
            size={200}
            className="qr"
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"canvas"}
          />
          <CardActions className={classes.noPadding} disableSpacing>
            {qrReady ? (
              <QRCodePDF
                title={name}
                date={date}
                host={host}
                location={location}
                qr={id}
              />
            ) : (
              <GuestListButton
                onClick={() => {
                  downloadQR();
                }}
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                text={t("guestlist.genqr")}
              />
            )}
          </CardActions>
          <GuestCount
            count={count}
            listType={listType}
            className={classes.noPadding}
          />
          <GuestListButton
            onClick={handleClickOpen}
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<DeleteIcon />}
            text={t("guestlist.rmlist")}
          />
          <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {`${t("guestlist.rmlist")}?`}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Trans
                  t={t}
                  i18nKey="guestlist.rmdialog"
                  values={{ name: name, date: date }}
                  components={[<Typography variant="h6" component="span" />]}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t("guestlist.keeplist")}
              </Button>
              <Button onClick={handleDelete} color="secondary" autoFocus>
                {t("guestlist.rmlist")}
              </Button>
            </DialogActions>
          </Dialog>
          <Contacts
            name={name}
            date={date}
            host={host}
            id={id}
            location={location}
            count={count}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withTranslation("host")(GuestList);
