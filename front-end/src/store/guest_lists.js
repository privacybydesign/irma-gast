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
    case "loggingIn":
      return {
        ...state,
        state: "loggingIn",
      };
    case "loggedIn":
      return {
        ...state,
        state: "loggedIn",
        loggedIn: true,
        email: action.email,
        error: null,
      };
    case "loadingGuestLists":
      return {
        ...state,
        state: "loading",
        error: null,
      };
    case "loadedGuestLists":
      return {
        ...state,
        state: "loaded",
        entries: action.entries,
        error: null,
      };
    case "errorGuestLists":
      return {
        ...state,
        state: "error",
        entries: [],
        error: action.error,
      };
    case "loggingOut":
      return {
        ...state,
        state: "loggingOut",
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
