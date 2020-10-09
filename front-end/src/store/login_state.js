const initialState = {
  state: 'unknown',
  email: '',
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'loggedOut':
      return {
        ...state,
        state: 'loggedOut',
        email: '',
        irmaSession: action.irmaSession,
      };
    case 'loggedIn':
      return {
        ...state,
        state: 'loggedIn',
        email: action.email,
      };
    default:
      return state;
  }
}
