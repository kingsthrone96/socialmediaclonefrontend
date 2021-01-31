import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import "./styles/signUpForm.scss";
import serverAPI from "./helpers/serverAPI";
import UseAuth from "./customHooks/UseAuth";
import { ACTION } from "../Reducer";

import TextField from "@material-ui/core/TextField";

let body = {};
const onChange = (e = window.event) => {
  const { name, value } = e.target;
  Object.assign(body, { ...body, [name]: value });
};

function SignUpForm({ dispatch }) {
  const isLoggedIn = UseAuth();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(serverAPI.userCreate, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (resData.clientError) {
        handleValidationError(resData.clientError);
        console.log(resData);
        throw new Error("Something went wrong");
      } else {
        dispatch({
          type: ACTION.SET_USER_STATE,
          payload: resData,
        });
        console.log(resData);
        window.location.href = window.location.href + "signIn";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleValidationError = (errors) => {
    setNameError();
    setEmailError();
    setPasswordError();
    errors.forEach((err) => {
      const errMsg = err.errorMessage.replace("signUp", "");
      if (err.key === "signUpName" || err.key === "name")
        setNameError({ error: true, errMsg });
      if (err.key === "signUpEmail" || err.key === "email")
        setEmailError({ error: true, errMsg });
      if (err.key === "signUpPassword" || err.key === "password")
        setPasswordError({ error: true, errMsg });
    });
  };

  if (isLoggedIn) return <Redirect to="/homefeed" />;
  return (
    <div id="signUpForm">
      <div id="pageGreetings">
        <div id="pageGreetingContent">
          <h1>Hello There!</h1>
          <p>
            The quick brown fox jumps over the lazy dog near the side of the
            river bank. The quick brown fox jumps over the lazy dog near the
            side of the river bank
          </p>
          <br />
          <br />
          <Link className="btn" id="pageGreetingContentBtn" to="/signIn">
            SIGN IN
          </Link>
        </div>
      </div>
      <div id="pageForm">
        <form onSubmit={(e) => onSubmit(e)} onChange={onChange}>
          <h1>Create Account</h1>
          <TextField
            error={nameError ? true : false}
            id="name"
            label="Name"
            type="text"
            name="signUpName"
            className="form-fields"
            helperText={nameError ? nameError.errMsg : ""}
          />
          <TextField
            error={emailError ? true : false}
            id="email"
            label="Email"
            type="email"
            name="signUpEmail"
            className="form-fields"
            helperText={emailError ? emailError.errMsg : ""}
          />
          <TextField
            error={passwordError ? true : false}
            id="password"
            label="Password"
            type="password"
            name="signUpPassword"
            autoComplete="current-password"
            className="form-fields"
            helperText={passwordError ? passwordError.errMsg : ""}
          />
          <button className="btn" id="signUpBtn">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
