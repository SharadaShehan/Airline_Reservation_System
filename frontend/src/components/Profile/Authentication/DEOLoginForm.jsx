import React from "react";
import { useState } from "react";
import { UserGlobalState } from "../../Layout/UserGlobalState";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import "./authForms.css";

function DEOLoginForm() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setAuthForm } = AuthFormGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [randomError, setRandomError] = useState(null);

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
            Enter a valid username
        `);
    } else {
      setUsernameError(null);
      setRandomError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
            Enter a valid password
        `);
    } else {
      setPasswordError(null);
      setRandomError(null);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmitClick(e) {
    e.preventDefault();

    if (usernameError || passwordError) {
      setRandomError("Fill all the fields correctly");
      return;
    } else if (username === "" || password === "") {
      setRandomError("Fill username and password");
      return;
    }

    const postData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${BaseURL}/deo/auth`, postData);

      if (response.status === 200) {
        Cookies.set("access-token", response.data.access_token, { expires: 1 });
        setCurrentUserData(response.data.userData);
        console.log(response.data.userData);
        //setAdmin profile Details
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error.response.status) {
        if (error.response.status === 401) {
          setRandomError("Invalid username or password");
        }
      }
    }
  }

  return (
    <div className="loginFormWrapper">
      <form className="authForm" onSubmit={handleSubmitClick}>
        <span className="header">Data Entry Operator Login</span>
        <div className="formField">
          <input
            className="shortInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
          />
          {usernameError && <div className="errorText">{usernameError}</div>}
        </div>
        <div className="formField">
          <input
            className="shortInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        {randomError && <div className="errorText">{randomError}</div>}
        <div className="button-container">
          <button
            className="submitBtn"
            onClick={() => setAuthForm("admin-portal")}
          >
            Back
          </button>
          {/* <button
            className="submitBtn"
            onClick={() => setAuthForm("deo-register")}
          >
            Register Now
          </button> */}
          <button className="submitBtn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default DEOLoginForm;
