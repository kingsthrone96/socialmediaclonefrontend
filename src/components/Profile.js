import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./styles/profile.scss";

import { Context } from "../App";
import Navbar from "./Navbar";

function Profile() {
  const { userState, dispatch } = useContext(Context);
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
