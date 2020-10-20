import { createStore, applyMiddleware, combineReducers } from "redux";
import guest_lists from "./guest_lists";
import checkins from "./checkins";
import guest_page from "./guest_page";
import Client from "./irmaseal";
import JWT from "jsonwebtoken";

// URL of waar server
const waarServerUrl = "https://data.irma-welkom.nl/api/v1";

// IRMA server for authenticating guests
const irmaServerUrl = "https://irma-welkom.nl/irma";

// Private key generator URL
const pkgServerUrl = "https://irma-welkom.nl/pkg";

/**
 * Handles all dispatches for changing the login state
 *  - dispatch({type: 'loggedIn'}) can be done to indicate that the login irma session has been succeeded.
 *    The IRMA-frontend session object on how to do the IRMA session can be found in the `irmaSession` field
 *    of the login redux state.
 *  - dispatch({type: 'initHostPage'}) inits the login process.
 *  - dispatch({type: 'logOut'}) can be done to force a logout to the redux state. This will also handle
 *    the session deletion at the server.
 */
function handleLogin({ getState, dispatch }) {
  return (next) => (action) => {
    if (action.type === "initHostPage") {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/overview`, { credentials: "include" })
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then((json) => {
          dispatch({
            type: "loadedGuestLists",
            entries: json["locations"],
            email: json["email"],
          });
        })
        .catch((status) => {
          // admin is not logged in yet
          // prepare an irma session
          if (status === 403) {
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
          }
        });
    } else if (getState().guestLists.loggedIn && action.type === "logOut") {
      fetch(`${waarServerUrl}/admin/logout`, { credentials: "include" }).then(
        (resp) => {
          if (resp.status === 200) {
            dispatch({
              type: "loggedOut",
              irmaSession: {
                credentials: "include",
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
          }
        }
      );
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
    if (getState().guestLists.loggedIn && action.type === "deleteGuestList") {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/remove/${action.location_id}`, {
        method: "DELETE",
        credentials: "include",
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
    if (getState().guestLists.loggedIn && action.type === "addGuestList") {
      dispatch({ type: "loadingGuestLists" });
      fetch(`${waarServerUrl}/admin/register`, {
        mode: "cors",
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
          dispatch({
            type: "loadedGuestLists",
            entries: json["locations"],
            email: json["email"],
          });
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
function handleUpdateCheckins({ dispatch, getState }) {
  return (next) => (action) => {
    if (action.type === "initCheckins") {
      Client.build(pkgServerUrl).then((client) => {
        dispatch({ type: "initializedCheckins", client: client });
      });
    } else if (
      action.type === "loadCheckins" &&
      getState().checkins.state === "initialized"
    ) {
      dispatch({ type: "loadingCheckins" });
      let id = getState().checkins.location_id;
      fetch(`${waarServerUrl}/admin/results/${id}`, {
        credentials: "include",
      })
        .then((resp) => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then((json) => {
          if (json["entries"].length === 0)
            throw new Error("no entries to decrypt");
          dispatch({
            type: "decryptingCheckins",
            ciphertexts: json["entries"],
          });
        })
        .catch((err) => {
          dispatch({ type: "errorCheckins", error: err });
        });
    } else if (action.type === "decryptingCheckins") {
      let cts = action.ciphertexts;
      let client = getState().checkins.client;
      let host_email = getState().guestLists.email;

      console.log("cts: ", cts);
      client.requestToken(host_email).then((token) => {
        let jwtPromises = [];
        cts.map(function (entry) {
          let ct = Buffer.from(entry.ct, "base64");
          console.log("processing ct: ", ct);
          jwtPromises.push(
            new Promise(function (resolve, reject) {
              let ts = client.extractTimestamp(ct);
              if (ts === -1) return reject(new Error("no timestamp"));
              return client
                .requestKey(token, ts)
                .then((key) =>
                  resolve({
                    time: entry.time,
                    jwt: client.decrypt(key, ct).jwt,
                  })
                )
                .catch((err) => reject(err));
            })
          );
        });
        Promise.allSettled(jwtPromises)
          .then((promises) =>
            promises
              .filter((promise) => promise.status === "fulfilled")
              .map((promise) => promise.value)
          )
          .then((jwts) => dispatch({ type: "verifyingCheckins", jwts: jwts }));
      });
    } else if (action.type === "verifyingCheckins") {
      console.log("jwts: ", action.jwts);
      let entries = [];
      fetch(irmaServerUrl + "/publickey")
        .then((resp) => resp.text())
        .then((pk) => {
          console.log("pk: ", pk);
          action.jwts.map((entry) => {
            console.log("jwt: ", entry.jwt);
            JWT.verify(
              entry.jwt,
              pk,
              { maxAge: "14d", algorithms: ["RS256"] },
              function (err, decoded) {
                if (err) {
                  console.log("err: ", err);
                } else {
                  console.log("decoded: ", decoded);
                  let email = decoded.disclosed[0].rawValue;
                  if (decoded.proofStatus === "DONE_VALID")
                    entries.push({ time: entry.time, email: email });
                }
              }
            );
          });
          dispatch({ type: "done", entries: entries });
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
function handleDisclosurePage({ getState, dispatch }) {
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
              validity: 86400, // jwt is valid for 2 weeks = 86400s
              request: {
                "@context": "https://irma.app/ld/request/disclosure/v2",
                disclose: [
                  [["pbdf.pbdf.email.email"], ["pbdf.sidn-pbdf.email.email"]],
                ],
              },
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
    } else if (action.type === "showDisclosurePage") {
      dispatch({ type: "disclosurePage" });
    } else if (action.type === "sendGuestData") {
      let result = getState().DisclosurePage.result;
      let host = getState().DisclosurePage.host;
      let id = getState().DisclosurePage.id;

      // TODO: initalize client while waiting for e.g. button press
      Client.build(pkgServerUrl).then((client) => {
        let ct = client.encrypt(host, { jwt: result });
        const base64ct = new Buffer(ct).toString("base64");
        dispatch({
          type: "guestDataEncrypted",
          locationId: id,
          ciphertext: base64ct,
        });
      });

      // TODO: Send errorDisclosurePage if encrypting fails.
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
