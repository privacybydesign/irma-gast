const initialState = {
  locationId: undefined,
  loading: false,
  decrypting: false,
  entries: [],
  error: null,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'loggedOut':
      return {
        ...state,
        locationId: undefined,
        entries: [],
        loading: false,
        error: null,
      };
    case 'errorCheckins':
      return {
        ...state,
        entries: [],
        loading: false,
        decrypting: false,
        error: action.error,
      };
    case 'loadingCheckins':
      return {
        ...state,
        locationId: action.locationId,
        entries: [],
        loading: true,
        error: null,
      }
    case 'decryptingCheckins':
      return {
        ...state,
        loading: false,
        decrypting: true,
        error: null,
      }
    case 'loadedCheckins':
      return {
        ...state,
        entries: action.entries,
        loading: false,
        decrypting: false,
        error: null,
      };
    default:
      return state;
  }
}
