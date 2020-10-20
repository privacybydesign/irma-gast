const initialState = {
  state: undefined,
  location_id: undefined,
  ciphertexts: [],
  client: undefined, // wasm module
  jwts: [],
  entries: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "initCheckins":
      return {
        ...state,
        location_id: action.location_id,
        state: "initializing",
      };
    case "initializedCheckins":
      return {
        ...state,
        client: action.client,
        state: "initialized",
      };
  case "errorCheckins":
      return {
        ...state,
        entries: [],
        ciphertexts: [],
        jwts: [],
        state: "error",
        error: action.error,
      };
    case "loadingCheckins":
      return {
        ...state,
        state: "loading",
        error: null,
      };
    case "decryptingCheckins":
      return {
        ...state,
        ciphertexts: action.ciphertexts,
        state: "decrypting",
        error: null,
      };
    case "verifyingCheckins":
      return {
        ...state,
        jwts: action.jwts,
        state: "verifying",
        error: null,
      };
    case "loadedCheckins":
      return {
        ...state,
        entries: action.entries,
        state: "done",
        error: null,
      };
    default:
      return state;
  }
}
