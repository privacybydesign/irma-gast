import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withTranslation } from "react-i18next";

function CreateListForm({ t, onAdd }) {
  const [guestlist, setGuestList] = useState({
    name: "",
    type: "permanent",
    date: getCurrentDate(),
  });

  function handleChange(event) {
    const element = event.target.name;
    const value = event.target.value;
    setGuestList((prevValue) => {
      return {
        ...prevValue,
        [element]: value,
      };
    });
  }

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const handleCheckChange = (event) => {
    setChecked(!checked);
  };

  function clearCreateForm() {
    setGuestList({
      name: "",
      type: "permanent",
      date: getCurrentDate(),
      // error: "",
    });
    setChecked(false);
  }

  function createList(event) {
    setError(checked ? "" : t("createlist.accept"));
    if (checked) {
      onAdd(guestlist);
      clearCreateForm();
      event.preventDefault();
    }
  }

  function getCurrentDate() {
    // from: https://stackoverflow.com/questions/54714316/how-to-set-a-default-date-for-a-material-ui-textfield-type-date
    const dateNow = new Date(); // Creating a new date object with the current date and time
    const year = dateNow.getFullYear(); // Getting current year from the created Date object
    const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
    const month = // Setting current Month number from current Date object
      monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
        ? `0${monthWithOffset}`
        : monthWithOffset;
    const date =
      dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
        ? `0${dateNow.getUTCDate()}`
        : dateNow.getUTCDate();

    const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>
    return materialDateInput;
  }

  return (
    <div className={"center"}>
      <form className="create-meeting">
        <h3>{t("createlist.header")}</h3>
        <TextField
          required
          name="name"
          onChange={handleChange}
          fullWidth
          value={guestlist.name}
          label={t("createlist.namelabel")}
          error={guestlist.error}
        />
        <TextField
          required
          name="location"
          onChange={handleChange}
          fullWidth
          value={guestlist.location}
          label={t("createlist.locationlabel")}
          error={guestlist.error}
        />{" "}
        <div style={{ height: "20px" }}></div>
        <p>{t("createlist.purpose")}</p>
        <RadioGroup
          aria-label="type"
          name="type"
          value={guestlist.type}
          onChange={handleChange}
        >
          {" "}
          <FormControlLabel
            value="event"
            control={<Radio />}
            label={t("createlist.onetimelabel")}
          />
          <FormControlLabel
            value="permanent"
            control={<Radio />}
            label={t("createlist.permanentlabel")}
          />
        </RadioGroup>
        <div style={{ height: "20px" }}></div>
        {guestlist.type === "event" && (
          <div>
            <Zoom in={true}>
              <TextField
                name="date"
                helperText={t("createlist.onetimedatehelpertext")}
                onChange={handleChange}
                label={t("createlist.onetimedatelabel")}
                type="date"
                value={guestlist.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Zoom>
            <div style={{ height: "20px" }}></div>
          </div>
        )}
        <FormControl required error={guestlist.error}>
          <FormControlLabel
            className="multiline"
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckChange}
                name="agree"
              />
            }
            label={<p className="baseliner">{t("createlist.checkboxlabel")}</p>}
          />
          <FormHelperText className="irma-red">{error}</FormHelperText>
        </FormControl>
        <div style={{ height: "20px" }}></div>
        <Zoom in={true}>
          <Fab onClick={createList}>
            <AddIcon fontSize="large" />
          </Fab>
        </Zoom>
      </form>
      <div style={{ height: "20px" }}></div>
    </div>
  );
}

export default withTranslation("host")(CreateListForm);
