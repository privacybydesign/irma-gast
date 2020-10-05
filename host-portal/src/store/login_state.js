const initialState = {
  state: 'unknown',
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'loggedOut':
      return {
        ...state,
        state: 'loggedOut',
        irmaSession: action.irmaSession,
      };
    case 'loggedIn':
      return {
        ...state,
        state: 'loggedIn',
      };
    default:
      return state;
  }
}
