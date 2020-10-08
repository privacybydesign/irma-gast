const initialState = {
  state: "unknown",
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "startDisclosurePage":
      return {
        ...state,
        state: "start",
        irmaSession: action.irmaSession,
        error: null,
      };
    case "sendGuestData":
      return {
        ...state,
        state: "encrypting",
        error: null,
      };
    case "guestDataEncrypted":
      return {
        ...state,
        state: "sending",
        error: null,
      };
    case "guestDataSent":
      return {
        ...state,
        state: "done",
        error: null,
      };
    case "errorDisclosurePage": {
      return {
        ...state,
        state: "error",
        error: action.error,
      };
    }
    default:
      return state;
  }
}
