import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./styles/chat.scss";

import { Context } from "../App";
import Navbar from "./Navbar";

function Chat() {
  const { userState, dispatch } = useContext(Context);
  if (!userState.isLoggedIn) return <Redirect to="/signIn" />;
  return (
    <>
      <Navbar />
      <div id="chat" className="container">
        <h1>Welcome to Chat Page {userState.user.name}</h1>
      </div>
    </>
  );
}

export default Chat;
