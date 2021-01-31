import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import "./styles/signInForm.scss";
import serverAPI from "./helpers/serverAPI";
import { ACTION } from "../Reducer";

import TextField from "@material-ui/core/TextField";

let body = {};
const onChange = (e = window.event) => {
  const { name, value } = e.target;
  Object.assign(body, { ...body, [name]: value });
};

function SignInForm({ userState, dispatch }) {
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const onSubmit = async (e = window.event) => {
    e.preventDefault();
    try {
      const res = await fetch(serverAPI.userLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.clientError) {
        handleValidationError(data.clientError);
        throw new Error("Something went wrong");
      } else {
        window.localStorage.setItem("authToken", data.token);
        dispatch({
          type: ACTION.SET_USER_STATE,
          payload: data.currentUser,
        });
        dispatch({ type: ACTION.SET_LOGIN_STATUS, payload: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidationError = (errors) => {
    setEmailError();
    setPasswordError();
    errors.forEach((err) => {
      const errMsg = err.errorMessage.replace("signUp", "");
      if (err.key === "signUpEmail" || err.key === "email")
        setEmailError({ error: true, errMsg });
      if (err.key === "signUpPassword" || err.key === "password")
        setPasswordError({ error: true, errMsg });
    });
  };

  if (userState.isLoggedIn) return <Redirect to="/homefeed" />;
  return (
    <div id="signInForm">
      <div id="pageForm">
        <form onChange={onChange} onSubmit={onSubmit}>
          <h1>Sign In</h1>
          <TextField
            error={emailError ? true : false}
            id="email"
            label="Email"
            type="email"
            defaultValue={userState.user.email}
            name="loginEmail"
            className="form-fields"
            helperText={emailError ? emailError.errMsg : ""}
          />
          <TextField
            error={passwordError ? true : false}
            id="password"
            label="Password"
            type="password"
            name="loginPassword"
            autoComplete="current-password"
            className="form-fields"
            helperText={passwordError ? passwordError.errMsg : ""}
          />
          <button className="btn" id="signUpBtn">
            SIGN IN
          </button>
        </form>
      </div>
      <div id="pageGreetings">
        <div id="pageGreetingContent">
          <h1>Welcome {userState.user.name || ""}</h1>
          <p>
            The quick brown fox jumps over the lazy dog near the side of the
            river bank. The quick brown fox jumps over the lazy dog near the
            side of the river bank
          </p>
          <br />
          <br />
          <Link className="btn" id="pageGreetingContentBtn" to="/">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
