const initialState = {
  locations: {},

  // TODO: move to hostpage?
  state: undefined,
  client: undefined, // wasm module
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "initCheckins":
      return {
        ...state,
        state: "initializing",
        locations: {
          ...state.locations,
        },
      };
    case "initializedCheckins":
      return {
        ...state,
        state: "initialized",
        client: action.client,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "initialized",
            ciphertexts: [],
            jwts: [],
            entries: [],
            error: null,
          },
        },
      };
    case "errorCheckins":
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "error",
            ciphertexts: [],
            jwts: [],
            entries: [],
            error: action.error,
          },
        },
      };
    case "loadingCheckins":
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "loading",
            ciphertexts: [],
            jwts: [],
            entries: [],
            error: null,
          },
        },
      };
    case "decryptingCheckins":
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "decrypting",
            ciphertexts: action.ciphertexts,
            error: null,
          },
        },
      };
    case "verifyingCheckins":
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "verifying",
            jwts: action.jwts,
            error: null,
          },
        },
      };
    case "loadedCheckins":
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.location_id]: {
            ...state.locations[action.location_id],
            location_state: "done",
            entries: action.entries,
            error: null,
          },
        },
      };
    default:
      return state;
  }
}
