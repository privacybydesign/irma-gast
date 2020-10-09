const initialState = {
  state: "unknown",
  entries: [],
  email: "",
  error: null,
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
        state: "loading",
        entries: [],
        email: "",
        error: null,
      };
    case "loadedGuestLists":
      return {
        ...state,
        state: "loaded",
        entries: action.entries,
        email: action.email,
        error: null,
      };
    case "errorGuestLists":
      return {
        ...state,
        state: "error",
        entries: [],
        email: "",
        error: action.error,
      };
    case "loggedOut":
      return {
        ...state,
        state: "loggedOut",
        entries: [],
        email: "",
        error: null,
      };
    default:
      return state;
  }
}
