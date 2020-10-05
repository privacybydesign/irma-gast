import React, { useState } from "react";
import Header from "../Header";
import CreateListForm from "./CreateListForm";
import GuestList from "./GuestList";
import AutoDeleteText from "./AutoDeleteText";
import Footer from "../Footer";

function Portal() {
  const [guestLists, setGuestLists] = useState([]);

  function addGuestList(newList) {
    // if no name/description has been given, add default name
    let value = "";
    if (newList.name === "") {
      if (newList.type === "event") {
        value = "Eenmalige samenkomst";
      }
      if (newList.type === "permanent") {
        value = "Doorlopende samenkomst";
      }
      newList.name = value;
    }
    newList["location_id"] = Date.now(); // TODO: Use data from server here.
    // add this guestlist to the collection of guestlists
    setGuestLists((prevLists) => {
      return [newList, ...prevLists];
    });
  }

  function deleteGuestList(id) {
    // TODO: Send to the go server.
    setGuestLists((prevLists) => {
      return prevLists.filter((listItem) => {
        return listItem["location_id"] !== id;
      });
    });
  }

  function renderGuestLists() {
    return guestLists.map((list) => {
      return (
        <GuestList
          key={list["location_id"]}
          onDelete={() => deleteGuestList(list["location_id"])}
          id={list["location_id"]}
          date={list["date"]}
          name={list["name"]}
          listType={list["type"]}
          host="todo" // TODO replace with actual host
        />
      );
    });
  }

  return (
    <div className="App">
      <Header />
      <h2>Je bezoekerslijsten</h2>
      <CreateListForm onAdd={addGuestList} />
      {renderGuestLists()}
      <AutoDeleteText />
      <div style={{ height: "30px" }}></div>
      <Footer />
    </div>
  );
}

export default Portal;
