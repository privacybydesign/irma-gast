const initialState = {
  state: "unknown",
  entries: [],
  email: "",
  error: null,
  loggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "startHostPage":
      return {
        ...state,
        state: "start",
        irmaSession: action.irmaSession,
        entries: [],
        email: "",
        error: null,
      };
    case "loadingGuestLists":
      return {
        ...state,
        state: action.reloading ? "reloading" : "loading",
        error: null,
      };
    case "loadedGuestLists":
      return {
        ...state,
        state: "loaded",
        entries: action.entries,
        loggedIn: true,
        email: action.email,
        error: null,
      };
    case "errorGuestLists":
      return {
        ...state,
        state: "error",
        entries: [],
        error: action.error,
      };
    case "loggedOut":
      return {
        ...state,
        state: "loggedOut",
        entries: [],
        loggedIn: false,
        email: "",
        error: null,
        irmaSession: action.irmaSession,
      };
    default:
      return state;
  }
}
