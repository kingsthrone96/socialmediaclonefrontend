const ACTION = {
  SET_USER_STATE: "setUserState",
  SET_LOGIN_STATUS: "setLoginStatus",
  SUBMIT_POST: "submitPost",
  CHANGE_PROFILE_PICTURES: "changeProfilePictures",
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

    case ACTION.CHANGE_PROFILE_PICTURES:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            [action.payload.imageFor]: action.payload.imagePath,
          },
        },
      };
    default:
      return state;
  }
};

export { ACTION, reducer, initialState };
