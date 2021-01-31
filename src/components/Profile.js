import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./styles/profile.scss";
import Navbar from "./Navbar";

function Profile({ userState, dispatch }) {
  if (!userState.isLoggedIn) return <Redirect to="/signIn" />;
  return (
    <>
      <Navbar />
      <div id="profile" className="container">
        <h1>Welcome to Profile Page {userState.user.name}</h1>
      </div>
    </>
  );
}

export default Profile;
