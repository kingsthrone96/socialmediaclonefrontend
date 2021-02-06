const ACTION = {
  SET_USER_STATE: "setUserState",
  SET_LOGIN_STATUS: "setLoginStatus",
  SUBMIT_POST: "submitPost",
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
        user: {
          ...action.payload,
          posts: action.payload.posts.reverse(),
        },
      };

    case ACTION.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case ACTION.SUBMIT_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: [action.payload, ...state.user.posts],
        },
      };
    default:
      return state;
  }
};

export { ACTION, reducer, initialState };
