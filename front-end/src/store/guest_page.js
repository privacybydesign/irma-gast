const initialState = {
  state: "unknown",
  error: null,
  result: null, // session results
  host: "",
  id: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "initDisclosurePage":
      return {
        ...state,
        host: action.host,
        id: action.id,
      };
    case "startDisclosurePage":
      return {
        ...state,
        state: "start",
        irmaSession: action.irmaSession,
        error: null,
      };
    case "showDisclosurePage":
      return {
        ...state,
        state: "disclosurePage",
        result: action.result,
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
