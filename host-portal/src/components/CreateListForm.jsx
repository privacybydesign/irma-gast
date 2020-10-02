import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function CreateListForm(props) {
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

  function clearCreateForm() {
    setGuestList({
      name: "",
      type: "permanent",
      date: getCurrentDate(),
      // error: "",
    });
  }

  function createList(event) {
    props.onAdd(guestlist);
    clearCreateForm();
    event.preventDefault();
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
        <h3>Voeg samenkomst toe</h3>
        <TextField
          required
          name="name"
          onChange={handleChange}
          fullWidth
          value={guestlist.name}
          label="Omschrijving"
          error={guestlist.error}
        />
        <div style={{ height: "20px" }}></div>
        <p>Deze lijst is voor de registratie van bezoekers aan een...</p>
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
            label="eenmalige samenkomst (vergadering, lezing, bruiloft...)"
          />
          <FormControlLabel
            value="permanent"
            control={<Radio />}
            label="doorlopende samenkomst (cafe, restaurant, winkel, kapper, ...)"
          />
        </RadioGroup>
        <div style={{ height: "20px" }}></div>
        {guestlist.type === "event" && (
          <div>
            <Zoom in={true}>
              <TextField
                name="date"
                helperText="Alleen op deze dag kunnen mensen zich aanmelden voor deze eenmalige samenkomst."
                onChange={handleChange}
                label="Date*"
                type="date"
                value={guestlist.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Zoom>
          </div>
        )}
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

export default CreateListForm;
