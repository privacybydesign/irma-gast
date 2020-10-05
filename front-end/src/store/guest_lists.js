const initialState = {
  loading: false,
  loaded: false,
  error: null,
  entries: [],
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'errorGuestLists':
      return {
        ...state,
        entries: [],
        error: action.error,
      };
    case 'loggedOut':
      return {
        ...state,
        entries: [],
        loaded: false,
        error: null,
      };
    case 'loadedGuestLists':
      return {
        ...state,
        entries: action.entries,
        loading: false,
        loaded: true,
        error: null,
      };
    case 'loadingGuestLists':
      return {
        ...state,
        entries: [],
        loading: true,
        error: null,
      }
    default:
      return state;
  }
}
