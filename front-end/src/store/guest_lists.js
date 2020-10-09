const initialState = {
  state: 'unknown',
  error: null,
  entries: [],
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'errorGuestLists':
      return {
        ...state,
        state: 'error',
        entries: [],
        error: action.error,
      };
    case 'loggedOut':
      return {
        ...state,
        state: 'loggedOut',
        entries: [],
        error: null,
      };
    case 'loadedGuestLists':
      return {
        ...state,
        state: 'loaded',
        entries: action.entries,
        error: null,
      };
    case 'loadingGuestLists':
      return {
        ...state,
        state: 'loading',
        entries: [],
        error: null,
      }
    default:
      return state;
  }
}
