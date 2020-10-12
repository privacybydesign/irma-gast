import { createStore, applyMiddleware, combineReducers } from "redux";
import login_state from "./login_state";
import guest_lists from "./guest_lists";
import checkins from "./checkins";
import guest_page from "./guest_page";

const waarServerUrl = "https://data.irma-welkom.nl/api/v1";

// IRMA server for authenticating guests
const irmaServerUrl = "https://irma-welkom.nl/irma";
const pkgServerUrl = "https://irma-welkom.nl/pkg";

/**
 * Handles all dispatches for changing the login state
 *  - dispatch({type: 'loggedIn'}) can be done to indicate that the login irma session has been succeeded.
 *    The IRMA-frontend session object on how to do the IRMA session can be found in the `irmaSession` field
 *    of the login redux state.
 *  - dispatch({type: 'initLogin'}) inits the login process.
 *  - dispatch({type: 'logOut'}) can be done to force a logout to the redux state. This will also handle
 *    the session deletion at the server.
 */
function handleLogin({ getState, dispatch }) {
  return (next) => (action) => {
    if (action.type == "initHostPage") {
      dispatch({
        type: "startHostPage",
        irmaSession: {
          url: waarServerUrl,
          start: {
            credentials: "include",
            url: (o) => `${o.url}/admin/irmasession_start`,
          },
          result: {
            credentials: "include",
            url: (o) => `${o.url}/admin/irmasession_finish`,
            parseResponse: (r) => r.status, 
          },
        },
      });
    } else if (
      getState().login.state === "loggedIn" &&
      action.type === "logOut"
    ) {
      fetch(`${waarServerUrl}/admin/logout`, { credentials: "include" }); // Result is ignored
      dispatch({
        type: "loggedOut",
        irmaSession: {
          credentials: "include",
          url: waarServerUrl,
          start: {
            url: (o) => `${o.url}/admin/irmasession_start`,
          },
          result: {
            url: (o) => `${o.url}/admin/irmasession_finish`,
          },
        },
      });
    }
    return next(action);
  };
}

/**
 * Handles all dispatch calls for deleting guestLists
 * - dispatch ({
 *    type: 'deleteGuestList',
 *    location_id: '<Location_id of the guest list to remove'
 *    })
 */
function handleDeleteGuestList({ getState, dispatch }) {
  return (next) => (action) => {
    if (
      getState().login.state === "loggedIn" &&
      action.type === "deleteGuestList"
    ) {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/register/${action.locationId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((resp) => {
          if (resp.status != 200) throw resp.status;
          dispatch({ type: "reloadGuestLists" });
        })
        .catch((err) => {
          dispatch({ type: "errorGuestLists", error: err });
        });
    }
    return next(action);
  };
}

/**
 * Handles all dispatch calls for adding guest lists
 *  - dispatch({
 *      type: 'addGuestList',
 *      name: '<Name of new guest list>',
 *      location: '<Location of new guest list>'
 *      onetime: true/false, // Boolean to indicate whether the guest list is for a one-time-event.
 *    })
 */
function handleAddGuestList({ getState, dispatch }) {
  return (next) => (action) => {
    if (
      getState().login.state === "loggedIn" &&
      action.type === "addGuestList"
    ) {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: action.name,
          location: action.location,
          onetime: action.onetime,
        }),
      })
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          dispatch({ type: "reloadGuestLists" });
        })
        .catch((err) => {
          dispatch({ type: "errorGuestLists", error: err });
        });
    }
    return next(action);
  };
}

/**
 * Handles all dispatch calls for updating the guest lists
 *  - dispatch({type: 'loadGuestLists'}) can be done to fetch the guest lists of the user that is logged in
 *    from the server, except when it has already been loaded before.
 *  - dispatch({type: 'reloadGuestLists'}) can be done to fetch the guest lists of the user that is logged in
 *    from the server and overwrites the previous load (if any).
 */
function handleUpdateGuestLists({ getState, dispatch }) {
  return (next) => (action) => {
    if (
      action.type === "reloadGuestLists" ||
      (action.type === "loadGuestLists" && !getState().guestLists.loaded)
    ) {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/overview`, { credentials: "include" })
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then((json) => {
          dispatch({ type: "loadedGuestLists", entries: json["locations"], email: json["email"] });
        })
        .catch((err) => {
          dispatch({ type: "errorGuestLists", error: err });
        });
    }

    return next(action);
  };
}

/**
 * Handles all dispatch calls for updating the checkins of a certain guest list
 *  - dispatch({type: 'loadCheckins', locationId: <Location ID of guest list to load checkins of>})
 */
function handleUpdateCheckins({ dispatch }) {
  return (next) => (action) => {
    if (action.type === "loadCheckins") {
      dispatch({ type: "loadingCheckins" });
      fetch(`${waarServerUrl}/admin/results/${action.locationId}`)
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then((json) => {
          dispatch({ type: "decryptingCheckins" });
          // TODO: Decrypt checkins
          dispatch({ type: "loadedCheckins", entries: json });
        })
        .catch((err) => {
          dispatch({ type: "errorCheckins", error: err });
        });
    }
    return next(action);
  };
}

/**
 * Handles all dispatch calls for updating the checkins of a certain guest list
 *  - dispatch({type: 'sendGuestData', data: ...})
 *  - dispatch({type: 'initDisclosurePage'}) to (re-)start the process of a guest showing his data.
 */
function handleDisclosurePage({ dispatch }) {
  return (next) => (action) => {
    if (action.type === "initDisclosurePage") {
      dispatch({
        type: "startDisclosurePage",
        irmaSession: {
          url: irmaServerUrl,
          start: {
            url: (o) => `${o.url}/session`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "@context": "https://irma.app/ld/request/disclosure/v2",
              disclose: [
                [["pbdf.pbdf.email.email"], ["pbdf.sidn-pbdf.email.email"]],
              ],
            }),
            parseResponse: (r) => r.json(),
          },
          mapping: {
            sessionPtr: (r) => r.sessionPtr,
            sessionToken: (r) => r.token,
          },
          result: {
            url: (o, { sessionToken }) =>
              `${o.url}/session/${sessionToken}/result-jwt`,
            parseResponse: (r) => r.text(),
          },
        },
      });
    } else if (action.type === "sendGuestData") {
      // TODO: Encrypt guest data
      let data = null;
      // TODO: Send errorDisclosurePage if encrypting fails.
      dispatch({
        type: "guestDataEncrypted",
        locationId: action.locationId,
        ciphertext: data,
      });
    } else if (action.type === "guestDataEncrypted") {
      fetch(`${waarServerUrl}/gast/gastsession`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location_id: action.locationId,
          ciphertext: action.ciphertext,
        }),
      })
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          dispatch({ type: "guestDataSent" });
        })
        .catch((err) => {
          dispatch({ type: "errorDisclosurePage", error: err });
        });
    }
    return next(action);
  };
}

export default function () {
  return createStore(
    combineReducers({
      login: login_state,
      guestLists: guest_lists,
      checkins: checkins,
      DisclosurePage: guest_page,
    }),
    applyMiddleware(
      handleLogin,
      handleAddGuestList,
      handleDeleteGuestList,
      handleUpdateGuestLists,
      handleUpdateCheckins,
      handleDisclosurePage
    )
  );
}
