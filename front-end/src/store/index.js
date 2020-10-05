import { createStore, applyMiddleware, combineReducers } from 'redux';
import login_state from './login_state';
import guest_lists from './guest_lists';
import checkins from './checkins';

const serverUrl = ''; // TODO: Find a nice place to get the server url from

/**
 * Handles all dispatches for changing the login state
 *  - dispatch({type: 'loggedIn'}) can be done to indicate that the login irma session has been succeeded.
 *    The IRMA-frontend session object on how to do the IRMA session can be found in the `irmaSession` field
 *    of the login redux state.
 *  - dispatch({type: 'logOut'}) can be done to force a logout to the redux state. This will also handle
 *    the session deletion at the server.
 */
function handleLogin({getState, dispatch}) {
  return next => action => {
    if (getState().login.state === 'unknown') {
      fetch(`${serverUrl}/admin/overview`, {credentials: 'include'})
        .then(resp => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then(json => {
          dispatch({type: 'loadedGuestLists', entries: json});
          dispatch({type: 'loggedIn'});
        })
        .catch(() => {
          dispatch({
            type: 'loggedOut',
            irmaSession: {
              url: serverUrl,
              start: {
                url: o => `${o.url}/admin/irmasession_start`,
              },
              result: {
                url: o => `${o.url}/admin/irmasession_finish`,
              }
            },
          });
        });
    } else if (action.type === 'logOut') {
      fetch(`${serverUrl}/admin/logout`, {credentials: 'include'}); // Result is ignored
      dispatch({
        type: 'loggedOut',
        irmaSession: {
          url: serverUrl,
          start: {
            url: o => `${o.url}/admin/irmasession_start`,
          },
          result: {
            url: o => `${o.url}/admin/irmasession_finish`,
          }
        },
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
*     })
 */
function handleAddGuestList({dispatch}) {
  return next => action => {
    if (action.type === 'addGuestList') {
      dispatch({type: 'loadingGuestLists'});
      fetch(`${serverUrl}/admin/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: action.name,
          location: action.location,
          onetime: action.onetime,
        }),
      })
        .then(resp => {
          if (resp.status !== 200) throw resp.status;
          dispatch({type: 'reloadGuestLists'});
        })
        .catch(err => {
          dispatch({type: 'errorGuestLists', error: err});
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
function handleUpdateGuestLists({getState, dispatch}) {
  return next => action => {
    if (action.type === 'reloadGuestLists' || (action.type === 'loadGuestLists' && !getState().guestLists.loaded)) {
      dispatch({type: 'loadingGuestLists'});
      fetch(`${serverUrl}/admin/overview`, {credentials: 'include'})
        .then(resp => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then(json => {
          dispatch({type: 'loadedGuestLists', entries: json});
        })
        .catch(err => {
          dispatch({type: 'errorGuestLists', error: err});
        });
    }

    return next(action);
  };
}

/**
 * Handles all dispatch calls for updating the checkins of a certain guest list
 * dispatch({type: 'loadCheckins', locationId: <Location ID of guest list to load checkins of>})
 */
function handleUpdateCheckins({dispatch}) {
  return next => action => {
    if (action.type === 'loadCheckins') {
      dispatch({type: 'loadingCheckins'});
      fetch(`${serverUrl}/admin/results/${action.locationId}`)
        .then(resp => {
          if (resp.status !== 200) throw resp.status;
          return resp.json();
        })
        .then(json => {
          dispatch({type: 'decryptingCheckins'});
          // TODO: Decrypt checkins
          dispatch({type: 'loadedCheckins', entries: json})
        })
        .catch(err => {
          dispatch({type: 'errorCheckins', error: err});
        });
    }
    return(next(action))
  };
}

export default function() {
  return createStore(
    combineReducers({
      login: login_state,
      guestLists: guest_lists,
      checkins: checkins,
    }),
    applyMiddleware(
      handleLogin,
      handleAddGuestList,
      handleUpdateGuestLists,
      handleUpdateCheckins,
    ),
  );
}
