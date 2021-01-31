import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import "./styles/chat.scss";

function Chat({ userState, dispatch }) {
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
