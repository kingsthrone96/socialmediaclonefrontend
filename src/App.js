import React, { useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

function App() {
  const [userState, setUserState] = useState({});

  return (
    <div className="App">
      <HashRouter>
        <Route exact path="/">
          <SignUpForm userState={userState} setUserState={setUserState} />
        </Route>
        <Route path="/signIn">
          <SignInForm userState={userState} setUserState={setUserState} />
        </Route>
      </HashRouter>
    </div>
  );
}
export default App;
