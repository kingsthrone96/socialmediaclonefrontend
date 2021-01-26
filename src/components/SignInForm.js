import React, { useState } from "react";
import "./styles/signInForm.scss";
import { Link } from "react-router-dom";
import serverAPI from "../serverAPI";
import TextField from "@material-ui/core/TextField";

function SignInForm({ userState, setUserState }) {
  const [formBody, setFormBody] = useState();
  const [errors, setErrors] = useState([]);
  const signIn = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <div id="signInForm">
      <div id="pageForm">
        <form onSubmit={(e) => signIn(e)}>
          <h1>Sign In</h1>
          <TextField
            id="email"
            label="Email"
            type="email"
            defaultValue={userState.email}
            name="signUpEmail"
            className="form-fields"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="signUpPassword"
            autoComplete="current-password"
            className="form-fields"
          />
          <button className="btn" id="signUpBtn">
            SIGN IN
          </button>
        </form>
      </div>
      <div id="pageGreetings">
        <div id="pageGreetingContent">
          <h1>Welcome {userState.name || ""}</h1>
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
