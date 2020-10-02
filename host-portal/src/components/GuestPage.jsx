import React, { useState } from "react";
import Header from "./Header";
import CreateListForm from "./CreateListForm";
import GuestList from "./GuestList";
import AutoDeleteText from "./AutoDeleteText";
import Footer from "./Footer";

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
    // add this guestlist to the collection of guestlists
    setGuestLists((prevLists) => {
      return [newList, ...prevLists];
    });
  }

  function deleteGuestList(id) {
    setGuestLists((prevLists) => {
      return prevLists.filter((listItem, index) => {
        return index !== id;
      });
    });
  }
  // TODO: known bug when deleting guestlists the expanded-state of the remaining lists is incorrect

  return (
    <div className="App">
      <Header />
      <h2>Meld je aan met IRMA</h2>

      <div style={{ height: "30px" }}></div>
      <Footer />
    </div>
  );
}

export default Portal;
