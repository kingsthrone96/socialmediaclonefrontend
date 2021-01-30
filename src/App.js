import React, { useState } from "react";
import { HashRouter, Route} from "react-router-dom";
import "./App.scss";
import './helperClasses.scss';

import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Homefeed from './components/Homefeed';
import Profile from './components/Profile';
import Chat from './components/Chat';

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
        <Route path="/homefeed">
          <Homefeed currentUser={userState} setUserState={setUserState} />
        </Route>
        <Route path="/profile">
            <Profile currentUser={userState} setUserState={setUserState} />
        </Route>
        <Route path="/chat">
          <Chat currentUser={userState} setUserState={setUserState} />
        </Route>
      </HashRouter>
    </div>
  );
}
export default App;
