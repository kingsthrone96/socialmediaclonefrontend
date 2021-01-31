const ACTION = {
  SET_USER_STATE: "setUserState",
  SET_LOGIN_STATUS: "setLoginStatus",
};

function UseAuth() {
  const authToken = window.localStorage.getItem("authToken");
  if (authToken) return true;
  return false;
}

const initialState = {
  user: {},
  isLoggedIn: UseAuth(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_USER_STATE:
      return {
        ...state,
        user: action.payload,
      };

    case ACTION.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export { ACTION, reducer, initialState };
