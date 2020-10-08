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
import ContactsPDF from "./ContactsPDF";
import QRCodePDF from "./qr-code/QRCodePDF";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

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

export default function GuestList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [qrReady, setQrReady] = useState(false);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-" + props.id);
    const qrUrl = canvas.toDataURL("image/jpg", 0.3);
    let downloadLink = document.createElement("a");
    downloadLink.href = qrUrl;
    setQrReady(true);
  };

  // state of the delete confirmation dialogue
  const [dialog, setDialog] = React.useState(false);
  const handleDelete = () => {
    props.onDelete();
    setDialog(false);
  };
  const handleClose = () => {
    setDialog(false);
  };
  const handleClickOpen = () => {
    setDialog(true);
  };

  // TODO: extract subcomponents used in GuestList.jsx into their individual files

  return (
    <Card className={(classes.root, "guest-list")} id={props.id} square={true}>
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
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.date}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.noPadding}>
          <Typography variant="body1" component="p">
            Druk deze QR-code af en vraag bezoekers zich via deze code aan te
            melden.
          </Typography>
        </CardContent>
        <CardContent className={classes.noPadding}>
          <QRCode
            id={"qr-" + props.id}
            value={"https://irma.app"} //TODO
            size={300}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"canvas"}
          />{" "}
          <CardActions className={classes.noPadding} disableSpacing>
            {qrReady ? (
              <QRCodePDF
                title={props.name}
                date={props.date}
                host={props.host}
                qr={props.id}
              />
            ) : (
              <Button
                onClick={() => {
                  downloadQR();
                }}
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Genereer PDF
              </Button>
            )}
          </CardActions>
          <GuestCount
            count={2} // TODO: replace with actual number
            listType={props.listType}
            className={classes.noPadding}
          />
          <Button
            onClick={handleClickOpen}
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Liist verwijdereren
          </Button>
          <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Lijst verwijderen?"}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Als je doorgaat verwijder je de lijst{" "}
                <Typography variant="h6" component="span">
                  {props.name}, {props.date}
                </Typography>{" "}
                en alle contactgegevens die op deze lijst geregistreerd staan.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Lijst bewaren
              </Button>
              <Button onClick={handleDelete} color="secondary" autoFocus>
                Lijst verwijderen
              </Button>
            </DialogActions>
          </Dialog>
          <ContactsPDF title={props.name} date={props.date} host={props.host} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
