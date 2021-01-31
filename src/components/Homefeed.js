import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import "./styles/homefeed.scss";
import serverAPI from "./helpers/serverAPI";
import { fetchData } from "./helpers/helpersFunctions";
import { ACTION } from "../Reducer";
import { Context } from "../App";

import Navbar from "./Navbar";
import LeftSide from "./reusable/LeftSide";
import PostArea from "./reusable/PostArea";

function Homefeed() {
  const { userState, dispatch } = useContext(Context);
  useEffect(() => {
    console.log("hello world");
  }, []);

  if (!userState.isLoggedIn) return <Redirect to="/signIn" />;
  return (
    <>
      <Navbar />
      <div id="homefeed" className="hc-container">
        <LeftSide userState={userState} dispatch={dispatch} />
        <PostArea />
      </div>
    </>
  );
}

export default Homefeed;
