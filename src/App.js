import React, { useEffect, useReducer, createContext } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";
import "./helperClasses.scss";

import { ACTION, initialState, reducer } from "./Reducer";
import serverAPI from "./components/helpers/serverAPI";
import { fetchData } from "./components/helpers/helpersFunctions";

import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Homefeed from "./components/Homefeed";
import Profile from "./components/Profile";
import Chat from "./components/Chat";

export const Context = createContext();

function App() {
  const [userState, dispatch] = useReducer(reducer, initialState);
  const setLoginStatus = (status) => ({
    type: ACTION.SET_LOGIN_STATUS,
    payload: status,
  });

  useEffect(() => {
    console.log("dfdfdf");
    if (userState.isLoggedIn) {
      fetchData(serverAPI.homefeedData, {
        method: "GET",
        headers: { authToken: window.localStorage.authToken },
      })
        .then((res) => {
          const { authorizationError, currentUser } = res;
          console.log("fetch fired");
          if (authorizationError) {
            dispatch(setLoginStatus(false));
            window.localStorage.removeItem("authToken");
          } else {
            console.log(currentUser);
            dispatch({
              type: ACTION.SET_USER_STATE,
              payload: res.currentUser,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoginStatus(false));
        });
    }
  }, [userState.isLoggedIn]);
  return (
    <Context.Provider value={{ userState, dispatch, ACTION, setLoginStatus }}>
      <div className="App">
        <HashRouter>
          <Route exact path="/">
            <SignUpForm />
          </Route>
          <Route path="/signIn">
            <SignInForm />
          </Route>
          <Route path="/homefeed">
            <Homefeed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </HashRouter>
      </div>
    </Context.Provider>
  );
}
export default App;
